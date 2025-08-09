import { createSignal, onMount, createEffect, For } from 'solid-js';
import L, {
    LatLng,
    Map,
    Marker,
    LocationEvent,
    FeatureGroup,
    ErrorEvent,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface StoredLocation {
    id: number;
    name: string;
    coordinates: [number, number];
    address?: string;
}

interface CustomerLocation {
    name: string;
    coordinates: [number, number];
}

const LocationComponent = () => {
    // Use a type annotation for the ref variable
    let mapDiv: HTMLDivElement | undefined;

    // Type the signals with the expected data types
    const [userLocation, setUserLocation] = createSignal<LatLng | null>(null);
    const [locations, setLocations] = createSignal<StoredLocation[]>([]);
    const [currentAddress, setCurrentAddress] = createSignal<string>();
    const [isGeocoding, setIsGeocoding] = createSignal(false);
    // const [error, setError] = createSignal<string | null>(null);

    // Type the marker variable
    let userMarker: Marker | null = null;
    let markersLayer: FeatureGroup | null = null;

    // Run this code once when the component is mounted to the DOM
    onMount(() => {
        // if (!mapContainer) {
        //     setError('Map container not found.');
        //     return;
        // }

        // Type the map instance
        // const map: Map = L.map(mapContainer).setView([51.505, -0.09], 13); // Default view

        if (mapDiv) {
            // Initialize Leaflet Map
            const map: Map = L.map(mapDiv).setView([50.94, 11.09], 6); // Erfurt, Germany
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Initialize the markers layer
            markersLayer = new L.FeatureGroup().addTo(map);

            // Load locations from localStorage on initial mount
            const savedLocations = localStorage.getItem('storedLocations');
            if (savedLocations) {
                setLocations(JSON.parse(savedLocations));
            }

            // Request user location
            map.locate({
                setView: true,
                maxZoom: 16,
                watch: false,
            });

            // Add a click handler to add new locations
            map.on('click', async (e: L.LeafletMouseEvent) => {
                setIsGeocoding(true);
                const { lat, lng } = e.latlng;

                try {
                    // Reverse geocoding API call to Nominatim
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );
                    const data = await response.json();

                    let locationName =
                        data.display_name ||
                        `Location at [${lat.toFixed(4)}, ${lng.toFixed(4)}]`;
                    setCurrentAddress(locationName);
                    const newLocation: StoredLocation = {
                        id: Date.now(), // Use a unique ID (timestamp is simple)
                        name: `New Location ${locations().length + 1}`,
                        coordinates: [e.latlng.lat, e.latlng.lng],
                    };
                    setLocations((prev) => [...prev, newLocation]);
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                    const newLocation: StoredLocation = {
                        id: Date.now(),
                        name: `Location at [${lat.toFixed(4)}, ${lng.toFixed(
                            4
                        )}]`,
                        coordinates: [lat, lng],
                        address: 'Address not found',
                    };
                    setLocations((prev) => [...prev, newLocation]);
                } finally {
                    setIsGeocoding(false);
                }
            });

            // Type the event handlers with Leaflet's specific event types
            map.on('locationfound', (e: LocationEvent) => {
                // Store the location in the SolidJS signal
                setUserLocation(e.latlng);

                if (userMarker) {
                    map.removeLayer(userMarker);
                }

                userMarker = L.marker(e.latlng)
                    .addTo(map)
                    .bindPopup('You are here!')
                    .openPopup();
                L.circle(e.latlng, e.accuracy).addTo(map);

                console.log('User location found:', e.latlng, mapDiv);
            });

            map.on('locationerror', (e: ErrorEvent) => {
                console.error(
                    'Location access denied or not found:',
                    e.message
                );
                console.log(
                    'Location access was denied or could not be found.'
                );
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Sample customer data with coordinates
            const customerLocations: CustomerLocation[] = [
                { name: 'Customer 1', coordinates: [51.05, 13.73] }, // Dresden
                { name: 'Customer 2', coordinates: [50.85, 10.45] }, // Weimar
                { name: 'Customer 3', coordinates: [51.51, 9.93] }, // Göttingen
                { name: 'Customer 4', coordinates: [52.52, 13.4] }, // Berlin
                { name: 'Customer 5', coordinates: [48.13, 11.58] }, // Munich
            ];

            // Add markers for each customer location
            customerLocations.forEach((customer) => {
                L.marker(customer.coordinates)
                    .addTo(map)
                    .bindPopup(customer.name);
            });
        }
    });

    // An effect to react to the location signal
    createEffect(() => {
        const loc = userLocation();
        if (loc) {
            console.log(
                'The reactive location signal has been updated:',
                loc.lat,
                loc.lng
            );
        }
    });

    // Create an effect to render markers whenever the 'locations' signal changes
    createEffect(() => {
        const currentLocations = locations();

        // Ensure the markers layer exists before trying to manipulate it
        if (markersLayer) {
            markersLayer.clearLayers(); // Remove all old markers

            // Add new markers for each location in the state
            currentLocations.forEach((loc) => {
                L.marker(loc.coordinates)
                    .addTo(markersLayer!)
                    .bindPopup(loc.name);
            });
        }
    });

    // Create an effect to save locations to localStorage
    createEffect(() => {
        const currentLocations = locations();
        localStorage.setItem(
            'storedLocations',
            JSON.stringify(currentLocations)
        );
    });

    return (
        // <div style={'width: 98%; height: 98%; margin: 10px'}>
        //     <div
        //         style={`
        //             background-color: #fff;
        //             border-radius: 0.75rem;
        //             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        //             padding: 1rem;
        //             margin-bottom: 1rem;
        //             height: 480px;
        //             display: flex;
        //             flex-direction: column;
        //             position: relative;
        //             overflow: hidden;
        // 'display': 'flex', 'flex-direction': 'column', 'gap': '1rem'
        //         `}
        //         ref={mapDiv}
        //     >
        //         {/* {error() && (
        //             <div
        //                 style={{
        //                     padding: '1rem',
        //                     'background-color': 'rgba(255, 0, 0, 0.1)',
        //                     'text-align': 'center',
        //                 }}
        //             >
        //                 {error()}
        //             </div>
        //         )} */}
        //     </div>
        // </div>
        <div style={'width: 98%; height: 98%; margin: 10px'}>
            <div
                style={`
                    background-color: #fff;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    padding: 1rem;
                    margin-bottom: 1rem;
                    height: 480px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                `}
                ref={mapDiv}
            ></div>
            <div
                style={{
                    height: '20%',
                    overflow: 'auto',
                    padding: '1rem',
                    'background-color': '#f3f4f6',
                }}
            >
                <h3>Stored Locations</h3>
                <h3>{currentAddress()}</h3>
                <p>
                    Click on the map to add a new location.{' '}
                    {isGeocoding() && 'Finding address...'}
                </p>
                <ul>
                    <For each={locations()}>
                        {(loc) => (
                            <li style={{ 'margin-bottom': '0.5rem' }}>
                                <strong>{loc.name}:</strong>{' '}
                                {loc.coordinates[0]}, {loc.coordinates[1]}
                                <button
                                    onClick={() =>
                                        setLocations((prev) =>
                                            prev.filter((l) => l.id !== loc.id)
                                        )
                                    }
                                    style={{
                                        'margin-left': '0.5rem',
                                        color: 'red',
                                    }}
                                >
                                    &times;
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </div>
        </div>
    );
};

export function UserLocationMap() {
    return (
        <div
            style={{
                height: '500px',
                width: '100%',
                display: 'flex',
                background: 'red',
                margin: '10px',
            }}
        >
            <LocationComponent />
        </div>
    );
}
