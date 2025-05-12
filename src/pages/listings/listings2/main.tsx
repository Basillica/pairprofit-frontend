import { Component, For } from 'solid-js';
import css_class from  './style.module.css'
import { Service } from '../types';

export const ServiceListingsB: Component<{
  listings: Service[],
}> = (props) =>  {

  return (
    <div class="flex flex-wrap" style={"width: 94vw"}>
      <For each={props.listings}>{(service) => (
        <div class="col-12 listing-item">
          <div class={css_class.listing_card}>
            <div class={css_class.listing_header}>
              <h3 class={css_class.listing_title}>{service.title}</h3>
              <p class={css_class.listing_provider}>Provided by: {service.provider}</p>
            </div>
            <div class={css_class.listing_body}>
              <p class={css_class.listing_description}>{service.description}</p>
              <div class={css_class.listing_details}>
                <div class={css_class.detail_item}>
                  <i class={`fas fa-map-marker-alt ${css_class.detail_icon}`}></i>
                  <span class={css_class.detail_text}>{service.location}</span>
                </div>
                <div class={css_class.detail_item}>
                  <i class={`fas fa-clock ${css_class.detail_icon}`}></i>
                  <span class={css_class.detail_text}>{service.availability}</span>
                </div>
                <div class={css_class.detail_item}>
                  <i class={`fas fa-tools ${css_class.detail_icon}`}></i>
                  <span class={css_class.detail_text}>Services: {service.servicesOffered.join(', ')}</span>
                </div>
              </div>
            </div>
            <div class={css_class.listing_footer}>
              <span class={css_class.listing_price}>{service.price}</span>
              {service.isNegotiable && <span class={css_class.negotiable}>Negotiable</span>}
              {service.urgency && (
                <span class={`${css_class.urgency_badge} ${service.urgency === "high" && css_class.urgency_high} ${service.urgency === "medium" && css_class.urgency_medium} ${service.urgency === "low" && css_class.urgency_low}`}>
                  {service.urgency.charAt(0).toUpperCase() + service.urgency.slice(1)} Urgency
                </span>
              )}
              <button class={css_class.contact_button}>Contact Provider</button>
            </div>
          </div>
        </div>
      )}</For>
    </div>
  );
}