import {
  Accessor,
  Component,
  createSignal,
  For,
  Match,
  Resource,
  Switch,
} from "solid-js";
import css_module from "./style.module.css";
import { ListingPayload } from "../../../models/listing";
import {
  Pagination,
  ServiceRequestDetails,
  EditServiceRequestForm,
  DeleteItemModal,
  NotificationBar,
} from "../../../components";
import { authService } from "../../../oauth/manager";
import { ListingApiHandler } from "../../../api/backend/listing";
import { useAppContext } from "../../../state";

export const ServiceListingA: Component<{
  categories: Accessor<{
    [key: string]: string[];
  }>;
  listings: Resource<ListingPayload[]>;
  listingsCount: Accessor<number>;
  handlePageChange: (offset: number, limit: number) => void;
}> = (props) => {
  const [currentListing, setCurrentListing] = createSignal<ListingPayload>();
  const [viewListing, setViewListing] = createSignal(false);
  const [editListing, setEditListing] = createSignal(false);
  const [deleteListings, setDeleteListing] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal(1);
  const { notification } = useAppContext();
  const [authUser] = createSignal(authService.getAuthUser());
  const NUMBER_OF_ITEMS_PER_PAGE = 20;

  const openListing = (listingID: string) => {
    setCurrentListing(
      props.listings.latest!.find((el) => el.id === listingID)!
    );
    setViewListing(true);
  };

  const openEditListing = (listingID: string) => {
    setCurrentListing(
      props.listings.latest!.find((el) => el.id === listingID)!
    );
    setEditListing(true);
  };

  const openDeleteListing = (listingID: string) => {
    setCurrentListing(
      props.listings.latest!.find((el) => el.id === listingID)!
    );
    setDeleteListing(true);
  };

  const deleteListing = async () => {
    const api = new ListingApiHandler();
    const result = await api.deleteListing(currentListing()?.id!);
    if (result.success) {
      notification.showAppNotification(
        "success",
        `the listing has been successfully deleted`
      );
    } else {
      notification.showAppNotification(
        "error",
        `the listing could not be deleted`
      );
    }
    setDeleteListing(false);
  };

  return (
    <div class="flex flex-wrap">
      <ServiceRequestDetails
        isOpen={viewListing}
        listing={currentListing}
        closeModel={setViewListing}
      />

      <EditServiceRequestForm
        isOpen={editListing}
        listing={currentListing}
        closeModal={setEditListing}
        authUser={authUser}
      />

      <DeleteItemModal
        isOpen={deleteListings}
        continueDeletion={setDeleteListing}
        deleteListing={deleteListing}
      />

      <NotificationBar
        type={notification.notificationType}
        message={notification.notificationMessage}
        duration={4000}
      />
      <For each={props.listings.latest}>
        {(service) => (
          <div class="md:w-6/12 px-2 lg:w-3/12 mb-2">
            <div class={css_module.listing_card}>
              <div class={css_module.listing_footer}>
                <div class={css_module.listing_header}>
                  <h3 class={css_module.listing_title}>{service.title}</h3>
                  <p class={css_module.listing_provider}>
                    Requested by: <b>{service.customer_name}</b>
                  </p>
                </div>
                {/* <div class={css_module.container_div}>
                  <button class={css_module.icon_button}>
                    <i class="fa-solid fa-user-pen"></i>
                  </button>
                </div> */}
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
                  <Switch fallback={<i class="fa-solid fa-arrow-up"></i>}>
                    <Match when={service.urgency === "High"}>
                      <i
                        class="fa-solid fa-arrow-up"
                        style={`color: var(--danger-red)`}
                      ></i>
                    </Match>
                    <Match when={service.urgency === "Medium"}>
                      <i
                        class={`fa-solid fa-arrows-up-down`}
                        style={`color: var(--warning-yellow)`}
                      ></i>
                    </Match>
                    <Match when={service.urgency === "Low"}>
                      <i
                        class="fa-solid fa-arrow-down"
                        style={`color: var(--primary-blue)`}
                      ></i>
                    </Match>
                  </Switch>
                  //   <span
                  //     class={`${css_module.urgency_badge} ${
                  //       service.urgency === "High" && css_module.urgency_high
                  //     } ${
                  //       service.urgency === "Medium" && css_module.urgency_medium
                  //     } ${service.urgency === "Low" && css_module.urgency_low}`}
                  //   >
                  //     {service.urgency.charAt(0).toUpperCase() +
                  //       service.urgency.slice(1)}{" "}
                  //   </span>
                )}
                <button
                  class={css_module.contact_button}
                  onClick={() => openListing(service.id)}
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>

                {service.creator_id === authUser()?.id && (
                  <button
                    class={css_module.contact_button}
                    onClick={() => openEditListing(service.id)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                )}

                {service.creator_id === authUser()?.id && (
                  <button
                    class={css_module.contact_button}
                    onClick={() => openDeleteListing(service.id)}
                  >
                    <i class="fa-solid fa-trash-can-arrow-up"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </For>

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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ServiceListingA;
