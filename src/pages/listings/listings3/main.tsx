import { onMount, For, createSignal, Component } from 'solid-js';
import L from 'leaflet';
import './style.css'
import { Service } from '../types';

export const ServiceListingsC: Component<{
  listings: Service[],
}> = (props) => {
    let mapElement: HTMLDivElement | undefined;
    let map: L.Map | undefined;
    const [markers, setMarkers] = createSignal<L.Marker[]>([]);
    
    onMount(() => {
      if (mapElement) {
        map = L.map(mapElement).setView([50.94, 11.09], 9);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const newMarkers: L.Marker[] = [];
        props.listings.forEach((listing) => {
          const marker = L.marker(listing.coordinates).addTo(map!);
          console.log(marker, "------------")
          marker.bindPopup(
            `<h3>${listing.title}</h3>
            <p>${listing.location}</p>
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
        currentMarkers[index].getElement()!.classList.add('highlighted-marker');
      }
    };

    const handleMouseLeave = (index: number) => {
      const currentMarkers = markers();
      if (currentMarkers[index] && currentMarkers[index].getElement()) {
        currentMarkers[index].getElement()!.classList.remove('highlighted-marker');
      }
    };

  return (
    <div class="flex md:flex-row flex-col">
        <div class="md:w-4/12 px-2">
            <div class="card">
                <div class="card-body">
                    <div class="scrollable-list">
                        <ul class="list-group">

                          <For each={props.listings}>{(service, index) => (
                            <div
                              class="listing-card"
                              data-marker={index()}
                              onMouseEnter={() => handleMouseEnter(index())}
                              onMouseLeave={() => handleMouseLeave(index())}
                            >
                              <div class="listing-header">
                                <h3 class="listing-title">{service.title}</h3>
                                <p class="listing-provider">Provided by: {service.provider}</p>
                              </div>
                              <div class="listing-body">
                                <p class="listing-description">{service.description}</p>
                                <div class="listing-details">
                                  <div class="detail-item">
                                    <i class="fas fa-map-marker-alt detail-icon"></i>
                                    <span class="detail-text">{service.location}</span>
                                  </div>
                                  <div class="detail-item">
                                    <i class="fas fa-clock detail-icon"></i>
                                    <span class="detail-text">{service.availability}</span>
                                  </div>
                                  <div class="detail-item">
                                    <i class="fas fa-tools detail-icon"></i>
                                    <span class="detail-text">Services: {service.servicesOffered.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="listing-footer">
                                <span class="listing-price">{service.price}</span>
                                {service.isNegotiable && <span class="negotiable">Negotiable</span>}
                                {service.urgency && (
                                  <span class={`urgency-badge urgency-${service.urgency}`}>
                                    {service.urgency.charAt(0).toUpperCase() + service.urgency.slice(1)} Urgency
                                  </span>
                                )}
                                <button class="contact-button">Contact Provider</button>
                              </div>
                            </div>
                          )}</For>

                          </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:w-8/12 px-2">
            <div class="sticky-card">
                  <div class="lg:w-9/12 px-2">
                    <div id="map" class="chart_card_new" ref={mapElement}></div>
                  </div>
            </div>
        </div>
    </div>
  );
}