import {
  Show,
  For,
  Component,
  Accessor,
  Setter,
  createSignal,
  Switch,
  Match,
  createEffect,
} from "solid-js";
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
  listing: Accessor<ListingPayload | undefined>;
  closeModel: Setter<boolean>;
}> = (props) => {
  // State for form inputs
  const [chatMessage, setChatMessage] = createSignal("");
  const [callbackName, setCallbackName] = createSignal("");
  const [callbackPhone, setCallbackPhone] = createSignal("");
  const [callbackTime, setCallbackTime] = createSignal("");
  const [callbackMessage, setCallbackMessage] = createSignal("");
  const [emailSenderName, setEmailSenderName] = createSignal("");
  const [emailSenderEmail, setEmailSenderEmail] = createSignal("");
  const [emailSubject, setEmailSubject] = createSignal("");
  const [emailMessage, setEmailMessage] = createSignal("");
  const [contactMethod, setContactMethod] = createSignal(
    props.listing()?.contact_method
  );
  //   const [activeTab, setActiveTab] = createSignal(
  //     props.listing()?.contact_method
  //   ); // 'chat', 'callback', 'email'
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

  // Handler for tab clicks
  //   const handleTabClick = (tabName: string) => {
  //     setActiveTab(tabName);
  //   };

  // Form submission handlers
  const handleSendMessage = () => {
    const message = chatMessage().trim();
    if (message) {
      console.log("Sending message:", message);
      alert("Message sent to provider! (Check console)");
      setChatMessage(""); // Clear input
    } else {
      alert("Please type a message.");
    }
  };

  const handleSubmitCallback = (
    event: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    event.preventDefault();
    const name = callbackName().trim();
    const phone = callbackPhone().trim();
    const time = callbackTime();
    const message = callbackMessage().trim();

    if (name && phone && time) {
      console.log("Callback Request:", { name, phone, time, message });
      alert("Callback request submitted! (Check console)");
      // Clear form inputs
      setCallbackName("");
      setCallbackPhone("");
      setCallbackTime("");
      setCallbackMessage("");
    } else {
      alert(
        "Please fill in your Name, Phone Number, and Preferred Callback Time."
      );
    }
  };

  const handleSubmitEmail = (
    event: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    event.preventDefault();
    const senderName = emailSenderName().trim();
    const senderEmail = emailSenderEmail().trim();
    const subject = emailSubject().trim();
    const message = emailMessage().trim();

    if (senderName && senderEmail && subject && message) {
      console.log("Email Request:", {
        senderName,
        senderEmail,
        subject,
        message,
      });
      alert("Email sent to provider! (Check console)");
      // Clear form inputs
      setEmailSenderName("");
      setEmailSenderEmail("");
      setEmailSubject("");
      setEmailMessage("");
    } else {
      alert("Please fill in all email fields.");
    }
  };

  createEffect(() => {
    if (props.listing()) {
      console.log(
        props.listing()?.contact_method,
        "props.listing()?.contact_methodprops.listing()?.contact_methodprops.listing()?.contact_method"
      );
      setContactMethod(props.listing()?.contact_method);
    }
  });
  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
          classList={{ "modal-overlay": true, active: props.isOpen() }}
        >
          <div class={modal_styles.modal_content}>
            <button
              class="text-blue-600 hover:text-blue-800 text-sm font-bold mb-6 inline-flex items-center"
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
                {props.listing()!.title}
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

              <Show when={props.listing()}>
                {(req) => (
                  <>
                    <section class="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        About the Request
                      </h2>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                          <p class="font-bold">Service Category:</p>
                          <p>{req().category}</p>
                        </div>
                        <div>
                          <p class="font-bold">Desired Timeline:</p>
                          <p>
                            {urgencyMap[req().desired_timeline] ||
                              req().desired_timeline}
                            <Show
                              when={
                                req().desired_timeline === "SPECIFIC_DATE" &&
                                req().specific_date_time
                              }
                            >
                              <br />(
                              {new Date(
                                req().specific_date_time
                              ).toLocaleString("en-DE", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                              )
                            </Show>
                          </p>
                        </div>
                        <div>
                          <p class="font-bold">Estimated Budget:</p>
                          <p>
                            {req().estimated_budget
                              ? `${req().estimated_budget} EUR`
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p class="font-bold">Posted On:</p>
                          <p>
                            {new Date(req().created_at!).toLocaleDateString(
                              "en-DE",
                              { dateStyle: "short" }
                            )}{" "}
                            at{" "}
                            {new Date(req().created_at!).toLocaleTimeString(
                              "en-DE",
                              { timeStyle: "short" }
                            )}
                          </p>
                        </div>
                      </div>
                      <div class="mt-4">
                        <p class="font-bold">Detailed Description:</p>
                        <p class="mt-1 leading-relaxed whitespace-pre-wrap">
                          {req().description}
                        </p>
                      </div>
                      <Show when={req().additional_notes}>
                        <div class="mt-4">
                          <p class="font-bold">Additional Notes/Preferences:</p>
                          <p class="mt-1 italic text-gray-600">
                            {req().additional_notes}
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
                          <p class="font-bold">Street Address/Area:</p>
                          <p>{req().location_street}</p>
                        </div>
                        <div>
                          <p class="font-bold">City & Postal Code:</p>
                          <p>
                            {req().location_city}, {req().location_postal_code}
                          </p>
                        </div>
                        <div>
                          <p class="font-bold">Country:</p>
                          <p>{req().location_country}</p>
                        </div>
                      </div>
                      <Show when={req().specific_location_details}>
                        <div class="mt-4">
                          <p class="font-bold">Specific Location Details:</p>
                          <p class="mt-1 leading-relaxed">
                            {req().specific_location_details}
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
                          <p class="font-bold">Customer (Placeholder):</p>
                          <p>{req().customer_name || "Anonymous Customer"}</p>
                        </div>
                        <div>
                          <p class="font-bold">Preferred Contact Method:</p>
                          <p>{req().contact_method}</p>
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

                    <section class="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg mt-5">
                      <h2 class="text-2xl font-bold text-blue-800 mb-4">
                        Provide this service
                      </h2>
                      <h4 class="text-sm font-bold text-yellow-800 mb-4">
                        You can only contact this client based their prefered
                        means of communication
                      </h4>

                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <Switch>
                          <Match when={contactMethod() === "Email"}>
                            <button
                              type="button"
                              class={`${
                                contactMethod() === "Email"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-800"
                              }
                        py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                            >
                              <span class="block text-xl">📧</span> Send an
                              Email
                            </button>
                          </Match>
                          <Match when={contactMethod() === "Phone Call"}>
                            <button
                              type="button"
                              class={`${
                                contactMethod() === "Phone Call"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-800"
                              }
                           py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                            >
                              <span class="block text-xl">📞</span> Request a
                              Callback
                            </button>
                          </Match>
                          <Match when={contactMethod() === "Platform Chat"}>
                            <button
                              type="button"
                              class={`${
                                contactMethod() === "Platform Chat"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-800"
                              }
                            py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                            >
                              <span class="block text-xl">💬</span> Send a
                              Message
                            </button>
                          </Match>
                        </Switch>
                      </div>

                      <Switch>
                        <Match
                          when={props.listing()?.contact_method === "Email"}
                        >
                          <div class="p-4 border border-blue-300 rounded-md bg-white">
                            <h3 class="text-xl font-semibold text-gray-800 mb-3">
                              Send an Email
                            </h3>
                            <p class="text-gray-600 mb-4">
                              Send a direct email to the service provider.
                            </p>
                            <form
                              onSubmit={handleSubmitEmail}
                              class="space-y-4"
                            >
                              <div>
                                <label
                                  for="emailSenderName"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Your Name
                                </label>
                                <input
                                  type="text"
                                  id="emailSenderName"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={emailSenderName()}
                                  onInput={(e) =>
                                    setEmailSenderName(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="emailSenderEmail"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Your Email Address
                                </label>
                                <input
                                  type="email"
                                  id="emailSenderEmail"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="your.email@example.com"
                                  value={emailSenderEmail()}
                                  onInput={(e) =>
                                    setEmailSenderEmail(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="emailSubject"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Subject
                                </label>
                                <input
                                  type="text"
                                  id="emailSubject"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="Inquiry about your service"
                                  value={emailSubject()}
                                  onInput={(e) =>
                                    setEmailSubject(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="emailMessage"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Message
                                </label>
                                <textarea
                                  id="emailMessage"
                                  rows="6"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="Write your detailed message here..."
                                  value={emailMessage()}
                                  onInput={(e) =>
                                    setEmailMessage(e.currentTarget.value)
                                  }
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Send Email
                              </button>
                            </form>
                          </div>
                        </Match>
                        <Match
                          when={
                            props.listing()?.contact_method === "Phone Call"
                          }
                        >
                          <div class="p-4 border border-blue-300 rounded-md bg-white">
                            <h3 class="text-xl font-semibold text-gray-800 mb-3">
                              Request a Callback
                            </h3>
                            <p class="text-gray-600 mb-4">
                              Fill out the form below and the provider will call
                              you back at your preferred time.
                            </p>
                            <form
                              onSubmit={(e) => handleSubmitCallback(e)}
                              class="space-y-4"
                            >
                              <div>
                                <label
                                  for="callbackName"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Your Name
                                </label>
                                <input
                                  type="text"
                                  id="callbackName"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={callbackName()}
                                  onInput={(e) =>
                                    setCallbackName(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="callbackPhone"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Your Phone Number
                                </label>
                                <input
                                  type="tel"
                                  id="callbackPhone"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="+49 123 456789"
                                  value={callbackPhone()}
                                  onInput={(e) =>
                                    setCallbackPhone(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="callbackTime"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Preferred Callback Time
                                </label>
                                <input
                                  type="datetime-local"
                                  id="callbackTime"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={callbackTime()}
                                  onInput={(e) =>
                                    setCallbackTime(e.currentTarget.value)
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  for="callbackMessage"
                                  class="block text-sm font-bold text-gray-700"
                                >
                                  Brief Message
                                </label>
                                <textarea
                                  id="callbackMessage"
                                  rows="3"
                                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder="e.g., I'm interested in your cleaning service for a large apartment."
                                  value={callbackMessage()}
                                  onInput={(e) =>
                                    setCallbackMessage(e.currentTarget.value)
                                  }
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Submit Callback Request
                              </button>
                            </form>
                          </div>
                        </Match>
                        <Match
                          when={
                            props.listing()?.contact_method === "Platform Chat"
                          }
                        >
                          <div class="p-4 border border-blue-300 rounded-md bg-white">
                            <h3 class="text-xl font-semibold text-gray-800 mb-3">
                              Direct Message
                            </h3>
                            <p class="text-gray-600 mb-4">
                              Start a private chat with the service provider on
                              our platform.
                            </p>
                            <textarea
                              rows="4"
                              class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Type your message here..."
                              value={chatMessage()}
                              onInput={(e) =>
                                setChatMessage(e.currentTarget.value)
                              }
                            ></textarea>
                            <button
                              type="button"
                              onClick={handleSendMessage}
                              class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Send Message
                            </button>
                          </div>
                        </Match>
                      </Switch>
                    </section>
                  </>
                )}
              </Show>
            </div>

            {/* <Show when={!isLoading() && !isNotFound()}>
              <div class="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmitProposal}
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
