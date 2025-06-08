import { createSignal, onMount, Show, For } from "solid-js";

// Define a type for the service data for better readability and type-checking (optional, remove if not using TypeScript)
/**
 * @typedef {object} ServiceData
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} providerName
 * @property {string} category
 * @property {string} serviceType
 * @property {{ hourlyRate?: number, projectPrice?: number, oneTimePrice?: number, salaryExpectation?: number, currency: string }} price
 * @property {string[]} paymentMethods
 * @property {string} deliveryMethod
 * @property {string} serviceLocation
 * @property {string[]} availabilityDays
 * @property {{from: string, to: string}[]} availableTimes
 * @property {string[]} skills
 * @property {boolean} hasAttachments
 * @property {'platform-chat' | 'email' | 'phone'} contactPreference
 */

export const ServiceDetailsComponent = () => {
  // Simulated Service Data (replace with actual fetch from backend)
  // @type {ServiceData}
  const [serviceData, _] = createSignal({
    id: "123",
    title: "Expert Home Cleaning Service",
    description:
      "Offering professional and thorough home cleaning services for apartments and houses. I use eco-friendly products and pay attention to every detail, ensuring your home sparkles. Services include vacuuming, mopping, dusting, bathroom and kitchen sanitation, and window cleaning. Available for one-time deep cleans or regular maintenance.",
    providerName: "Alice Smith",
    category: "Cleaning",
    serviceType: "hourly",
    price: {
      hourlyRate: 30,
      currency: "EUR",
      projectPrice: 45,
      salaryExpectation: 456,
      oneTimePrice: 344,
    },
    paymentMethods: ["stripe", "cash"],
    deliveryMethod: "on-site",
    serviceLocation: "Nuremberg, Germany",
    availabilityDays: ["monday", "wednesday", "friday"],
    availableTimes: [
      { from: "09:00", to: "13:00" },
      { from: "14:00", to: "18:00" },
    ],
    skills: [
      "Deep Cleaning",
      "Eco-friendly Products",
      "Time Management",
      "Attention to Detail",
    ],
    hasAttachments: true,
    contactPreference: "platform-chat", // Provider's preferred method from their listing
  });

  // State for managing active communication tab
  const [activeTab, setActiveTab] = createSignal("chat"); // 'chat', 'callback', 'email'

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

  // Derived signal for formatted service type
  const formattedServiceType = () => {
    const type = serviceData().serviceType;
    return type.replace("-", " ").charAt(0).toUpperCase() + type.slice(1);
  };

  // Derived signal for price display
  const priceDisplay = () => {
    const data = serviceData();
    let priceText = "";
    switch (data.serviceType) {
      case "hourly":
        priceText = `${data.price.hourlyRate} ${data.price.currency}/hour`;
        break;
      case "project-based":
        priceText = `${data.price.projectPrice || "Negotiable"} ${
          data.price.currency
        }`;
        break;
      case "full-employment":
      case "part-employment":
        priceText = `${data.price.salaryExpectation || "Negotiable"} ${
          data.price.currency
        } (expected)`;
        break;
      case "one-time":
        priceText = `${data.price.oneTimePrice || "Negotiable"} ${
          data.price.currency
        }`;
        break;
      default:
        priceText = "Price not specified";
    }
    return priceText;
  };

  // Derived signal for formatted delivery method
  const formattedDeliveryMethod = () => {
    const method = serviceData().deliveryMethod;
    return method.replace("-", " ").charAt(0).toUpperCase() + method.slice(1);
  };

  // Handler for tab clicks
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

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

  // Set initial active tab on component mount based on contactPreference
  onMount(() => {
    const preference = serviceData().contactPreference;
    if (preference === "email") {
      setActiveTab("email");
    } else if (preference === "phone") {
      setActiveTab("callback");
    } else {
      setActiveTab("chat");
    }
  });

  return (
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div class="mb-6">
          <a
            href="#"
            class="text-blue-600 hover:text-blue-800 flex items-center"
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
          </a>
        </div>

        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          {serviceData().title}
        </h1>
        <p class="text-md text-gray-600 mb-6">
          Offered by:{" "}
          <span class="font-semibold text-blue-700">
            {serviceData().providerName}
          </span>
        </p>

        <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Service Overview
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            {serviceData().description}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong class="font-semibold">Category:</strong>{" "}
              {serviceData().category}
            </p>
            <p>
              <strong class="font-semibold">Service Type:</strong>{" "}
              {formattedServiceType()}
            </p>
            <p>
              <strong class="font-semibold">Pricing:</strong> {priceDisplay()}
            </p>
            <p>
              <strong class="font-semibold">Delivery Method:</strong>{" "}
              {formattedDeliveryMethod()}
            </p>
            <Show
              when={
                serviceData().deliveryMethod === "on-site" ||
                serviceData().deliveryMethod === "my-location"
              }
            >
              <p>
                <strong class="font-semibold">Location:</strong>{" "}
                {serviceData().serviceLocation}
              </p>
            </Show>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800">
              Skills & Requirements:
            </h3>
            <ul class="list-disc list-inside text-gray-700 ml-4">
              <Show
                when={serviceData().skills && serviceData().skills.length > 0}
                fallback={<li>No specific skills listed.</li>}
              >
                <For each={serviceData().skills}>
                  {(skill) => <li>{skill}</li>}
                </For>
              </Show>
            </ul>
          </div>
          <Show when={serviceData().hasAttachments}>
            <div class="mt-4 text-gray-700">
              <h3 class="text-lg font-semibold text-gray-800">
                Portfolio / Attachments:
              </h3>
              <p>
                Provider has attached relevant documents or portfolio items.
                (Click to view/download in a real application).
              </p>
            </div>
          </Show>
        </section>

        <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
          <p>
            <strong class="font-semibold">Available Days:</strong>{" "}
            <Show
              when={
                serviceData().availabilityDays &&
                serviceData().availabilityDays.length > 0
              }
              fallback="Not specified"
            >
              {serviceData()
                .availabilityDays.map(
                  (day) => day.charAt(0).toUpperCase() + day.slice(1)
                )
                .join(", ")}
            </Show>
          </p>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800">Time Slots:</h3>
            <ul class="list-disc list-inside text-gray-700 ml-4">
              <Show
                when={
                  serviceData().availableTimes &&
                  serviceData().availableTimes.length > 0
                }
                fallback={
                  <li class="text-gray-500">
                    No specific availability times provided, please inquire.
                  </li>
                }
              >
                <For each={serviceData().availableTimes}>
                  {(slot) => (
                    <li>
                      {slot.from} - {slot.to}
                    </li>
                  )}
                </For>
              </Show>
            </ul>
          </div>
        </section>

        <section class="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-blue-800 mb-4">
            Contact the Provider
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleTabClick("chat")}
              class={`${
                activeTab() === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }
                                py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            >
              <span class="block text-xl">💬</span> Send a Message
            </button>
            <button
              type="button"
              onClick={() => handleTabClick("callback")}
              class={`${
                activeTab() === "callback"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }
                                py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            >
              <span class="block text-xl">📞</span> Request a Callback
            </button>
            <button
              type="button"
              onClick={() => handleTabClick("email")}
              class={`${
                activeTab() === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }
                                py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            >
              <span class="block text-xl">📧</span> Send an Email
            </button>
          </div>

          <Show when={activeTab() === "chat"}>
            <div class="p-4 border border-blue-300 rounded-md bg-white">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Direct Message
              </h3>
              <p class="text-gray-600 mb-4">
                Start a private chat with the service provider on our platform.
              </p>
              <textarea
                rows="4"
                class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Type your message here..."
                value={chatMessage()}
                onInput={(e) => setChatMessage(e.currentTarget.value)}
              ></textarea>
              <button
                type="button"
                onClick={handleSendMessage}
                class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </Show>

          <Show when={activeTab() === "callback"}>
            <div class="p-4 border border-blue-300 rounded-md bg-white">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Request a Callback
              </h3>
              <p class="text-gray-600 mb-4">
                Fill out the form below and the provider will call you back at
                your preferred time.
              </p>
              <form onSubmit={(e) => handleSubmitCallback(e)} class="space-y-4">
                <div>
                  <label
                    for="callbackName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="callbackName"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={callbackName()}
                    onInput={(e) => setCallbackName(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="callbackPhone"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="callbackPhone"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="+49 123 456789"
                    value={callbackPhone()}
                    onInput={(e) => setCallbackPhone(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="callbackTime"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Preferred Callback Time
                  </label>
                  <input
                    type="datetime-local"
                    id="callbackTime"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={callbackTime()}
                    onInput={(e) => setCallbackTime(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="callbackMessage"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Brief Message
                  </label>
                  <textarea
                    id="callbackMessage"
                    rows="3"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., I'm interested in your cleaning service for a large apartment."
                    value={callbackMessage()}
                    onInput={(e) => setCallbackMessage(e.currentTarget.value)}
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
          </Show>

          <Show when={activeTab() === "email"}>
            <div class="p-4 border border-blue-300 rounded-md bg-white">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Send an Email
              </h3>
              <p class="text-gray-600 mb-4">
                Send a direct email to the service provider.
              </p>
              <form onSubmit={handleSubmitEmail} class="space-y-4">
                <div>
                  <label
                    for="emailSenderName"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="emailSenderName"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={emailSenderName()}
                    onInput={(e) => setEmailSenderName(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="emailSenderEmail"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="emailSenderEmail"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="your.email@example.com"
                    value={emailSenderEmail()}
                    onInput={(e) => setEmailSenderEmail(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="emailSubject"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="emailSubject"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Inquiry about your service"
                    value={emailSubject()}
                    onInput={(e) => setEmailSubject(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="emailMessage"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="emailMessage"
                    rows="6"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Write your detailed message here..."
                    value={emailMessage()}
                    onInput={(e) => setEmailMessage(e.currentTarget.value)}
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
          </Show>
        </section>
      </div>
    </div>
  );
};
