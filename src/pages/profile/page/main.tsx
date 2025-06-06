import { createSignal, For, Show, Component } from "solid-js";

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

// Component for rendering star ratings
const StarRating: Component<{
  rating: number;
}> = (props) => {
  const fullStars = Math.floor(props.rating);
  const halfStar = props.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div class="stars flex items-center">
      <For each={Array(fullStars)}>
        {() => <span class="star text-gold-500 text-xl mr-0.5">&#9733;</span>}
      </For>
      <Show when={halfStar}>
        {/* For true half-star, consider using an SVG or a specific half-star icon font.
                    For simplicity, this uses a full star for a half-star representation. */}
        <span class="star text-gold-500 text-xl mr-0.5">&#9733;</span>
      </Show>
      <For each={Array(emptyStars)}>
        {() => (
          <span class="star empty text-gray-300 text-xl mr-0.5">&#9734;</span>
        )}
      </For>
    </div>
  );
};

export const ProviderProfileComponent = () => {
  // Dummy Data for a Service Provider
  // @type {ProviderData}
  const [providerData] = createSignal({
    id: "provider123",
    name: "John Doe",
    profilePicture:
      "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialization: "Expert Woodworker & Custom Furniture Maker",
    bio: "With over 15 years of dedicated craftsmanship, I transform raw wood into bespoke pieces that combine functionality with artistic flair. From intricate cabinet installations to robust outdoor decking, I handle projects of all sizes with precision and a commitment to client satisfaction. Based in Nuremberg, I serve clients across Bavaria, bringing durability and beauty to every space.",
    overallRating: 4.8,
    totalReviews: 120,
    location: "Nuremberg, Germany",
    yearsInBusiness: "15+",
    businessName: "Doe's Custom Woodwork",
    businessRegistration: "DE123456789",
    contactPreferences: ["Platform Chat (Recommended)", "Email", "Phone"],
    ratingBreakdown: {
      "5": 85,
      "4": 25,
      "3": 7,
      "2": 2,
      "1": 1,
    },
    testimonials: [
      {
        id: 1,
        reviewer: "Maria S.",
        rating: 5,
        date: "2024-05-10",
        comment:
          "Absolutely phenomenal work! John built custom shelves for my living room and they are perfect. Highly recommend!",
        serviceTitle: "Custom Shelf Installation",
      },
      {
        id: 2,
        reviewer: "Thomas K.",
        rating: 4,
        date: "2024-04-22",
        comment:
          "Good work on repairing my old wooden table. Took a bit longer than expected, but the result is solid.",
        serviceTitle: "Antique Table Repair",
      },
      {
        id: 3,
        reviewer: "Laura B.",
        rating: 5,
        date: "2024-03-15",
        comment:
          "John designed and installed a new kitchen island for us. Professional, friendly, and the quality is superb.",
        serviceTitle: "Kitchen Island Design & Build",
      },
    ],
    servicesOffered: [
      {
        id: "srv001",
        title: "Custom Cabinetry & Shelving",
        category: "Carpentry",
        price: "Project-based",
        link: "service_detail.html?id=srv001",
      },
      {
        id: "srv002",
        title: "Furniture Repair & Restoration",
        category: "Carpentry",
        price: "Hourly Rate",
        link: "service_detail.html?id=srv002",
      },
      {
        id: "srv003",
        title: "Deck & Patio Construction",
        category: "Carpentry",
        price: "Project-based",
        link: "service_detail.html?id=srv003",
      },
      {
        id: "srv004",
        title: "Door & Window Frame Installation",
        category: "Carpentry",
        price: "Hourly Rate",
        link: "service_detail.html?id=srv004",
      },
    ],
    publicUpdates: [
      {
        id: "upd001",
        date: "2025-06-01",
        type: "Project Spotlight",
        title: "Completed Grand Oak Dining Table",
        content:
          "Just finished a magnificent solid oak dining table for a client in Schwabach. The 3-meter piece features intricate hand-carved legs and a natural oil finish. It was a challenging but rewarding project!",
        image:
          "https://images.unsplash.com/photo-1549923746-c50f83956bb2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "upd002",
        date: "2025-05-20",
        type: "FAQ Update",
        title: "New Eco-Friendly Wood Options",
        content:
          "We've expanded our material selection to include more sustainably sourced and recycled wood options. Inquire about our new line of reclaimed barnwood for your next project!",
        image: null,
      },
      {
        id: "upd003",
        date: "2025-05-05",
        type: "Important Note",
        title: "Booking for Q3 Now Open!",
        content:
          "Due to high demand, I encourage clients to book their carpentry projects for Q3 (July-September) as soon as possible. Limited slots available.",
        image: null,
      },
    ],
  });

  // We keep the inline styles for stars and rating bars as they are specific to this component's look.
  // In a real SolidJS + Tailwind project, you might consider extending Tailwind config
  // or using a utility-first approach more thoroughly.
  const customStyles = `
        .stars {
            display: flex;
            align-items: center;
        }
        .star {
            color: #FFD700; /* Gold color for stars */
            font-size: 1.25rem; /* Equivalent to text-xl in Tailwind */
            margin-right: 0.125rem; /* Small spacing between stars */
        }
        .star.empty {
            color: #D1D5DB; /* Gray for empty stars */
        }
        .rating-bar-container {
            width: 100%;
            background-color: #E5E7EB; /* gray-200 */
            border-radius: 9999px; /* full rounded */
            height: 0.75rem; /* h-3 */
            overflow: hidden;
        }
        .rating-bar-fill {
            background-color: #2563EB; /* blue-600 */
            height: 100%;
            border-radius: 9999px; /* full rounded */
        }
    `;

  // Calculate total reviews for percentage calculation in rating breakdown
  const totalReviews = () => providerData().totalReviews;

  return (
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Inline style tag for custom CSS */}
      <style>{customStyles}</style>

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

        <header class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 pb-8 border-b border-gray-200">
          <img
            src={providerData().profilePicture}
            alt="Provider Profile"
            class="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
          />
          <div class="text-center sm:text-left flex-grow">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
              {providerData().name}
            </h1>
            <p class="text-xl text-blue-600 mb-2">
              {providerData().specialization}
            </p>
            <div class="flex items-center justify-center sm:justify-start mb-4">
              <StarRating rating={providerData().overallRating} />
              <span class="text-gray-700 text-lg font-semibold">
                {providerData().overallRating.toFixed(1)}
              </span>
              <span class="text-gray-500 text-lg ml-2">
                ({providerData().totalReviews} Reviews)
              </span>
            </div>
            <button class="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-medium shadow-md">
              Chat with Provider
            </button>
          </div>
        </header>

        <section class="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p class="text-gray-700 leading-relaxed">{providerData().bio}</p>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong class="font-semibold">Location:</strong>{" "}
              {providerData().location}
            </p>
            <p>
              <strong class="font-semibold">Years in Business:</strong>{" "}
              {providerData().yearsInBusiness}
            </p>
            <p>
              <strong class="font-semibold">Business Name:</strong>{" "}
              {providerData().businessName}
            </p>
            <p>
              <strong class="font-semibold">Business Registration:</strong>{" "}
              {providerData().businessRegistration}
            </p>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-800">
              Contact Preferences:
            </h3>
            <p class="text-gray-700">
              {providerData().contactPreferences.join(", ")}
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
                      providerData().ratingBreakdown[
                        star as "5" | "4" | "3" | "2" | "1"
                      ] || 0;
                    const percentage =
                      totalReviews() > 0 ? (count / totalReviews()) * 100 : 0;
                    return (
                      <div class="flex items-center space-x-2">
                        <span
                          class="text-sm font-medium text-gray-700 w-6 text-right"
                          style={"width: 50px"}
                        >
                          {`${star} star`}
                        </span>
                        <div class="rating-bar-container flex-grow">
                          <div
                            class="rating-bar-fill"
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
                    providerData().testimonials &&
                    providerData().testimonials.length > 0
                  }
                  fallback={<p class="text-gray-500">No testimonials yet.</p>}
                >
                  <For each={providerData().testimonials}>
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
                providerData().servicesOffered &&
                providerData().servicesOffered.length > 0
              }
              fallback={
                <p class="text-gray-500 mt-4">
                  This provider has no public service listings yet.
                </p>
              }
            >
              <For each={providerData().servicesOffered}>
                {(service) => (
                  <a
                    href={service.link}
                    class="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                  >
                    <h4 class="text-lg font-semibold text-blue-700 mb-1">
                      {service.title}
                    </h4>
                    <p class="text-gray-600 text-sm mb-2">{service.category}</p>
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
                providerData().publicUpdates &&
                providerData().publicUpdates.length > 0
              }
              fallback={
                <p class="text-gray-500 mt-4">
                  No recent updates or project spotlights from this provider.
                </p>
              }
            >
              <For each={providerData().publicUpdates}>
                {(update) => (
                  <div class="bg-gray-100 p-4 rounded-md border border-gray-200">
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="text-lg font-semibold text-gray-800">
                        {update.title}
                      </h4>
                      <span class="text-sm text-gray-500">{update.date}</span>
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
      </div>
    </div>
  );
};

export default ProviderProfileComponent;
