import { Accessor, Component, createSignal, For, Resource } from "solid-js";
import css_module from "./style.module.css";
import { ListingPayload } from "../../../models/listing";
import { Pagination, ServiceRequestDetails } from "../../../components";

export const ServiceListingA: Component<{
  categories: Accessor<{
    [key: string]: string[];
  }>;
  listings: Resource<ListingPayload[]>;
  listingsCount: Accessor<number>;
  handlePageChange: (newPage: number, offset: number, limit: number) => void;
}> = (props) => {
  const [currentListing, setCurrentListing] = createSignal<ListingPayload>();
  const [viewListing, setViewListing] = createSignal(false);
  const NUMBER_OF_ITEMS_PER_PAGE = 10;

  const openListing = (listingID: string) => {
    setCurrentListing(props.listings.latest!.find((el) => el.id === listingID));
    setViewListing(true);
  };

  return (
    <div class="flex flex-wrap">
      <ServiceRequestDetails
        isOpen={viewListing}
        listing={currentListing}
        closeModel={setViewListing}
      />
      <For each={props.listings.latest}>
        {(service) => (
          <div class="md:w-6/12 px-2 lg:w-3/12 mb-2">
            <div class={css_module.listing_card}>
              <div class={css_module.listing_header}>
                <h3 class={css_module.listing_title}>{service.title}</h3>
                <p class={css_module.listing_provider}>
                  Requested by: <b>{service.customer_name}</b>
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
                      {service.location_city}
                    </span>
                  </div>
                  {/* <div class={css_module.detail_item}>
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
                  </div> */}
                </div>
              </div>
              <div class={css_module.listing_footer}>
                <span class={css_module.listing_price}>
                  {service.price < 1 ? `Negotiable` : `${service.price}/Hour`}
                </span>
                {service.urgency && (
                  <span
                    class={`${css_module.urgency_badge} ${
                      service.urgency === "High" && css_module.urgency_high
                    } ${
                      service.urgency === "Medium" && css_module.urgency_medium
                    } ${service.urgency === "Low" && css_module.urgency_low}`}
                  >
                    {service.urgency.charAt(0).toUpperCase() +
                      service.urgency.slice(1)}{" "}
                    {/* Urgency */}
                  </span>
                )}
                <button
                  class={css_module.contact_button}
                  onClick={() => openListing(service.id)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        )}
      </For>

      {!props.listings.loading &&
        props.listingsCount() > NUMBER_OF_ITEMS_PER_PAGE && (
          <div
            style={{
              width: "100%",
              left: "50%",
              "flex-shrink": 0,
              color: "#ecf0f1",
              padding: "0.1rem 0",
            }}
          >
            <Pagination
              itemsPerPage={NUMBER_OF_ITEMS_PER_PAGE}
              totalItems={props.listingsCount()}
              onPageChange={props.handlePageChange}
              initialPage={1}
              maxPagesToShow={5}
            />
          </div>
        )}
    </div>
  );
};

export default ServiceListingA;
