import { createSignal, onMount, For, Show, Component } from "solid-js";

export const ListingDetailPage: Component = () => {
  // Simulated Service Data (replace with actual fetch from backend)
  const [serviceData, _] = createSignal({
    serviceTitle: "Professional House Cleaning",
    serviceDescription:
      "Offering top-notch house cleaning services for homes of all sizes. Experienced and reliable, ensuring a spotless and healthy living environment. Services include dusting, vacuuming, mopping, kitchen and bathroom cleaning, and more. Customizable plans available for weekly, bi-weekly, or monthly cleaning.",
    providerName: "Jane Miller",
    serviceCategory: "Cleaning",
    serviceType: "hourly", // Can be 'hourly', 'project-based', 'one-time', 'full-employment', 'part-employment'
    hourlyRate: 35,
    projectPrice: 454,
    oneTimePrice: 343,
    salaryExpectation: 334,
    currency: "EUR",
    paymentMethods: ["stripe", "paypal"],
    deliveryMethod: "on-site",
    serviceLocation: "Nuremberg, Bavaria, Germany",
    availabilityDays: ["monday", "wednesday", "friday"],
    availableTimes: [
      { from: "09:00", to: "13:00" },
      { from: "14:00", to: "18:00" },
    ],
    serviceSkills:
      "Attention to Detail, Time Management, Customer Service, Cleaning Products Knowledge",
    attachments: [
      {
        name: "Portfolio_Cleaning_Sample1.jpg",
        url: "https://picsum.photos/200?random=1",
        type: "image",
      },
      {
        name: "Portfolio_Cleaning_Sample1.jpg",
        url: "https://picsum.photos/200?random=2",
        type: "image",
      },
      {
        name: "Portfolio_Cleaning_Sample1.jpg",
        url: "https://picsum.photos/200?random=3",
        type: "image",
      },
      {
        name: "Portfolio_Cleaning_Sample1.jpg",
        url: "https://picsum.photos/200?random=4",
        type: "image",
      },
      {
        name: "Client_Testimonial.pdf",
        url: "https://www.africau.edu/images/default/sample.pdf",
        type: "document",
      },
    ],
    contactPreference: "platform-chat", // 'platform-chat', 'email', 'phone'
    contactEmail: "jane.miller.clean@example.com",
    contactPhone: "+491701234567",
  });

  const [showMessageForm, setShowMessageForm] = createSignal(false);
  const [showCallbackForm, setShowCallbackForm] = createSignal(false);
  const [showEmailForm, setShowEmailForm] = createSignal(false);

  const [chatMessage, setChatMessage] = createSignal("");
  const [callbackPhone, setCallbackPhone] = createSignal("");
  const [callbackTime, setCallbackTime] = createSignal("");
  const [emailSubject, setEmailSubject] = createSignal("");
  const [emailBody, setEmailBody] = createSignal("");

  // Function to calculate price display
  const priceDisplay = () => {
    const data = serviceData();
    let priceText = "";
    let priceNote = "";

    switch (data.serviceType) {
      case "hourly":
        priceText = `${data.hourlyRate} ${data.currency}/hour`;
        priceNote = "Estimated based on hourly rate";
        break;
      case "project-based":
        priceText = data.projectPrice
          ? `${data.projectPrice} ${data.currency} (Fixed)`
          : "Price negotiable";
        priceNote = data.projectPrice
          ? "Fixed price for the entire project"
          : "Contact provider for project quote";
        break;
      case "one-time":
        priceText = data.oneTimePrice
          ? `${data.oneTimePrice} ${data.currency}`
          : "Price negotiable";
        priceNote = data.oneTimePrice
          ? "One-time service fee"
          : "Contact provider for a quote";
        break;
      case "full-employment":
      case "part-employment":
        priceText = data.salaryExpectation
          ? `${data.salaryExpectation} ${data.currency} / year`
          : "Salary negotiable";
        priceNote = data.salaryExpectation
          ? "Desired salary for employment"
          : "Discuss salary expectations with provider";
        break;
      default:
        priceText = "Price not specified";
        priceNote = "Contact provider for pricing details";
    }
    return { priceText, priceNote };
  };

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm());
    setShowCallbackForm(false);
    setShowEmailForm(false);
  };

  const submitMessage = () => {
    const message = chatMessage().trim();
    if (message) {
      alert(
        `Simulating message to ${serviceData().providerName}: "${message}"`
      );
      setChatMessage("");
      setShowMessageForm(false);
    } else {
      alert("Please enter a message.");
    }
  };

  const toggleCallbackForm = () => {
    setShowCallbackForm(!showCallbackForm());
    setShowMessageForm(false);
    setShowEmailForm(false);
  };

  const submitCallback = () => {
    const phone = callbackPhone().trim();
    const time = callbackTime();
    if (phone && time) {
      alert(
        `Simulating callback request to ${
          serviceData().providerName
        }: Phone - ${phone}, Time - ${new Date(time).toLocaleString()}`
      );
      setCallbackPhone("");
      setCallbackTime("");
      setShowCallbackForm(false);
    } else {
      alert("Please enter your phone number and preferred callback time.");
    }
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm());
    setShowMessageForm(false);
    setShowCallbackForm(false);
  };

  const submitEmail = () => {
    const subject = emailSubject().trim();
    const body = emailBody().trim();
    if (subject && body) {
      alert(
        `Simulating email to ${
          serviceData().providerName
        }: Subject - "${subject}", Body - "${body}"`
      );
      setEmailSubject("");
      setEmailBody("");
      setShowEmailForm(false);
    } else {
      alert("Please enter a subject and a message for your email.");
    }
  };

  // In a real app, you might fetch data on component mount
  onMount(() => {
    // Example: const serviceId = new URLSearchParams(window.location.search).get('id');
    // fetch(`/api/services/${serviceId}`).then(res => res.json()).then(data => setServiceData(data));
  });

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg">
        <header class="mb-8 pb-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
              {serviceData().serviceTitle}
            </h1>
            <p class="text-lg text-blue-600 font-semibold">
              Provided by: <span>{serviceData().providerName || "N/A"}</span>
            </p>
            <div class="flex items-center text-gray-600 text-sm mt-2">
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                {serviceData().serviceCategory.charAt(0).toUpperCase() +
                  serviceData().serviceCategory.slice(1)}
              </span>
              <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {serviceData()
                  .serviceType.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </div>
          </div>
          <div class="mt-4 md:mt-0 text-right">
            <p class="text-3xl font-bold text-gray-900">
              {priceDisplay().priceText}
            </p>
            <p class="text-sm text-gray-500 mt-1">{priceDisplay().priceNote}</p>
          </div>
        </header>

        <main class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                About This Service
              </h2>
              <p class="text-gray-700 leading-relaxed">
                {serviceData().serviceDescription}
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Location & Delivery
              </h2>
              <p class="text-gray-700 mb-2">
                <span class="font-medium">Delivery Method:</span>{" "}
                {serviceData().deliveryMethod.charAt(0).toUpperCase() +
                  serviceData().deliveryMethod.slice(1).replace("-", " ")}
              </p>
              <Show
                when={
                  serviceData().deliveryMethod === "on-site" ||
                  serviceData().deliveryMethod === "my-location"
                }
              >
                <p class="text-gray-700">
                  <span class="font-medium">Location:</span>{" "}
                  {serviceData().serviceLocation}
                </p>
              </Show>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Availability
              </h2>
              <p class="text-gray-700 mb-2">
                <span class="font-medium">Available Days:</span>{" "}
                <span class="flex flex-wrap gap-2 mt-2">
                  <Show
                    when={
                      serviceData().availabilityDays &&
                      serviceData().availabilityDays.length > 0
                    }
                    fallback={<p>Not specified</p>}
                  >
                    <For each={serviceData().availabilityDays}>
                      {(day) => (
                        <span class="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                      )}
                    </For>
                  </Show>
                </span>
              </p>
              <div class="mt-4">
                <span class="font-medium block text-gray-700 mb-2">
                  Available Time Slots:
                </span>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  <Show
                    when={
                      serviceData().availableTimes &&
                      serviceData().availableTimes.length > 0
                    }
                    fallback={
                      <li>
                        No specific time slots provided. Contact provider for
                        availability.
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

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Skills & Requirements
              </h2>
              <p class="text-gray-700 leading-relaxed">
                {serviceData().serviceSkills || "No specific skills listed."}
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                Portfolio / Work Samples
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Show
                  when={
                    serviceData().attachments &&
                    serviceData().attachments.length > 0
                  }
                  fallback={
                    <p class="text-gray-500 col-span-full">
                      No attachments provided.
                    </p>
                  }
                >
                  <For each={serviceData().attachments}>
                    {(attachment) => (
                      <div class="border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
                        <Show when={attachment.type === "image"}>
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            class="w-full h-32 object-cover mb-2 rounded"
                          />
                        </Show>
                        <p class="text-sm font-medium text-gray-800">
                          {attachment.name}
                        </p>
                        <a
                          href={attachment.url}
                          target="_blank"
                          class="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View{" "}
                          {attachment.type === "image" ? "Image" : "Document"}
                        </a>
                      </div>
                    )}
                  </For>
                </Show>
              </div>
            </section>
          </div>

          <aside class="lg:col-span-1 bg-blue-50 p-6 rounded-lg shadow-inner sticky top-4 h-fit">
            <h2 class="text-2xl font-bold text-blue-800 mb-6">
              Contact the Provider
            </h2>

            <div class="mb-6">
              <button
                onClick={toggleMessageForm}
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  class="inline-block h-5 w-5 mr-2 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
                Send a Message (Platform Chat)
              </button>
              <Show when={showMessageForm()}>
                <div class="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                  <textarea
                    rows="4"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Type your message here..."
                    value={chatMessage()}
                    onInput={(e) => setChatMessage(e.currentTarget.value)}
                  ></textarea>
                  <button
                    onClick={submitMessage}
                    class="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send Message
                  </button>
                </div>
              </Show>
            </div>

            <div class="mb-6">
              <button
                onClick={toggleCallbackForm}
                class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg
                  class="inline-block h-5 w-5 mr-2 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9l2.5 2.5L14 12.5l1.5 1.5L17.5 14l2.5 2.5L21 16.72V20a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a1 1 0 011-1h1.72a1 1 0 00.707-.293l.173-.173A1 1 0 005.28 14H3"
                  ></path>
                </svg>
                Request a Callback
              </button>
              <Show when={showCallbackForm()}>
                <div class="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                  <input
                    type="tel"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Your phone number (e.g., +49 123 456789)"
                    value={callbackPhone()}
                    onInput={(e) => setCallbackPhone(e.currentTarget.value)}
                  />
                  <input
                    type="datetime-local"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={callbackTime()}
                    onInput={(e) => setCallbackTime(e.currentTarget.value)}
                  />
                  <button
                    onClick={submitCallback}
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit Request
                  </button>
                </div>
              </Show>
            </div>

            <div>
              <button
                onClick={toggleEmailForm}
                class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <svg
                  class="inline-block h-5 w-5 mr-2 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h6l2 2H5a2 2 0 01-2-2z"
                  ></path>
                </svg>
                Send an Email
              </button>
              <Show when={showEmailForm()}>
                <div class="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                  <input
                    type="text"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Subject"
                    value={emailSubject()}
                    onInput={(e) => setEmailSubject(e.currentTarget.value)}
                  />
                  <textarea
                    rows="5"
                    class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Your message..."
                    value={emailBody()}
                    onInput={(e) => setEmailBody(e.currentTarget.value)}
                  ></textarea>
                  <button
                    onClick={submitEmail}
                    class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send Email
                  </button>
                </div>
              </Show>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};
