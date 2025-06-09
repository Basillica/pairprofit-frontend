import about_styles from "./style.module.css"; // We'll put the custom CSS here

export const AboutUs = () => {
  // You might want to replace "[Your App Name]" with a prop or a context value
  const appName = "PariProfit"; // Example app name

  // Although <details> elements manage their own open/close state natively,
  // if you needed to control them programmatically or react to their state,
  // you'd use createSignal for each, e.g.:
  // const [isFaq1Open, setIsFaq1Open] = createSignal(false);
  // and then set `open={isFaq1Open()}` and `onClick={() => setIsFaq1Open(!isFaq1Open())}`
  // on the <details> element. However, for a simple FAQ, native is often best.

  // If you need to dynamically inject content or handle interactions, SolidJS shines.
  // For static content like this, the conversion is mostly structural.

  return (
    <div class="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-4xl font-extrabold text-gray-900 text-center mb-8">
          About {appName}
        </h1>

        {/* Our Mission Section */}
        <section class="mb-10 p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Our Mission
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            At **{appName}**, our mission is to seamlessly connect individuals
            and businesses with skilled local artisans. We believe in empowering
            local talent and making quality service accessible to everyone.
            Whether you need a plumber, a carpenter, an electrician, or a
            painter, we're dedicated to helping you find the right professional
            for your needs, quickly and reliably.
          </p>
          <p class="text-gray-700 leading-relaxed">
            We strive to build a community founded on trust, transparency, and
            excellent service. Our platform simplifies the process of hiring and
            getting hired, ensuring a smooth experience for both customers and
            artisans.
          </p>
        </section>

        {/* How It Works Section */}
        <section class="mb-10 p-6 bg-green-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            How It Works
          </h2>

          <div class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                class="w-6 h-6 mr-2 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              For Customers (Service Seekers)
            </h3>
            <ol class="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>
                <strong>Post a Request:</strong> Describe the service you need,
                its location, urgency, and any specific requirements. It's free
                and takes just a few minutes.
              </li>
              <li>
                <strong>Receive Proposals:</strong> Interested artisans will
                send you proposals with their offers, estimated costs, and
                timelines.
              </li>
              <li>
                <strong>Compare & Choose:</strong> Review artisan profiles,
                ratings, and past reviews. Chat directly with them to clarify
                details.
              </li>
              <li>
                <strong>Hire & Collaborate:</strong> Accept the best proposal.
                Track progress and communicate securely through our platform.
              </li>
              <li>
                <strong>Review & Rate:</strong> Once the job is done, leave a
                review and rating to help other users make informed decisions.
              </li>
            </ol>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <svg
                class="w-6 h-6 mr-2 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              For Artisans (Service Providers)
            </h3>
            <ol class="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>
                <strong>Create Your Profile:</strong> Showcase your skills,
                experience, portfolio, and services. Set your pricing and
                availability.
              </li>
              <li>
                <strong>Browse Requests:</strong> Discover new service requests
                in your area that match your expertise.
              </li>
              <li>
                <strong>Submit Proposals:</strong> Send tailored proposals to
                customers, outlining your approach and cost.
              </li>
              <li>
                <strong>Get Hired:</strong> Communicate with potential clients,
                answer their questions, and get selected for jobs.
              </li>
              <li>
                <strong>Manage Your Work:</strong> Use our tools to communicate,
                manage milestones, and receive payments securely.
              </li>
              <li>
                <strong>Build Your Reputation:</strong> Deliver excellent
                service, earn great reviews, and grow your clientele.
              </li>
            </ol>
          </div>
        </section>

        {/* FAQs Section */}
        <section class="mb-10 p-6 bg-purple-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9.295a8.948 8.948 0 00-1.236 1.458A7.986 7.986 0 004 12c0 1.458.53 2.825 1.458 3.867.433.483.91.905 1.428 1.253M16 12a4 4 0 11-8 0 4 4 0 018 0zM12 21.22l-.707-.707a2 2 0 00-2.828 0L6 21.22c-2.343-2.343-2.343-6.143 0-8.485L12 6.757l6.536 6.536c2.343 2.343 2.343 6.143 0 8.485z"
              ></path>
            </svg>
            Frequently Asked Questions (FAQs)
          </h2>

          <div class="divide-y divide-gray-200">
            <details class={about_styles.faqItem}>
              <summary class={about_styles.faqSummary}>
                Is {appName} free to use?
                <span
                  class={`${about_styles.icon} transform transition-transform duration-200`}
                >
                  &#9654;
                </span>
              </summary>
              <div class={about_styles.faqContent}>
                <p>
                  Posting a service request as a customer is completely free.
                  Artisans pay a small service fee on completed jobs or a
                  subscription fee for premium features, which helps us maintain
                  and improve the platform.
                </p>
              </div>
            </details>

            <details class={about_styles.faqItem}>
              <summary class={about_styles.faqSummary}>
                How do payments work?
                <span
                  class={`${about_styles.icon} transform transition-transform duration-200`}
                >
                  &#9654;
                </span>
              </summary>
              <div class={about_styles.faqContent}>
                <p>
                  Payments are securely processed through our platform.
                  Customers deposit funds into an escrow account when they
                  accept a proposal, and the artisan receives payment once the
                  job is marked as complete and the customer is satisfied.
                </p>
              </div>
            </details>

            <details class={about_styles.faqItem}>
              <summary class={about_styles.faqSummary}>
                What if I'm not satisfied with the service?
                <span
                  class={`${about_styles.icon} transform transition-transform duration-200`}
                >
                  &#9654;
                </span>
              </summary>
              <div class={about_styles.faqContent}>
                <p>
                  We encourage open communication between customers and
                  artisans. If issues arise, try to resolve them directly. If a
                  resolution isn't found, our dispute resolution team can
                  mediate. Please refer to our{" "}
                  <a href="#" class="text-blue-600 hover:underline">
                    Dispute Resolution Policy
                  </a>{" "}
                  for more details.
                </p>
              </div>
            </details>

            <details class={about_styles.faqItem}>
              <summary class={about_styles.faqSummary}>
                How can I get more jobs as an artisan?
                <span
                  class={`${about_styles.icon} transform transition-transform duration-200`}
                >
                  &#9654;
                </span>
              </summary>
              <div class={about_styles.faqContent}>
                <p>
                  To increase your chances, ensure your profile is complete with
                  detailed services, a strong portfolio, and competitive
                  pricing. Prompt communication and excellent reviews for
                  completed jobs significantly boost your visibility and
                  trustworthiness.
                </p>
              </div>
            </details>

            <details class={about_styles.faqItem}>
              <summary class={about_styles.faqSummary}>
                Can I cancel a request/service?
                <span
                  class={`${about_styles.icon} transform transition-transform duration-200`}
                >
                  &#9654;
                </span>
              </summary>
              <div class={about_styles.faqContent}>
                <p>
                  Customers can cancel a request before accepting a proposal.
                  Once a proposal is accepted, cancellation terms depend on the
                  agreement and our{" "}
                  <a href="#" class="text-blue-600 hover:underline">
                    Cancellation Policy
                  </a>
                  . Artisans can also decline or cancel jobs under certain
                  circumstances.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Safety & Trust Section */}
        <section class="mb-10 p-6 bg-yellow-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c.041 3.228 1.488 6.303 3.844 8.659L12 22.95l5.212-3.328a12.001 12.001 0 003.844-8.659A11.955 11.955 0 0121.056 7.984z"
              ></path>
            </svg>
            Safety & Trust
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Your safety and satisfaction are our top priorities. All artisans on
            our platform undergo a verification process. We also provide secure
            messaging, transparent review systems, and a dedicated support team
            to assist with any issues.
          </p>
          <p class="text-700 leading-relaxed">
            In case of disputes, our team offers mediation services to help
            reach a fair resolution. We encourage all users to communicate
            clearly and adhere to our community guidelines.
          </p>
        </section>

        {/* Contact Us Section */}
        <section class="mb-10 p-6 bg-red-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Contact Us
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Have more questions or need assistance? Our support team is here to
            help!
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.88l1.488 1.488c.192.192.348.375.495.539l.298.324A3 3 0 0117 18a3 3 0 01-3 3c-1.48 0-2.906-.474-4.148-1.332L8 14.869v1.17c0 .531-.21 1.042-.586 1.414l-.354.354a2 2 0 01-2.828 0L2.914 17.07A2 2 0 012 15.656V9.464c0-.53.21-1.042.586-1.414l.354-.354a2 2 0 012.828 0l.354.354a.5.5 0 00.707 0l.707-.707a.5.5 0 000-.707L5.656 5.656a2 2 0 010-2.828L7.07 1.414A2 2 0 019.898 1L12.7 1.543A6 6 0 0114.243 5.757z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Email:{" "}
              <a
                href="mailto:support@your-app-name.com"
                class="text-blue-600 hover:underline ml-1"
              >
                support@your-app-name.com
              </a>
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Phone:{" "}
              <a
                href="tel:+491234567890"
                class="text-blue-600 hover:underline ml-1"
              >
                +49 123 4567 890
              </a>{" "}
              (Mon-Fri, 9:00 AM - 5:00 PM CET)
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-5a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a href="#" class="text-blue-600 hover:underline">
                Open Support Ticket
              </a>
            </li>
          </ul>
        </section>

        {/* Legal Information Section */}
        <section class="mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              class="w-8 h-8 mr-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            Legal Information
          </h2>
          <ul class="space-y-2 text-gray-700">
            <li>
              <a href="#" class="text-blue-600 hover:underline font-medium">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" class="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="text-blue-600 hover:underline font-medium">
                Imprint / Impressum
              </a>
            </li>
          </ul>
        </section>

        <p class="text-center text-gray-500 text-sm mt-8">
          &copy; 2025 {appName}. All rights reserved.
        </p>
      </div>
    </div>
  );
};
