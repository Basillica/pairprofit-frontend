import { Component, createSignal, For } from "solid-js";
import home_styles from "./style.module.css";

interface HeroItem {
  image: string;
  title: string;
  description: string;
}

export const HomePage: Component = () => {
  const [openFAQ, setOpenFAQ] = createSignal<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I find a service provider?",
      answer:
        "You can browse our categories or use the search bar on the homepage to find specific services. Filter results by location, ratings, and more.",
    },
    {
      id: 2,
      question: "Is it free to use PairProfit as a customer?",
      answer:
        "Yes, it's completely free to browse services, connect with professionals, and receive quotes. We only charge a small service fee on completed transactions.",
    },
    {
      id: 3,
      question: "How do I become a service provider?",
      answer:
        "Click on the 'List Your Service Today!' button and follow the simple steps to create your professional profile. We'll guide you through the verification process.",
    },
    {
      id: 4,
      question: "What if I'm not satisfied with a service?",
      answer:
        "We have a dispute resolution process in place to ensure fair outcomes. Please contact our support team if you encounter any issues.",
    },
  ];

  const heroItems: HeroItem[] = [
    {
      image: "https://picsum.photos/880/400?random=1",
      title: "Home Services",
      description: "Carpentry, Plumbing, Cleaning & more.",
    },
    {
      image: "https://picsum.photos/880/400?random=2",
      title: "IT & Tech Support",
      description: "Web Design, Software, Network help.",
    },
    {
      image: "https://picsum.photos/880/400?random=3",
      title: "Creative & Design",
      description: "Graphic Design, Writing, Photography.",
    },
    {
      image: "https://picsum.photos/880/400?random=4",
      title: "Tutoring & Education",
      description: "Academic help, Skill developmen",
    },
    {
      image: "https://picsum.photos/880/400?random=5",
      title: "Home Services",
      description: "Carpentry, Plumbing, Cleaning & more.",
    },
    {
      image: "https://picsum.photos/880/400?random=6",
      title: "IT & Tech Support",
      description: "Web Design, Software, Network help.",
    },
    {
      image: "https://picsum.photos/880/400?random=7",
      title: "Creative & Design",
      description: "Graphic Design, Writing, Photography.",
    },
    {
      image: "https://picsum.photos/880/400?random=8",
      title: "Tutoring & Education",
      description: "Academic help, Skill developmen",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ() === id ? null : id);
  };

  return (
    <main class="flex-grow container-fluid mx-auto">
      <section class="text-center py-16 bg-blue-300 text-white rounded-lg shadow-lg mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          Your Skills. Our Platform. Limitless Possibilities.
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          Connecting you with skilled professionals for every task, big or
          small.
        </p>
        <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 p-3">
          <input
            type="text"
            placeholder="What services do you need?"
            class="p-3 rounded-md w-full md:w-1/2 lg:w-1/3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
          <button class="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300 font-semibold">
            Search Services
          </button>
        </div>
      </section>

      <section class="py-12 overflow-hidden relative">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Popular Categories
        </h2>
        <div class={home_styles.slider_container}>
          <div class={home_styles.slider_track}>
            <For each={heroItems} fallback={<div>Loading...</div>}>
              {(item, index) => <HeroCard item={item} />}
            </For>
          </div>
        </div>
      </section>

      <section class="py-12 bg-gray-100 rounded-lg shadow-md mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          How PairProfit Works
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Find Your Service
            </h3>
            <p class="text-gray-600">
              Browse categories or use our powerful search to find exactly what
              you need.
            </p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Connect & Discuss
            </h3>
            <p class="text-gray-600">
              Chat directly with service providers to discuss project details
              and get quotes.
            </p>
          </div>
          <div class="p-6">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Get it Done Securely
            </h3>
            <p class="text-gray-600">
              Hire with confidence, make secure payments, and leave reviews.
            </p>
          </div>
        </div>
      </section>

      <section class="py-12 mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Services
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/400/250?random=5"
              alt="Web Development Service"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Custom Web Development
            </h3>
            <p class="text-gray-600 mb-4">
              From personal portfolios to complex e-commerce sites, get a
              website tailored to your needs.
            </p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm">
              Learn More
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/400/250?random=6"
              alt="Professional Photography Service"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Professional Photography
            </h3>
            <p class="text-gray-600 mb-4">
              Capture your special moments or products with stunning,
              high-quality photographs.
            </p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm">
              Learn More
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src="https://picsum.photos/400/250?random=7"
              alt="Home Cleaning Service"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Deep Home Cleaning
            </h3>
            <p class="text-gray-600 mb-4">
              Expert cleaners to make your home sparkling clean and organized.
            </p>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section class="py-12 bg-blue-50 text-gray-800 rounded-lg shadow-md mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Why Choose PairProfit?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Wide Range of Skills</h3>
              <p class="text-gray-600 text-sm">
                From home services to tech support, find experts for every need.
              </p>
            </div>
          </div>
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Verified Professionals</h3>
              <p class="text-gray-600 text-sm">
                We ensure all service providers are vetted for quality and
                reliability.
              </p>
            </div>
          </div>
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Secure & Transparent</h3>
              <p class="text-gray-600 text-sm">
                Enjoy secure payments and clear communication throughout your
                project.
              </p>
            </div>
          </div>
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Easy Booking</h3>
              <p class="text-gray-600 text-sm">
                Find and book services with just a few clicks, hassle-free.
              </p>
            </div>
          </div>
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Dedicated Support</h3>
              <p class="text-gray-600 text-sm">
                Our team is here to assist you every step of the way.
              </p>
            </div>
          </div>
          <div class="flex items-start p-4 bg-white rounded-lg shadow-sm">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl mr-4">
              &#10003;
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">Competitive Rates</h3>
              <p class="text-gray-600 text-sm">
                Get great value for high-quality services from skilled
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 bg-blue-300 text-white mb-12">
        <h2 class="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div class="bg-white p-6 rounded-lg shadow-md text-gray-800">
            <p class="italic text-lg mb-4">
              "PairProfit made it incredibly easy to find a reliable plumber for
              my emergency. Fast, efficient, and professional!"
            </p>
            <div class="flex items-center">
              <img
                src="https://picsum.photos/60/60?random=8"
                alt="User Avatar"
                class="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <p class="font-semibold">Jane Doe</p>
                <p class="text-sm text-gray-600">Homeowner</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-gray-800">
            <p class="italic text-lg mb-4">
              "As a freelance web developer, PairProfit has been a game-changer.
              I've connected with so many new clients and projects!"
            </p>
            <div class="flex items-center">
              <img
                src="https://picsum.photos/60/60?random=9"
                alt="User Avatar"
                class="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <p class="font-semibold">John Smith</p>
                <p class="text-sm text-gray-600">Freelance Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="text-center py-16 bg-blue-700 text-white rounded-lg shadow-lg mb-12">
        <h2 class="text-4xl md:text-5xl font-extrabold mb-4">
          Are You a Skilled Professional?
        </h2>
        <p class="text-xl md:text-2xl mb-8 opacity-90 px-4 max-w-3xl mx-auto">
          Join our growing community and connect with clients looking for your
          expertise. Take control of your work, set your own rates, and expand
          your reach.
        </p>
        <button class="bg-white text-blue-800 px-8 py-4 rounded-full hover:bg-gray-100 transition duration-300 font-bold text-lg shadow-md">
          List Your Service Today!
        </button>
      </section>

      {/* FAQ Section */}
      <section class="py-12 bg-gray-50 rounded-lg shadow-md mb-12 px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div class="max-w-3xl mx-auto">
          <For each={faqs}>
            {(faq) => (
              <div
                class="mb-4 p-4 bg-white rounded-lg shadow-sm cursor-pointer overflow-hidden"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 class="text-lg font-semibold text-gray-800 flex justify-between items-center">
                  {faq.question}
                  <span
                    class={`transform transition-transform duration-300 ${
                      openFAQ() === faq.id ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    &#9660; {/* Down arrow character */}
                  </span>
                </h3>
                <div
                  class={`grid transition-all duration-300 ease-in-out ${
                    openFAQ() === faq.id
                      ? "grid-rows-[1fr] opacity-100 mt-2"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p class="overflow-hidden text-gray-600 pt-1 pb-0">
                    {" "}
                    {/* Adjusted padding */}
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>
    </main>
  );
};

const HeroCard: Component<{
  item: HeroItem;
}> = (props) => {
  return (
    <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 flex-shrink-0 w-120 h-80">
      <img
        src={props.item.image}
        alt="Home Services Icon"
        class="mx-auto mb-4 w-120 h-50 object-contain"
      />
      <h3 class="text-xl font-semibold text-gray-700 mb-2">
        {props.item.title}
      </h3>
      <p class="text-gray-600">{props.item.description}</p>
    </div>
  );
};
