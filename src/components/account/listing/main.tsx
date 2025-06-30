import { createMemo, createSignal, For, JSX, onMount } from "solid-js";
import css_class from "./style.module.css";
import { FilterBar, Pagination } from "../../utils";
import { ServiceProviderModel } from "../../../models/profile";
import { ProviderProfileDetail } from "../../utils/modals";
import { authService } from "../../../oauth/manager";
import { useNavigate } from "@solidjs/router";
import { SecureLocalStorage } from "../../../lib/localstore";
import { PublicHandler } from "../../../api";

interface FilterOption {
  category: string;
  subCategory: string;
  location: string;
  price: number;
}

interface ApiCategoriesResponse {
  [key: string]: string[];
}

const generateProviders = (count: number): ServiceProviderModel[] => {
  const providers: ServiceProviderModel[] = [];

  const firstNames = [
    "John",
    "Maria",
    "Paul",
    "Anna",
    "David",
    "Sophia",
    "Michael",
    "Emma",
  ];
  const lastNames = [
    "Doe",
    "Schmidt",
    "Müller",
    "Fischer",
    "Weber",
    "Meyer",
    "Wagner",
    "Becker",
  ];

  // Updated to include categories/subcategories for generation
  const serviceDetails = [
    {
      specialization: "Expert Woodworker & Custom Furniture Maker",
      category: "Home Improvement",
      subCategory: "Carpentry",
    },
    {
      specialization: "Certified Electrician & Smart Home Integrator",
      category: "Home Improvement",
      subCategory: "Electrical",
    },
    {
      specialization: "Professional Gardener & Landscape Designer",
      category: "Home & Garden",
      subCategory: "Landscaping",
    },
    {
      specialization: "Full-Stack Web Developer & Consultant",
      category: "Professional Services",
      subCategory: "IT & Software",
    },
    {
      specialization: "Experienced Plumber & Heating Technician",
      category: "Home Improvement",
      subCategory: "Plumbing",
    },
    {
      specialization: "Interior Designer & Home Stager",
      category: "Home & Garden",
      subCategory: "Interior Design",
    },
    {
      specialization: "Automotive Mechanic & Diagnostic Specialist",
      category: "Automotive & Mechanics",
      subCategory: "Vehicle Repair",
    },
    {
      specialization: "Roofing Expert & Building Contractor",
      category: "Home Improvement",
      subCategory: "Construction",
    },
    {
      specialization: "Certified Personal Trainer & Fitness Coach",
      category: "Health & Wellness",
      subCategory: "Fitness Training",
    },
    {
      specialization: "Professional Photographer (Events & Portraits)",
      category: "Arts & Entertainment",
      subCategory: "Photography",
    },
    {
      specialization: "House Cleaning & Maid Services",
      category: "Cleaning & Maintenance",
      subCategory: "Residential Cleaning",
    },
    {
      specialization: "Tutor for Math & Science (High School)",
      category: "Education & Learning",
      subCategory: "Academic Tutoring",
    },
  ];

  const cities = [
    { name: "Nuremberg", coords: [49.452, 11.077], postalCode: "90402" },
    { name: "Berlin", coords: [52.52, 13.405], postalCode: "10115" },
    { name: "Munich", coords: [48.137, 11.575], postalCode: "80331" },
    { name: "Hamburg", coords: [53.55, 9.992], postalCode: "20095" },
    { name: "Frankfurt", coords: [50.11, 8.682], postalCode: "60313" },
    { name: "Cologne", coords: [50.938, 6.957], postalCode: "50667" },
    { name: "Stuttgart", coords: [48.775, 9.183], postalCode: "70173" },
    { name: "Düsseldorf", coords: [51.22, 6.77], postalCode: "40212" },
    { name: "Leipzig", coords: [51.34, 12.37], postalCode: "04109" },
    { name: "Dresden", coords: [51.05, 13.73], postalCode: "01067" },
    { name: "Erfurt", coords: [50.979, 11.033], postalCode: "99084" },
  ];
  //   const profilePictures = [
  //     "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1557862596-f947b198305f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1507003211169-e69adba4c2d9?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomServiceDetail =
      serviceDetails[Math.floor(Math.random() * serviceDetails.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const overallRating = parseFloat(
      (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
    ); // 3.5 to 5.0
    const totalReviews = Math.floor(Math.random() * 200) + 50; // 50 to 250 reviews
    const yearsInBusiness = `${Math.floor(Math.random() * 20) + 3}+`; // 3 to 22+ years
    const businessName = `${firstName}'s ${randomServiceDetail.subCategory} Solutions`;

    // Calculate rating breakdown
    const fiveStar = Math.floor(totalReviews * (overallRating / 5 - 0.1));
    const fourStar = Math.floor(totalReviews * (Math.random() * 0.2 + 0.1)); // 10-30% of reviews
    const remaining = totalReviews - fiveStar - fourStar;
    const threeStar = Math.floor(remaining * 0.6);
    const twoStar = Math.floor(remaining * 0.3);
    const oneStar = remaining - threeStar - twoStar;

    const provider: ServiceProviderModel = {
      id: `provider${1000 + i}`,
      name: `${firstName} ${lastName}`,
      profilePicture: `https://picsum.photos/200?random=${Math.random()}`,
      // profilePictures[Math.floor(Math.random() * profilePictures.length)],
      specialization: randomServiceDetail.specialization,
      bio: `With over ${yearsInBusiness} years of dedicated craftsmanship in ${randomServiceDetail.subCategory}, I transform raw ideas into bespoke solutions. Based in ${city.name}, I serve clients across Germany, bringing durability and quality to every project.`,
      overallRating: overallRating,
      totalReviews: totalReviews,
      location: `${city.name}, Germany`,
      yearsInBusiness: yearsInBusiness,
      businessName: businessName,
      businessRegistration: `DE${
        Math.floor(Math.random() * 900000000) + 100000000
      }`, // Random 9-digit number
      contactPreferences: ["Platform Chat (Recommended)", "Email", "Phone"],
      ratingBreakdown: {
        "5": fiveStar,
        "4": fourStar,
        "3": threeStar,
        "2": twoStar,
        "1": oneStar < 0 ? 0 : oneStar, // Ensure no negative 1-star reviews
      },
      testimonials: [
        {
          id: 1,
          reviewer: `${
            firstNames[Math.floor(Math.random() * firstNames.length)]
          } S.`,
          rating: 5,
          date: new Date(
            new Date().setMonth(
              new Date().getMonth() - Math.floor(Math.random() * 6)
            )
          )
            .toISOString()
            .slice(0, 10),
          comment: `Absolutely phenomenal work! ${firstName} was great. Highly recommend!`,
          serviceTitle: `${randomServiceDetail.subCategory} Project`,
        },
        {
          id: 2,
          reviewer: `${
            firstNames[Math.floor(Math.random() * firstNames.length)]
          } K.`,
          rating: 4,
          date: new Date(
            new Date().setMonth(
              new Date().getMonth() - Math.floor(Math.random() * 12)
            )
          )
            .toISOString()
            .slice(0, 10),
          comment: `Good work. Took a bit longer than expected, but the result is solid.`,
          serviceTitle: `Complex ${randomServiceDetail.subCategory} Task`,
        },
      ],
      servicesOffered: [
        {
          id: `srv${i}01`,
          title: `${randomServiceDetail.subCategory} Consultation`,
          category: randomServiceDetail.category,
          price: "Hourly Rate",
          link: `service_detail.html?id=srv${i}01`,
        },
        {
          id: `srv${i}02`,
          title: `Custom ${randomServiceDetail.subCategory} Solutions`,
          category: randomServiceDetail.category,
          price: "Project-based",
          link: `service_detail.html?id=srv${i}02`,
        },
      ],
      publicUpdates: [
        {
          id: `upd${i}01`,
          date: new Date(
            new Date().setDate(
              new Date().getDate() - Math.floor(Math.random() * 30)
            )
          )
            .toISOString()
            .slice(0, 10),
          type: "Project Spotlight",
          title: `Completed ${randomServiceDetail.subCategory} Project in ${city.name}`,
          content: `Just finished a rewarding project for a client in ${city.name}. It involved intricate work on a new installation.`,
          image:
            Math.random() > 0.5
              ? `https://picsum.photos/200?random=${Math.random()}`
              : null,
        },
      ],
      // Assigning the new fields
      category: randomServiceDetail.category,
      subCategory: randomServiceDetail.subCategory,
    };
    providers.push(provider);
  }

  return providers;
};

export const ServiceProviderListings = (): JSX.Element => {
  const [category] = createSignal("");
  const [location] = createSignal("");
  const [_, setIsFilterBarExpanded] = createSignal(false);
  const [profiles, setProfiles] = createSignal<ServiceProviderModel[]>(
    generateProviders(15)
  );
  const navigate = useNavigate();
  const [openFilterBar] = createSignal(window.innerWidth > 768 ? true : false);
  const [viewProfile, setViewProfile] = createSignal(false);
  const [currentListing, setCurrentListing] =
    createSignal<ServiceProviderModel>();
  const ITEMS_PER_PAGE = 10;
  const TOTAL_ITEMS = 53;

  const [, setCurrentPageData] = createSignal(1); // State to hold the current page in the parent
  const handlePageChange = (newPage: number) => {
    console.log(`Parent received page change to: ${newPage}`);
    setCurrentPageData(newPage);
  };
  const [categories, setCategories] = createSignal<string[]>([]);
  const [filterOption, setFilterOption] = createSignal<FilterOption>({
    category: "",
    subCategory: "",
    price: 0,
    location: "",
  });
  const [apiCategories, setApiCategories] = createSignal<ApiCategoriesResponse>(
    {}
  );
  const subCategories = createMemo(
    () => apiCategories()[filterOption()!.category]
  );

  onMount(async () => {
    if (!authService.checkAuth()) {
      navigate("/login");
      return;
    }

    let cachedCategores = SecureLocalStorage.getItem<ApiCategoriesResponse>(
      "x-pairprofit-categories"
    );
    if (cachedCategores) {
      setApiCategories(cachedCategores);
      setCategories(Object.keys(cachedCategores));
      return;
    }

    const api = new PublicHandler();
    try {
      const res = await api.fetchCategories();
      if (res.success) {
        setApiCategories(res.data.categories);
        SecureLocalStorage.storeItem(
          "x-pairprofit-categories",
          res.data.categories
        );
        console.log(res.data.categories);
        setCategories(Object.keys(res.data.categories));
      } else {
        console.error("API response for categories was not an object:", res);
        setApiCategories({});
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setApiCategories({});
    }
  });

  const handleApplyFilters = () => {
    const selectedCategory = category();
    const selectedLocation = location();

    console.log("Filters:", {
      category: selectedCategory,
      location: selectedLocation,
    });

    alert(`Filtering by:
    Category: ${selectedCategory || "All"}
    Location: ${selectedLocation || "All"}`);

    const filteredProfiles = profiles().filter((profile) => {
      const categoryMatch =
        !selectedCategory ||
        profile.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const locationMatch =
        !selectedLocation ||
        profile.location.toLowerCase() === selectedLocation.toLowerCase();
      return categoryMatch && locationMatch;
    });
    setProfiles(filteredProfiles);

    if (window.innerWidth < 768) {
      setIsFilterBarExpanded(false);
    }
  };

  function showModal() {
    document.getElementById("filterModal")!.classList.remove("hidden");
    document.getElementById("filterModal")!.style.left = "0";
    document.getElementById("filterModal")!.style.opacity = "1";
    document.getElementById("filterModal")!.style.visibility = "visible";
  }

  function hideModal() {
    document.getElementById("filterModal")!.style.left = "-100%";
    document.getElementById("filterModal")!.style.opacity = "0";
    document.getElementById("filterModal")!.style.visibility = "hidden";
    setTimeout(() => {
      document.getElementById("filterModal")!.classList.add("hidden");
    }, 300);
  }

  const handleProfileDetails = (profileID: string) => {
    setCurrentListing(profiles().find((el) => el.id === profileID));
    setViewProfile(true);
  };

  const handleInputChange = (
    e: Event & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setFilterOption((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  return (
    <>
      <div class="flex flex-wrap">
        <ProviderProfileDetail
          isOpen={viewProfile}
          closeModal={setViewProfile}
          listing={currentListing}
        />
        {window.innerWidth < 768 && (
          <button
            id="filter_toggle"
            class={`${css_class.filter_toggle} md:hidden fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 hover:bg-blue-700 z-10`}
            //   onClick={toggleFilterBar}
            onClick={() => showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class={css_class.filter_icon}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M12 10.2a2.4 2.4 0 012.4-2.4c.666 0 1.297.253 1.76.707L19.5 10.2l-4.94 4.94a3.42 3.42 0 01-1.76.707 2.4 2.4 0 01-2.4-2.4v-1.8z"
              />
            </svg>
          </button>
        )}

        <div
          class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-50 hidden"
          id="filterModal"
        >
          <div class="bg-white p-2 rounded-lg shadow-lg w-7/8 h-3/4 transition-all duration-300">
            <FilterBar
              categories={categories}
              subCategories={subCategories}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              onApplyFilters={handleApplyFilters}
              handleInputChange={handleInputChange}
            />
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => hideModal()}
            >
              Close
            </button>
          </div>
        </div>

        {openFilterBar() && (
          <div style={"width: 97vw;"}>
            <FilterBar
              categories={categories}
              subCategories={subCategories}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              onApplyFilters={handleApplyFilters}
              handleInputChange={handleInputChange}
            />
          </div>
        )}

        <div class="flex flex-wrap" style={"margin-top: 20px;"}>
          <For each={profiles()}>
            {(profile) => (
              <div class="md:w-6/12 px-2 lg:w-3/12 px-2 mb-2">
                <div class={css_class.profile_card}>
                  <div class={css_class.profile_header}>
                    <img
                      src={profile.profilePicture}
                      alt={profile.name}
                      class={css_class.profile_picture}
                    />
                    <div>
                      <h2 class={css_class.profile_name}>{profile.name}</h2>
                      <p class={css_class.profile_category}>
                        {profile.category}
                      </p>
                      <div class="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class={css_class.profile_info_icon}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>
                          {profile.overallRating} ({profile.yearsInBusiness}{" "}
                          years of experience)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    class={`${css_class.profile_details} ${css_class.text_truncate}`}
                  >
                    {profile.bio}
                  </p>
                  <button
                    onClick={() => handleProfileDetails(profile.id)}
                    class="mt-5 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-300 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Details
                    <svg
                      class="ml-2 -mr-0.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={TOTAL_ITEMS}
        onPageChange={handlePageChange}
        initialPage={1} // Optional: start on a specific page
        maxPagesToShow={5} // Optional: control how many page numbers are visible
      />
    </>
  );
};
