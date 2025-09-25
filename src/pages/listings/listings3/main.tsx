import { For, createSignal, onMount } from 'solid-js';
import L from 'leaflet';
import './style.css';
import { ServiceRequestDetails } from '../../../components';
import { ListingPayload } from '../../../models/listing';

/**
 * Generates an array of ServiceRequest objects.
 *
 * @param count The number of ServiceRequest objects to generate.
 * @returns An array of ServiceRequest objects.
 */
const generateServiceRequests = (count: number): ListingPayload[] => {
    const requests: ListingPayload[] = [];
    const baseDate = new Date('2025-06-07T08:00:00Z');

    // Arrays for random selection to vary the data
    const customerNames = [
        'Alice B.',
        'Bob C.',
        'Charlie D.',
        'Diana E.',
        'Frank G.',
    ];
    const serviceCategories = [
        'Automotive & Mechanics',
        'Home & Garden',
        'Professional Services',
        'Electronics & IT',
        'Cleaning & Maintenance',
        'Home Improvement',
        'Pet Services',
        'Assembly & Installation',
        'Education & Learning',
        'Arts & Entertainment',
    ];
    const cities: {
        name: string;
        postalCode: string;
        coords: [number, number];
    }[] = [
        { name: 'Berlin', postalCode: '10115', coords: [52.52, 13.405] },
        { name: 'Munich', postalCode: '80331', coords: [48.137, 11.575] },
        { name: 'Hamburg', postalCode: '20095', coords: [53.55, 9.992] },
        { name: 'Frankfurt', postalCode: '60313', coords: [50.11, 8.682] },
        { name: 'Cologne', postalCode: '50667', coords: [50.938, 6.957] },
        { name: 'Stuttgart', postalCode: '70173', coords: [48.775, 9.183] },
        { name: 'Düsseldorf', postalCode: '40212', coords: [51.22, 6.77] },
        { name: 'Leipzig', postalCode: '04109', coords: [51.34, 12.37] },
        { name: 'Dresden', postalCode: '01067', coords: [51.05, 13.73] },
        { name: 'Nuremberg', postalCode: '90402', coords: [49.45, 11.07] },
    ];
    const desiredTimelines = ['IMMEDIATE', 'FLEXIBLE', 'SPECIFIC_DATE'];
    const urgencies = ['low', 'medium', 'high'];
    const contactMethods = ['Platform Chat', 'Phone', 'Email'];
    const imageAttachments = [
        'https://images.unsplash.com/photo-1582234320959-1959b83b3803?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1594247547514-98ae61ff2b6d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1518018260718-d784a9e53099?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    for (let i = 1; i <= count; i++) {
        const randomCustomer =
            customerNames[Math.floor(Math.random() * customerNames.length)];
        const randomCategory =
            serviceCategories[
                Math.floor(Math.random() * serviceCategories.length)
            ];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomTimeline =
            desiredTimelines[
                Math.floor(Math.random() * desiredTimelines.length)
            ];
        const randomUrgency =
            urgencies[Math.floor(Math.random() * urgencies.length)];
        const randomContact =
            contactMethods[Math.floor(Math.random() * contactMethods.length)];
        const hasAttachments = Math.random() > 0.5; // 50% chance of having attachments

        const specificDateTime =
            randomTimeline === 'SPECIFIC_DATE'
                ? new Date(
                      baseDate.getTime() +
                          Math.random() * 30 * 24 * 60 * 60 * 1000
                  ).toISOString() // Up to 30 days in future
                : '';
        const estimatedBudget =
            Math.random() > 0.3 ? Math.floor(Math.random() * 1000) + 50 : 0; // 70% chance of budget

        const request: ListingPayload = {
            id: `req${i}`,
            customer_name: randomCustomer,
            request_title: `${randomCategory} Request`,
            category: randomCategory,
            request_description: `This is a sample request for ${randomCategory} services in ${randomCity.name}. The client needs assistance with various tasks related to this category.`,
            location_street: `Sample Street ${i}`,
            location_city: randomCity.name,
            location_postal_code: randomCity.postalCode,
            location_country: 'Germany',
            specific_location_details: `Details for specific location ${i}.`,
            desired_timeline: randomTimeline as
                | 'IMMEDIATE'
                | 'FLEXIBLE'
                | 'SPECIFIC_DATE',
            specific_date_time: specificDateTime,
            estimated_budget: estimatedBudget,
            additional_notes:
                Math.random() > 0.7
                    ? 'Client has some specific requirements.'
                    : '',
            contact_method: randomContact as
                | 'Platform Chat'
                | 'Phone'
                | 'Email',
            attachments: hasAttachments
                ? [
                      {
                          type: 'image',
                          url: imageAttachments[
                              Math.floor(
                                  Math.random() * imageAttachments.length
                              )
                          ],
                          name: `attachment_${i}.jpg`,
                      },
                  ]
                : [],
            urgency: randomUrgency as 'low' | 'medium' | 'high',

            // Provider details (simplified for random generation)
            title: `${randomCategory} Provider`,
            description: `Experienced provider offering top-notch ${randomCategory} services.`,
            price: Math.random(),
            is_negotiable: Math.random() > 0.5,
            longitude: randomCity.coords[0], // Using city coordinates for providers
            latitude: randomCity.coords[1],
            scope: '',
            sub_category: '',
            creator_id: '',
        };
        requests.push(request);
    }

    return requests;
};

export const ServiceListingsC = () => {
    let mapElement: HTMLDivElement | undefined;
    let map: L.Map | undefined;
    const [markers, setMarkers] = createSignal<L.Marker[]>([]);
    const [serviceListings] = createSignal<ListingPayload[]>(
        generateServiceRequests(15)
    );
    const [currentListing, setCurrentListing] = createSignal<ListingPayload>();
    const [viewListing, setViewListing] = createSignal(false);

    onMount(() => {
        if (mapElement) {
            map = L.map(mapElement).setView([50.94, 11.09], 9);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const newMarkers: L.Marker[] = [];
            serviceListings().forEach((listing) => {
                const marker = L.marker([
                    listing.longitude,
                    listing.latitude,
                ]).addTo(map!);
                marker.bindPopup(
                    `<h3>${listing.title}</h3>
            <p>${listing.location_city}</p>
            <p>${listing.description}</p>
            <p><strong>${listing.price}</strong></p>`
                );
                newMarkers.push(marker);
            });
            setMarkers(newMarkers);
        }
    });

    const handleMouseEnter = (index: number) => {
        const currentMarkers = markers();
        if (currentMarkers[index] && currentMarkers[index].getElement()) {
            currentMarkers[index]
                .getElement()!
                .classList.add('highlighted-marker');
        }
    };

    const handleMouseLeave = (index: number) => {
        const currentMarkers = markers();
        if (currentMarkers[index] && currentMarkers[index].getElement()) {
            currentMarkers[index]
                .getElement()!
                .classList.remove('highlighted-marker');
        }
    };

    const openListing = (listingID: string) => {
        setCurrentListing(serviceListings().find((el) => el.id === listingID));
        setViewListing(true);
    };

    return (
        <div class="flex flex-wrap md:flex-row flex-col">
            <ServiceRequestDetails
                isOpen={viewListing}
                listing={currentListing}
                closeModel={setViewListing}
            />
            <div class="md:w-4/12 px-2">
                <div class="card">
                    <div class="card-body">
                        <div class="scrollable-list">
                            <ul class="list-group">
                                <For each={serviceListings()}>
                                    {(service, index) => (
                                        <div
                                            class="listing-card"
                                            data-marker={index()}
                                            onMouseEnter={() =>
                                                handleMouseEnter(index())
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(index())
                                            }
                                        >
                                            <div class="listing-header">
                                                <h3 class="listing-title">
                                                    {service.title}
                                                </h3>
                                                <p class="listing-provider">
                                                    Provided by:{' '}
                                                    {service.creator_id}
                                                </p>
                                            </div>
                                            <div class="listing-body">
                                                <p class="listing-description">
                                                    {service.description}
                                                </p>
                                                <div class="listing-details">
                                                    <div class="detail-item">
                                                        <i class="fas fa-map-marker-alt detail-icon"></i>
                                                        <span class="detail-text">
                                                            {
                                                                service.location_city
                                                            }
                                                        </span>
                                                    </div>
                                                    <div class="detail-item">
                                                        <i class="fas fa-clock detail-icon"></i>
                                                        <span class="detail-text">
                                                            {service.category}
                                                        </span>
                                                    </div>
                                                    <div class="detail-item">
                                                        <i class="fas fa-tools detail-icon"></i>
                                                        <span class="detail-text">
                                                            Services:{' '}
                                                            {
                                                                service.sub_category
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="listing-footer">
                                                <span class="listing-price">
                                                    {service.price}
                                                </span>
                                                {service.is_negotiable && (
                                                    <span class="negotiable">
                                                        Negotiable
                                                    </span>
                                                )}
                                                {service.urgency && (
                                                    <span
                                                        class={`urgency-badge urgency-${service.urgency}`}
                                                    >
                                                        {service.urgency
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            service.urgency.slice(
                                                                1
                                                            )}{' '}
                                                        Urgency
                                                    </span>
                                                )}
                                                <button
                                                    class="contact-button"
                                                    onClick={() =>
                                                        openListing(service.id)
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </For>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-8/12 px-2">
                <div class="sticky-card">
                    <div class="lg:w-9/12 px-2">
                        <div
                            id="map"
                            class="chart_card_new"
                            ref={mapElement}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
