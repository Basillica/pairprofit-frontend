import { Show, For, Component, Accessor, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import modal_styles from "./style.module.css";
import { ListingPayload } from "../../../models/listing";

const urgencyMap = {
  IMMEDIATE: "Immediately / Emergency",
  "24h": "Within 24 hours",
  FEW_DAYS: "Within a few days",
  NEXT_WEEK: "Within the next week",
  FLEXIBLE: "Flexible",
  SPECIFIC_DATE: "Specific Date/Time",
};

export const ServiceRequestDetails: Component<{
  isOpen: Accessor<boolean>;
  listing: ListingPayload;
  closeModel: Setter<boolean>;
}> = (props) => {
  //   const [request] = createSignal<ListingPayload>(props.listing);
  //   const [isLoading, setIsLoading] = createSignal(true);
  //   const [isNotFound, setIsNotFound] = createSignal(false);

  //   createEffect(() => {
  //     const requestId = getQueryParam("id");

  //     if (!requestId) {
  //       setIsLoading(false);
  //       setIsNotFound(true);
  //       return;
  //     }

  //     // Simulate fetching data (replace with actual API call in a real app)
  //     setTimeout(() => {
  //       const foundRequest = allServiceRequests.find(
  //         (req) => req.id === requestId
  //       )!;
  //       if (foundRequest) {
  //         setRequest(foundRequest);
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //         setIsNotFound(true);
  //       }
  //     }, 500); // Simulate network delay
  //   });

  //   const handleSubmitProposal = () => {
  //     if (request()) {
  //       alert(
  //         `Simulating "Submit Proposal" for "${request()!.requestTitle}" (ID: ${
  //           request()!.id
  //         }).\n\nThis would lead to a form for sending a quote and message to the customer.`
  //       );
  //     }
  //   };

  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
          classList={{ "modal-overlay": true, active: props.isOpen() }}
        >
          <div class={modal_styles.modal_content}>
            <button
              class="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-flex items-center"
              onClick={() => props.closeModel(false)}
            >
              <svg
                class="mr-2 h-4 w-4"
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
              Back to All Requests
            </button>

            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">
              <Show when={props.listing} fallback={"Loading Request..."}>
                {props.listing!.requestTitle}
              </Show>
            </h1>

            <div class="space-y-6">
              {/* <Show when={isLoading()}>
                <p class="text-center text-gray-500">
                  Loading request details...
                </p>
              </Show>

              <Show when={isNotFound()}>
                <p class="text-center text-red-500">
                  Request not found. Please check the URL.
                </p>
              </Show> */}

              <Show when={props.listing}>
                {(req) => (
                  <>
                    <section class="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        About the Request
                      </h2>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                          <p class="font-medium">Service Category:</p>
                          <p>{req().serviceCategory}</p>
                        </div>
                        <div>
                          <p class="font-medium">Desired Timeline:</p>
                          <p>
                            {urgencyMap[req().desiredTimeline] ||
                              req().desiredTimeline}
                            <Show
                              when={
                                req().desiredTimeline === "SPECIFIC_DATE" &&
                                req().specificDateTime
                              }
                            >
                              <br />(
                              {new Date(req().specificDateTime).toLocaleString(
                                "en-DE",
                                { dateStyle: "short", timeStyle: "short" }
                              )}
                              )
                            </Show>
                          </p>
                        </div>
                        <div>
                          <p class="font-medium">Estimated Budget:</p>
                          <p>
                            {req().estimatedBudget
                              ? `${req().estimatedBudget} EUR`
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p class="font-medium">Posted On:</p>
                          <p>
                            {new Date(req().postedDate).toLocaleDateString(
                              "en-DE",
                              { dateStyle: "short" }
                            )}{" "}
                            at{" "}
                            {new Date(req().postedDate).toLocaleTimeString(
                              "en-DE",
                              { timeStyle: "short" }
                            )}
                          </p>
                        </div>
                      </div>
                      <div class="mt-4">
                        <p class="font-medium">Detailed Description:</p>
                        <p class="mt-1 leading-relaxed whitespace-pre-wrap">
                          {req().requestDescription}
                        </p>
                      </div>
                      <Show when={req().additionalNotes}>
                        <div class="mt-4">
                          <p class="font-medium">
                            Additional Notes/Preferences:
                          </p>
                          <p class="mt-1 italic text-gray-600">
                            {req().additionalNotes}
                          </p>
                        </div>
                      </Show>
                    </section>

                    <section class="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        Location Details
                      </h2>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                          <p class="font-medium">Street Address/Area:</p>
                          <p>{req().locationStreet}</p>
                        </div>
                        <div>
                          <p class="font-medium">City & Postal Code:</p>
                          <p>
                            {req().locationCity}, {req().locationPostalCode}
                          </p>
                        </div>
                        <div>
                          <p class="font-medium">Country:</p>
                          <p>{req().locationCountry}</p>
                        </div>
                      </div>
                      <Show when={req().specificLocationDetails}>
                        <div class="mt-4">
                          <p class="font-medium">Specific Location Details:</p>
                          <p class="mt-1 leading-relaxed">
                            {req().specificLocationDetails}
                          </p>
                        </div>
                      </Show>
                    </section>

                    <section class="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        Customer & Contact
                      </h2>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                          <p class="font-medium">Customer (Placeholder):</p>
                          <p>{req().customerName || "Anonymous Customer"}</p>
                        </div>
                        <div>
                          <p class="font-medium">Preferred Contact Method:</p>
                          <p>{req().contactMethod}</p>
                        </div>
                      </div>
                    </section>

                    <section class="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        Attachments
                      </h2>
                      <Show
                        when={req().attachments && req().attachments.length > 0}
                        fallback={
                          <p class="text-gray-500 text-sm">
                            No attachments provided.
                          </p>
                        }
                      >
                        <Show
                          when={
                            req().attachments.filter(
                              (att) => att.type === "image"
                            ).length > 0
                          }
                        >
                          <div>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">
                              Attached Images:
                            </h3>
                            <div class="image-gallery">
                              <For
                                each={req().attachments.filter(
                                  (att) => att.type === "image"
                                )}
                              >
                                {(img) => (
                                  <img
                                    src={img.url}
                                    alt={img.name}
                                    title={img.name}
                                  />
                                )}
                              </For>
                            </div>
                          </div>
                        </Show>

                        <Show
                          when={
                            req().attachments.filter(
                              (att) => att.type !== "image"
                            ).length > 0
                          }
                        >
                          <div class="mt-4">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">
                              Attached Documents:
                            </h3>
                            <For
                              each={req().attachments.filter(
                                (att) => att.type !== "image"
                              )}
                            >
                              {(file) => (
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="file-link"
                                >
                                  <svg
                                    class="h-5 w-5 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h4v2H6V4zm6 0h2v2h-2V4zm-2 5a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>{file.name}</span>
                                </a>
                              )}
                            </For>
                          </div>
                        </Show>
                      </Show>
                    </section>
                  </>
                )}
              </Show>
            </div>

            {/* <Show when={!isLoading() && !isNotFound()}>
              <div class="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmitProposal}
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit Proposal
                </button>
                <p class="text-gray-500 text-center text-sm mt-3">
                  Clicking "Submit Proposal" will allow you to send a quote and
                  message to the customer.
                </p>
              </div>
            </Show> */}
          </div>
        </div>
      </Show>
    </Portal>
  );
};
