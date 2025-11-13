import {
    Component,
    createSignal,
    onMount,
    createEffect,
    Switch,
    Match,
    For,
    Setter,
} from 'solid-js';
import { LocationSearchResult, LoginStore, StepTransitions } from './types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import styles from './style.module.css';

L.Marker.prototype.options.icon = L.icon({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});
type Coordinates = { lat: number; lng: number };
type AvailabilityOption = { label: string; value: string };
const availabilityOptions: AvailabilityOption[] = [
    { label: 'Full time', value: 'full-time' },
    { label: 'Part time', value: 'part-time' },
    { label: 'Evenings/Weekends', value: 'evenings-weekends' },
    { label: 'Emergency calls', value: 'emergency-calls' },
];

export const ArtisansLocationNAvialability: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [availability, setAvailability] = createSignal<string[]>([]);
    const defaultCoords: Coordinates = { lat: 40.7128, lng: -74.006 };
    const [map, setMap] = createSignal<L.Map>();
    const [marker, setMarker] = createSignal<L.Marker<any>>();
    const [searchAddress, setSearchAddress] = createSignal('');
    const [coordinates, setCoordinates] = createSignal<Coordinates>();
    const [searchResults, setSearchResults] = createSignal<
        LocationSearchResult[]
    >([]);
    const [locationPermission, setLocationPermission] = createSignal<
        'prompt' | 'granted' | 'denied' | 'default' | 'pending'
    >('prompt'); // Start as 'pending'
    let mapContainerRef: HTMLDivElement | undefined;

    const reverseGeocodeAndUpdate = async (lat: number, lng: number) => {
        setCoordinates({ lat, lng });
        const currentMarker = marker();
        if (currentMarker) {
            currentMarker.setLatLng([lat, lng]);
        }
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            const fullAddress =
                data.display_name ||
                `Location at [${lat.toFixed(4)}, ${lng.toFixed(4)}]`;
            const street = data.address?.road || data.address?.pedestrian || '';
            setSearchAddress(fullAddress);
            console.log('New Street:', street); // You can use this for a separate street input if needed
            return fullAddress;
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
            const fallbackAddress = `Location at [${lat.toFixed(
                4
            )}, ${lng.toFixed(4)}]`;
            setSearchAddress(fallbackAddress);
        } finally {
            // setIsGeocoding(false);
        }
    };

    const selectLocationItem = async (location: LocationSearchResult) => {
        const lat = parseFloat(location.lat);
        const lng = parseFloat(location.lon);
        // if (coordinates()?.lat !== lat && coordinates()?.lng !== lng) {
        //     return; // reject if coordinates are not similar at all
        // }
        setCoordinates({ lat, lng });
        const currentMarker = marker();
        if (currentMarker) {
            currentMarker.setLatLng([lat, lng]);
        }
        setSearchAddress(location.display_name);
    };

    const getInitialLocation = async (isRetry = false) => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            setLocationPermission('denied');
            setCoordinates(defaultCoords);
            return;
        }

        const handlePositionError = (error: GeolocationPositionError) => {
            console.error('Geolocation failed:', error.code, error.message);
            if (error.code === error.PERMISSION_DENIED) {
                setLocationPermission('denied');
            } else {
                setLocationPermission('default');
            }
            setCoordinates(defaultCoords);
        };

        const handlePositionSuccess = (position: GeolocationPosition) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setCoordinates(pos);
            setLocationPermission('granted');
            reverseGeocode(pos.lat, pos.lng);
        };

        try {
            const permissionStatus = await navigator.permissions.query({
                name: 'geolocation',
            });
            if (permissionStatus.state === 'granted') {
                // Case 1: Already granted (fetch instantly)
                setLocationPermission('granted');
                navigator.geolocation.getCurrentPosition(
                    handlePositionSuccess,
                    handlePositionError,
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            } else if (permissionStatus.state === 'prompt' || isRetry) {
                // Case 2: Prompt needed or retrying after an initial failure/timeout
                // This is the call that shows the prompt (if state is 'prompt')
                setLocationPermission('pending');
                navigator.geolocation.getCurrentPosition(
                    handlePositionSuccess,
                    handlePositionError,
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            } else if (permissionStatus.state === 'denied') {
                // Case 3: Explicitly DENIED
                console.log(
                    'Permission is explicitly denied. Cannot prompt again.'
                );
                setLocationPermission('denied');
                setCoordinates(defaultCoords);
            } else {
                // Catch-all for other states (unlikely but safe)
                setLocationPermission('default');
                setCoordinates(defaultCoords);
            }
        } catch (e) {
            // Fallback for browsers without proper navigator.permissions support
            console.warn(
                'Permissions query failed, attempting to get position anyway.',
                e
            );
            setLocationPermission('pending');
            navigator.geolocation.getCurrentPosition(
                handlePositionSuccess, // Use shared success handler
                handlePositionError, // Use shared error handler
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        }
    };

    // Utility function to convert Lat/Lng to an Address (Reverse Geocoding)
    const reverseGeocode = async (lat: number, lng: number) => {
        // setIsGeocoding(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            // Use the display_name from the geocoding service
            const address = data.display_name || 'Address not found';
            setSearchAddress(address); // Pre-fill the search input with the address
            return address;
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
            return 'Address not found';
        } finally {
            // setIsGeocoding(false);
        }
    };

    // 💡 1. Initiate the Geolocation Prompt on initial mount
    // This runs once and sets the coordinates or the default.
    onMount(() => {
        if (!mapContainerRef) {
            return;
        }
        getInitialLocation();
    });

    // 🌟 FIX 2: Use createEffect to initialize the map ONLY when coordinates are ready AND the ref exists.
    createEffect(() => {
        const coords = coordinates();
        if (coords && mapContainerRef && !map()) {
            // Check for Leaflet's existing map instance to avoid re-initialization
            if (mapContainerRef.querySelector('.leaflet-container')) {
                // If map already exists, just return or handle it (though it shouldn't be reached with this logic)
                return;
            }
            const newMap = L.map(mapContainerRef, {
                center: [coords.lat, coords.lng],
                zoom: 13,
                zoomControl: false,
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(newMap);
            const newMarker = L.marker([coords.lat, coords.lng], {
                draggable: true,
            }).addTo(newMap);
            setMap(newMap);
            setMarker(newMarker);
            // Map Interaction Listeners
            newMarker.on('dragend', (e: L.DragEndEvent) => {
                console.log(e);
                const pos = newMarker.getLatLng();
                setCoordinates({ lat: pos.lat, lng: pos.lng });
                setSearchAddress('Location Updated via Map Drag');
                setLocationPermission('granted');
                reverseGeocodeAndUpdate(pos.lat, pos.lng);
            });
            newMap.on('click', (e: L.LeafletMouseEvent) => {
                const { lat, lng } = e.latlng;
                newMarker.setLatLng(e.latlng);
                setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
                setSearchAddress('Location Updated via Map Click');
                setLocationPermission('granted');
                reverseGeocodeAndUpdate(lat, lng);
            });
        } else if (coords && map()) {
            const currentMap = map()!;
            const currentMarker = marker()!;
            currentMap.setView([coords.lat, coords.lng], currentMap.getZoom());
            currentMarker.setLatLng([coords.lat, coords.lng]);
        }
    });

    const handleAvailabilityChange = (value: string, checked: boolean) => {
        setAvailability((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    // --- Submit Handler ---
    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (locationPermission() === 'denied' || !coordinates()) {
            return;
        }
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanSelfDescription
        );
    };

    const handleCaret = () => {
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanSkillsNTitle
        );
    };

    const totalSteps = 5;
    const currentStep = 3;
    const progressWidth = `${(currentStep / totalSteps) * 100}%`;

    // A separate function to trigger location prompt retry
    const triggerLocationPrompt = () => {
        getInitialLocation(true);
    };

    const searchLocationAddress = async () => {
        if (!searchAddress().trim()) {
            // Basic validation for empty input
            return;
        }
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchAddress().trim()
        )}&polygon_kml=1&addressdetails=1`;
        try {
            const response = await fetch(url);
            const data = await response.json(); // Parse JSON response
            if (data && data.length > 0) {
                setSearchResults(data);
                const firstResult = data[0];
                const lat = parseFloat(firstResult.lat);
                const lon = parseFloat(firstResult.lon);
                setCoordinates({ lat, lng: lon });
                setLocationPermission('granted');
                reverseGeocodeAndUpdate(lat, lon);
            } else {
                console.warn('No results found for the given address.');
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 pt-4 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="w-full flex flex-col justify-start items-right gap-10">
                    <button
                        class="flex items-center text-white text-2xl font-bold tracking-wide cursor-pointer"
                        onClick={handleCaret}
                        type="button"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.97508 4.94165L2.91675 9.99998L7.97508 15.0583"
                                stroke="#041820"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M17.0833 10H3.05835"
                                stroke="#041820"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                        <div
                            class="h-2 left-0 top-0 bg-[#1376A1] rounded-full"
                            style={{ width: progressWidth }}
                        ></div>
                        <div style="align-self: stretch; color: #697586; font-size: 14px; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                            {currentStep}/5
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center gap-10">
                        <div class="w-full flex flex-col items-center gap-1">
                            <h1 class="w-full text-center text-dark-text text-2xl md:text-3xl lg:text-4xl font-bold leading-tight md:leading-snug">
                                Tell us your location & Availability
                            </h1>
                            <p class="text-center text-gray-text text-sm md:text-base font-normal leading-relaxed">
                                This will help clients near you to find you.
                            </p>
                        </div>
                        {/* 🌟 FIX 3: Conditional Rendering Logic */}
                        <Switch
                            fallback={
                                <AskForLocationPermission
                                    triggerLocationPrompt={
                                        triggerLocationPrompt
                                    }
                                    setLocationPermission={
                                        setLocationPermission
                                    }
                                />
                            }
                        >
                            {/* Render the full form if permission is granted OR using default coords (i.e., denied/unavailable) */}
                            <Match
                                when={
                                    locationPermission() === 'granted' ||
                                    locationPermission() === 'default' ||
                                    locationPermission() === 'denied'
                                }
                            >
                                <div class="w-full flex flex-col items-start gap-6 mx-auto">
                                    {locationPermission() !== 'granted' && (
                                        <div class="w-full p-4 bg-red-50 border border-red-500 rounded-lg">
                                            <p class="text-sm font-semibold text-red-700 mb-2">
                                                {locationPermission() ===
                                                'denied'
                                                    ? '🚫 Location Denied'
                                                    : '⚠️ Using Default Location'}
                                            </p>
                                            <p class="text-xs text-gray-700 mb-3">
                                                {locationPermission() ===
                                                'denied'
                                                    ? 'Location access was denied. You can manually search, drag the map pin, or click the button to retry the browser prompt.'
                                                    : 'Your current location could not be determined. Please manually search or drag the map pin to confirm your location.'}
                                            </p>
                                            <button
                                                onClick={triggerLocationPrompt}
                                                type="button"
                                                class="w-full py-2 bg-[#1376A1] text-white rounded-md text-sm font-medium hover:bg-blue-600 transition cursor-pointer"
                                            >
                                                Retry Location Access
                                            </button>
                                        </div>
                                    )}

                                    <div class="w-full flex flex-col gap-4">
                                        <label class="text-dark-text text-sm font-semibold">
                                            Address (Search & Confirm)
                                        </label>

                                        {/* Search Input and Button */}
                                        <div class="flex w-full">
                                            <input
                                                type="text"
                                                placeholder="Enter Address"
                                                class="flex-grow h-11 px-3 py-2 border border-border-gray rounded-l-lg text-gray-800 text-sm font-normal outline-none focus:border-primary-blue placeholder-gray-400"
                                                value={searchAddress()}
                                                onInput={(e) =>
                                                    setSearchAddress(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={searchLocationAddress}
                                                type="button"
                                                class="h-11 px-4 py-2 bg-[#1376A1] text-white rounded-r-lg font-semibold text-sm hover:bg-blue-600 transition duration-150"
                                            >
                                                Search
                                            </button>
                                        </div>
                                        <div style="width: 100%; align-self: stretch; padding: 16px; background: #F8FAFC; border-radius: 8px; outline: 1px #E3E8EF solid; outline-offset: -1px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
                                            <div style="width: 100%; justify-content: flex-start; align-items: center; display: inline-flex; gap: 10px;">
                                                <div style="width: 24px; height: 24px; position: relative">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                                                            fill="#1376A1"
                                                        />
                                                        <path
                                                            d="M11.9999 15.12C13.723 15.12 15.1199 13.7231 15.1199 12C15.1199 10.2769 13.723 8.88 11.9999 8.88C10.2768 8.88 8.87988 10.2769 8.87988 12C8.87988 13.7231 10.2768 15.12 11.9999 15.12Z"
                                                            fill="#1376A1"
                                                        />
                                                        <path
                                                            d="M12.75 2V4.04H12.74C12.5 4.01 12.25 4 12 4C11.75 4 11.5 4.01 11.26 4.04H11.25V2C11.25 1.59 11.59 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2Z"
                                                            fill="#1376A1"
                                                        />
                                                        <path
                                                            d="M4 12C4 12.25 4.01 12.51 4.04 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H4.04C4.01 11.49 4 11.75 4 12Z"
                                                            fill="#1376A1"
                                                        />
                                                        <path
                                                            d="M12.75 19.96V22C12.75 22.41 12.41 22.75 12 22.75C11.59 22.75 11.25 22.41 11.25 22V19.96H11.26C11.5 19.99 11.75 20 12 20C12.25 20 12.5 19.99 12.74 19.96H12.75Z"
                                                            fill="#1376A1"
                                                        />
                                                        <path
                                                            d="M22.75 12C22.75 12.41 22.41 12.75 22 12.75H19.96C19.99 12.51 20 12.25 20 12C20 11.75 19.99 11.49 19.96 11.25H22C22.41 11.25 22.75 11.59 22.75 12Z"
                                                            fill="#1376A1"
                                                        />
                                                    </svg>
                                                </div>
                                                <div style="flex: 1; min-width: 0; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                                                    <button
                                                        style="cursor: pointer; text-align: left; width: 100%; color: #1376A1; font-size: 14px; font-family: Inter; font-weight: 500; word-wrap: break-word"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerLocationPrompt();
                                                        }}
                                                        type="button"
                                                    >
                                                        Allow location access
                                                    </button>
                                                    <span style="width: 100%; color: #4B5565; font-size: 12px; font-family: Inter; font-weight: 400; word-wrap: break-word">
                                                        {searchAddress()}
                                                    </span>
                                                    <For each={searchResults()}>
                                                        {(location) => (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    selectLocationItem(
                                                                        location
                                                                    )
                                                                }
                                                                class={
                                                                    styles.search_result_item
                                                                }
                                                            >
                                                                {
                                                                    location.display_name
                                                                }
                                                            </button>
                                                        )}
                                                    </For>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 🌟 FIX 4: Assign ref directly to the variable */}
                                        <div
                                            ref={mapContainerRef}
                                            class="w-full rounded-lg border border-border-gray"
                                            style={{ height: '250px' }}
                                        ></div>
                                        <p class="text-xs text-light-gray-text mt-[-10px]">
                                            {coordinates()
                                                ? `Confirmed Coords: ${coordinates()?.lat.toFixed(
                                                      4
                                                  )}, ${coordinates()?.lng.toFixed(
                                                      4
                                                  )}`
                                                : 'Please confirm your location on the map.'}
                                        </p>
                                    </div>

                                    {/* --- AVAILABILITY CHECKBOXES --- */}
                                    <div class="w-full flex flex-col items-start gap-4 pt-2">
                                        <h2 class="text-dark-text text-base font-semibold">
                                            Availability
                                        </h2>
                                        <div class="flex flex-wrap gap-x-6 gap-y-3">
                                            <For each={availabilityOptions}>
                                                {(option) => (
                                                    <label class="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={option.value}
                                                            checked={availability().includes(
                                                                option.value
                                                            )}
                                                            onInput={(e) =>
                                                                handleAvailabilityChange(
                                                                    option.value,
                                                                    e
                                                                        .currentTarget
                                                                        .checked
                                                                )
                                                            }
                                                            class="form-checkbox h-5 w-5 text-primary-blue rounded border-gray-300 focus:ring-primary-blue accent-primary-blue"
                                                        />
                                                        <span class="text-light-gray-text text-sm font-normal whitespace-nowrap">
                                                            {option.label}
                                                        </span>
                                                    </label>
                                                )}
                                            </For>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={
                                            !coordinates() ||
                                            (availability().length === 0 &&
                                                locationPermission() ===
                                                    'granted')
                                        }
                                        class="w-full h-13 px-4 py-3 bg-[#1376A1] text-white rounded-lg font-semibold text-base transition duration-200
                                        disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer
                                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 mt-6"
                                    >
                                        Next
                                    </button>
                                </div>
                            </Match>
                        </Switch>
                    </div>
                </div>
            </div>
        </form>
    );
};

const AskForLocationPermission = (props: {
    triggerLocationPrompt: () => void;
    setLocationPermission: Setter<
        'prompt' | 'granted' | 'denied' | 'default' | 'pending'
    >;
}) => {
    return (
        <dialog
            style={{
                width: '100%',
                padding: '40px 32px',
                background: 'white',
                'border-radius': '16px',
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'flex-end',
                gap: '32px',
                position: 'relative',
            }}
        >
            <button
                aria-label="Close"
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                }}
                onClick={() => props.setLocationPermission('denied')}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 5L5 15"
                        stroke="#1E1E1E"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5 5L15 15"
                        stroke="#1E1E1E"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            {/* Content Section */}
            <div
                style={{
                    'align-self': 'stretch',
                    background: 'white',
                    'border-radius': '16px',
                    'flex-direction': 'column',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-end',
                    gap: '32px',
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        'align-self': 'stretch',
                        'flex-direction': 'column',
                        'justify-content': 'flex-start',
                        'align-items': 'center',
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            width: '173px',
                            height: '172px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <svg
                            width="173"
                            height="172"
                            viewBox="0 0 173 172"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_835_47934)">
                                <path d="M173 0H0V172H173V0Z" fill="white" />
                                <path
                                    d="M102.532 121.049C108.863 121.049 113.995 119.111 113.995 116.721C113.995 114.331 108.863 112.393 102.532 112.393C96.2003 112.393 91.0679 114.331 91.0679 116.721C91.0679 119.111 96.2003 121.049 102.532 121.049Z"
                                    fill="#D0E4EC"
                                />
                                <path
                                    d="M114.065 61.7467H23.9535L0.432617 137.236H137.586L114.065 61.7467ZM59.989 115.657L117.385 86.3467L131.955 133.11H76.8265L59.989 115.657ZM70.6847 133.11H25.8113L55.8743 117.758L70.6847 133.11ZM27.013 65.8733H111.006L116.138 82.3443L56.9905 112.549L23.3385 77.6659L27.013 65.8733ZM21.8393 82.4781L52.8759 114.65L16.7268 133.11H6.06361L21.8393 82.4781Z"
                                    fill="#F8FAFC"
                                />
                                <path
                                    d="M122.278 92.977C111.584 101.803 103.398 114.308 102.566 115.599C102.553 115.621 102.542 115.639 102.532 115.654C102.522 115.639 102.51 115.621 102.497 115.599C101.665 114.308 93.4793 101.803 82.7858 92.977C75.3019 86.8004 70.1757 77.7471 70.295 67.3011C70.4966 49.6993 84.8259 35.6533 102.532 35.69C120.238 35.6532 134.567 49.6992 134.769 67.3011C134.888 77.747 129.762 86.8004 122.278 92.977Z"
                                    fill="#1376A1"
                                />
                                <path
                                    d="M102.532 86.0626C112.747 86.0626 121.028 77.8293 121.028 67.673C121.028 57.5168 112.747 49.2835 102.532 49.2835C92.3163 49.2835 84.0352 57.5168 84.0352 67.673C84.0352 77.8293 92.3163 86.0626 102.532 86.0626Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_835_47934">
                                    <rect
                                        width="173"
                                        height="172"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div
                        style={{
                            'align-self': 'stretch',
                            'flex-direction': 'column',
                            'justify-content': 'flex-start',
                            'align-items': 'center',
                            gap: '40px',
                            display: 'flex',
                        }}
                    >
                        <div
                            style={{
                                'flex-direction': 'column',
                                'justify-content': 'flex-start',
                                'align-items': 'center',
                                gap: '8px',
                                display: 'flex',
                            }}
                        >
                            <h2
                                style={{
                                    'text-align': 'center',
                                    color: '#121926',
                                    'font-size': '24px',
                                    'font-weight': '600',
                                    'line-height': '38.40px',
                                    margin: '0', // Remove default h2 margin
                                }}
                            >
                                Allow location access
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Action Buttons (replaces bottom div) */}
            <div
                style={{
                    'align-self': 'stretch',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    gap: '32px',
                    display: 'flex',
                }}
            >
                {/* Secondary Button: "Not now" */}
                <button
                    style={{
                        flex: '1 1 0',
                        padding: '14px 24px',
                        'border-radius': '8px',
                        border: '1.5px #1376A1 solid',
                        background: 'white',
                        'justify-content': 'center',
                        'align-items': 'center',
                        display: 'flex',
                        cursor: 'pointer',
                    }}
                    onClick={() => console.log('Not now action')}
                >
                    <span
                        style={{
                            color: '#1376A1',
                            'font-size': '18px',
                            'font-family': 'Inter',
                            'font-weight': '600',
                            'line-height': '28.80px',
                        }}
                    >
                        Not now
                    </span>
                </button>

                <button
                    style={{
                        flex: '1 1 0',
                        padding: '14px 24px',
                        background: '#1376A1',
                        'border-radius': '8px',
                        'justify-content': 'center',
                        'align-items': 'center',
                        display: 'flex',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    onClick={() => props.triggerLocationPrompt()}
                >
                    <span
                        style={{
                            color: '#F2F2F2',
                            'font-size': '18px',
                            'font-family': 'Inter',
                            'font-weight': '600',
                            'line-height': '28.80px',
                        }}
                    >
                        Enable location
                    </span>
                </button>
            </div>
        </dialog>
    );
};
