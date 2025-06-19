import { Accessor, Component, createSignal, For, onMount } from "solid-js";
import home_styles from "./style.module.css";
import baker from "../../../assets/profiles/baker.jpg";
import bodyguard from "../../../assets/profiles/bodyguard.jpg";
import bricklayer from "../../../assets/profiles/bricklayer.jpg";
import carpentar from "../../../assets/profiles/carpentar.jpg";
import chef from "../../../assets/profiles/chef.jpg";
import driver from "../../../assets/profiles/driver.jpg";
import event from "../../../assets/profiles/event.jpg";
import expert from "../../../assets/profiles/expert.jpg";
import itandtech from "../../../assets/profiles/itandtech.jpg";
import more from "../../../assets/profiles/more.jpg";
import plumber from "../../../assets/profiles/plumber.jpg";
import security from "../../../assets/profiles/security.jpg";
import tutor from "../../../assets/profiles/tutor.jpg";
import wedding from "../../../assets/profiles/wedding.jpg";
import { BucketAPIHandler } from "../../../api/supabase";

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
      image: plumber,
      title: "Plumbing Services",
      description: "Emergency repairs, installations, and maintenance.",
    },
    {
      image: carpentar,
      title: "Carpentry",
      description: "Custom furniture, home repairs, and construction.",
    },
    {
      image: itandtech,
      title: "IT & Tech Support",
      description: "Web design, software, and network help.",
    },
    {
      image: tutor,
      title: "Tutoring & Education",
      description: "Academic help, test prep, and skill development.",
    },
    {
      image: event,
      title: "Event Planning & Coordination",
      description: "Expert help for parties, corporate events, and gatherings.",
    },
    {
      image: baker,
      title: "Baking & Confectionery",
      description: "Custom cakes, pastries, and baked goods for all occasions.",
    },
    {
      image: bodyguard,
      title: "Personal Security Services",
      description: "Professional bodyguards and close protection specialists.",
    },
    {
      image: chef,
      title: "Private Chefs & Bakers",
      description: "Hire culinary experts for events and personal meals.",
    },
    {
      image: driver,
      title: "Driving & Chauffeur",
      description: "Personal drivers, airport transfers, and delivery.",
    },
    {
      image: wedding,
      title: "Wedding & Event Planning",
      description: "Full-service planning for your special occasions.",
    },
    {
      image: security,
      title: "Security Services",
      description: "Event security, bodyguards, and surveillance.",
    },
    {
      image: bricklayer,
      title: "Construction & Masonry",
      description: "Find skilled bricklayers and construction workers.",
    },
    {
      image: expert,
      title: "Consulting & Experts",
      description: "Business, finance, and other professional advice.",
    },
    {
      image: more,
      title: "Explore More",
      description: "Discover a wide range of other skilled professionals.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ() === id ? null : id);
  };

  onMount(async () => {
    const handler = new BucketAPIHandler();
    const client = handler.getClient();
    const { data, error } = await client.storage.listBuckets();
    console.log(client, ".............", data, error);
  });
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
              {(item, index) => <HeroCard item={item} index={index} />}
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
          Popular Services Near You
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src={itandtech}
              alt="IT & Tech Support Service"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Expert IT & Tech Support
            </h3>
            <p class="text-gray-600 mb-4">
              Need help with web design, software, or network issues? Find
              skilled tech professionals.
            </p>
            <a
              href="/login"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
            >
              Find Tech Experts
            </a>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src={plumber}
              alt="Home Services - Plumbing"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Reliable Home Services
            </h3>
            <p class="text-gray-600 mb-4">
              From emergency plumbing to skilled carpentry, get your home needs
              sorted efficiently.
            </p>
            <a
              href="/login"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
            >
              Book Home Services
            </a>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img
              src={chef}
              alt="Chefs & Catering Service"
              class="rounded-md mb-4 w-full h-auto object-cover"
            />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">
              Private Chefs & Catering
            </h3>
            <p class="text-gray-600 mb-4">
              Elevate your events with gourmet meals and professional catering
              services.
            </p>
            <a
              href="/login"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
            >
              Hire a Chef
            </a>
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
        <a
          class="bg-white text-blue-800 px-8 py-4 rounded-full hover:bg-gray-100 transition duration-300 font-bold text-lg shadow-md"
          href="/login"
        >
          List Your Service Today!
        </a>
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
  index: Accessor<number>;
}> = (props) => {
  return (
    <div
      class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 flex-shrink-0 w-120 h-80"
      id={props.index().toString()}
    >
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
