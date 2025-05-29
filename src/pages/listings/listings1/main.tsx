import { Component, For } from "solid-js";
import css_module from "./style.module.css";
import { Service } from "../types";

export const ServiceListingA: Component<{
  listings: Service[];
}> = (props) => {
  return (
    <div class="flex flex-wrap">
      <For each={props.listings}>
        {(service) => (
          <div class="md:w-6/12 px-2 lg:w-3/12 mb-2">
            <div class={css_module.listing_card}>
              <div class={css_module.listing_header}>
                <h3 class={css_module.listing_title}>{service.title}</h3>
                <p class={css_module.listing_provider}>
                  Provided by: {service.provider}
                </p>
              </div>
              <div class={css_module.listing_body}>
                <p class={css_module.listing_description}>
                  {service.description}
                </p>
                <div class={css_module.listing_details}>
                  <div class={css_module.detail_item}>
                    <i
                      class={`fas fa-map-marker-alt ${css_module.detail_icon}`}
                    ></i>
                    <span class={css_module.detail_text}>
                      {service.location}
                    </span>
                  </div>
                  <div class={css_module.detail_item}>
                    <i class={`fas fa-clock ${css_module.detail_icon}`}></i>
                    <span class={css_module.detail_text}>
                      {service.availability}
                    </span>
                  </div>
                  <div class={css_module.detail_item}>
                    <i class={`fas fa-tools ${css_module.detail_icon}`}></i>
                    <span class={css_module.detail_text}>
                      Services: {service.servicesOffered.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              <div class={css_module.listing_footer}>
                <span class={css_module.listing_price}>{service.price}</span>
                {/* {service.isNegotiable && <span class={css_module.negotiable}>Negotiable</span>} */}
                {/* {service.urgency && (
                <span class={`${css_module.urgency_badge} ${service.urgency === "high" && css_module.urgency_high} ${service.urgency === "medium" && css_module.urgency_medium} ${service.urgency === "low" && css_module.urgency_low}`}>
                  {service.urgency.charAt(0).toUpperCase() + service.urgency.slice(1)} Urgency
                </span>
              )} */}
                <button class={css_module.contact_button}>
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default ServiceListingA;
