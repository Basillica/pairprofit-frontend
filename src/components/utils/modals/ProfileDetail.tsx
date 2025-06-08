import { For, Show, Component, Accessor, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import { ServiceProviderModel } from "../../../models/profile";
import modal_styles from "./style.module.css";

// Define types for better readability and type-checking (optional, remove if not using TypeScript)
/**
 * @typedef {object} Review
 * @property {number} id
 * @property {string} reviewer
 * @property {number} rating
 * @property {string} date
 * @property {string} comment
 * @property {string} serviceTitle
 */

/**
 * @typedef {object} ServiceOffered
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} price
 * @property {string} link
 */

/**
 * @typedef {object} PublicUpdate
 * @property {string} id
 * @property {string} date
 * @property {string} type
 * @property {string} title
 * @property {string} content
 * @property {string | null} image
 */

/**
 * @typedef {object} ProviderData
 * @property {string} id
 * @property {string} name
 * @property {string} profilePicture
 * @property {string} specialization
 * @property {string} bio
 * @property {number} overallRating
 * @property {number} totalReviews
 * @property {string} location
 * @property {string} yearsInBusiness
 * @property {string} businessName
 * @property {string} businessRegistration
 * @property {string[]} contactPreferences
 * @property {{ [key: number]: number }} ratingBreakdown
 * @property {Review[]} testimonials
 * @property {ServiceOffered[]} servicesOffered
 * @property {PublicUpdate[]} publicUpdates
 */

const StarRating: Component<{
  rating: number;
}> = (props) => {
  const fullStars = Math.floor(props.rating);
  const halfStar = props.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div class={`${modal_styles.stars} flex items-center`}>
      <For each={Array(fullStars)}>
        {() => (
          <span class={`${modal_styles.star} text-gold-500 text-xl mr-0.5}`}>
            &#9733;
          </span>
        )}
      </For>
      <Show when={halfStar}>
        <span class={`${modal_styles.star} text-gold-500 text-xl mr-0.5`}>
          &#9733;
        </span>
      </Show>
      <For each={Array(emptyStars)}>
        {() => (
          <span
            class={`${modal_styles.star} empty text-gray-300 text-xl mr-0.5`}
          >
            &#9734;
          </span>
        )}
      </For>
    </div>
  );
};

export const ProviderProfileDetail: Component<{
  isOpen: Accessor<boolean>;
  closeModal: Setter<boolean>;
  listing: Accessor<ServiceProviderModel | undefined>;
}> = (props) => {
  // Calculate total reviews for percentage calculation in rating breakdown
  const totalReviews = () => props.listing()?.totalReviews;

  const handleClose = () => {
    props.closeModal(false);
  };

  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          classList={{ "modal-overlay": true, active: props.isOpen() }}
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
        >
          <div class={modal_styles.modal_content}>
            <span class={modal_styles.modal_close_button} onClick={handleClose}>
              &times;
            </span>
            {/* <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg"> */}
            <div class="mb-6">
              <button
                class="text-blue-600 hover:text-blue-800 flex items-center"
                onClick={handleClose}
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to Listings
              </button>
            </div>

            <header class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 pb-8 border-b border-gray-200">
              <img
                src={props.listing()?.profilePicture}
                alt="Provider Profile"
                class="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
              />
              <div class="text-center sm:text-left flex-grow">
                <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
                  {props.listing()?.name}
                </h1>
                <p class="text-xl text-blue-600 mb-2">
                  {props.listing()?.specialization}
                </p>
                <div class="flex items-center justify-center sm:justify-start mb-4">
                  <StarRating rating={props.listing()!.overallRating} />
                  <span class="text-gray-700 text-lg font-semibold">
                    {props.listing()?.overallRating.toFixed(1)}
                  </span>
                  <span class="text-gray-500 text-lg ml-2">
                    ({props.listing()?.totalReviews} Reviews)
                  </span>
                </div>
                <button class="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-medium shadow-md">
                  Chat with Provider
                </button>
              </div>
            </header>

            <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
              <p class="text-gray-700 leading-relaxed">
                {props.listing()?.bio}
              </p>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong class="font-semibold">Location:</strong>{" "}
                  {props.listing()?.location}
                </p>
                <p>
                  <strong class="font-semibold">Years in Business:</strong>{" "}
                  {props.listing()?.yearsInBusiness}
                </p>
                <p>
                  <strong class="font-semibold">Business Name:</strong>{" "}
                  {props.listing()?.businessName}
                </p>
                <p>
                  <strong class="font-semibold">Business Registration:</strong>{" "}
                  {props.listing()?.businessRegistration}
                </p>
              </div>
              <div class="mt-4">
                <h3 class="text-lg font-semibold text-gray-800">
                  Contact Preferences:
                </h3>
                <p class="text-gray-700">
                  {props.listing()?.contactPreferences.join(", ")}
                </p>
              </div>
            </section>

            <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Ratings & Reviews
              </h2>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-3">
                    Overall Rating Breakdown
                  </h3>
                  <div class="space-y-2">
                    <For each={["5", "4", "3", "2", "1"]}>
                      {(star) => {
                        const count =
                          props.listing()?.ratingBreakdown[
                            star as "5" | "4" | "3" | "2" | "1"
                          ] || 0;
                        const percentage =
                          totalReviews()! > 0
                            ? (count / totalReviews()!) * 100
                            : 0;
                        return (
                          <div class="flex items-center space-x-2">
                            <span
                              class="text-sm font-medium text-gray-700 w-6 text-right"
                              style={"width: 50px"}
                            >
                              {`${star} star`}
                            </span>
                            <div
                              class={`${modal_styles.rating_bar_container} flex-grow`}
                            >
                              <div
                                class={`${modal_styles.rating_bar_fill}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span class="text-sm text-gray-600 w-10 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      }}
                    </For>
                  </div>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-3">
                    What Clients Say
                  </h3>
                  <div class="space-y-4">
                    <Show
                      when={
                        props.listing()?.testimonials &&
                        props.listing()!.testimonials.length > 0
                      }
                      fallback={
                        <p class="text-gray-500">No testimonials yet.</p>
                      }
                    >
                      <For each={props.listing()?.testimonials}>
                        {(testimonial) => (
                          <div class="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                            <div class="flex items-center mb-2">
                              <StarRating rating={testimonial.rating} />
                              <span class="font-semibold text-gray-800">
                                {testimonial.reviewer}
                              </span>
                              <span class="text-gray-500 text-sm ml-auto">
                                {testimonial.date}
                              </span>
                            </div>
                            <p class="text-gray-700 italic mb-2">
                              "{testimonial.comment}"
                            </p>
                            <p class="text-sm text-gray-600">
                              Service:{" "}
                              <span class="font-medium">
                                {testimonial.serviceTitle}
                              </span>
                            </p>
                          </div>
                        )}
                      </For>
                    </Show>
                  </div>
                  <button class="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                    Read More Reviews
                  </button>
                </div>
              </div>
            </section>

            <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Services Offered
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Show
                  when={
                    props.listing()?.servicesOffered &&
                    props.listing()!.servicesOffered.length > 0
                  }
                  fallback={
                    <p class="text-gray-500 mt-4">
                      This provider has no public service listings yet.
                    </p>
                  }
                >
                  <For each={props.listing()?.servicesOffered}>
                    {(service) => (
                      <a
                        href={service.link}
                        class="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                      >
                        <h4 class="text-lg font-semibold text-blue-700 mb-1">
                          {service.title}
                        </h4>
                        <p class="text-gray-600 text-sm mb-2">
                          {service.category}
                        </p>
                        <p class="text-gray-800 font-medium">{service.price}</p>
                      </a>
                    )}
                  </For>
                </Show>
              </div>
            </section>

            <section class="p-6 bg-white rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Recent Updates & Project Spotlights
              </h2>
              <div class="space-y-6">
                <Show
                  when={
                    props.listing()?.publicUpdates &&
                    props.listing()!.publicUpdates.length > 0
                  }
                  fallback={
                    <p class="text-gray-500 mt-4">
                      No recent updates or project spotlights from this
                      provider.
                    </p>
                  }
                >
                  <For each={props.listing()?.publicUpdates}>
                    {(update) => (
                      <div class="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <div class="flex justify-between items-center mb-2">
                          <h4 class="text-lg font-semibold text-gray-800">
                            {update.title}
                          </h4>
                          <span class="text-sm text-gray-500">
                            {update.date}
                          </span>
                        </div>
                        <p class="text-gray-700 mb-3">{update.content}</p>
                        <Show when={update.image}>
                          <img
                            src={update.image!}
                            alt={update.title}
                            class="w-full h-48 object-cover rounded-md mt-2"
                          />
                        </Show>
                        <span class="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {update.type}
                        </span>
                      </div>
                    )}
                  </For>
                </Show>
              </div>
            </section>
            {/* </div> */}
          </div>
        </div>
      </Show>
    </Portal>
  );
};
