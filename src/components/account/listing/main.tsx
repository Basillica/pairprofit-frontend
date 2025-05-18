import { createSignal, For, JSX } from "solid-js";
import css_class from "./style.module.css";
import { FilterBar } from "../../utils";

interface FilterOption {
  value: string;
  label: string;
}

interface Profile {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  yearsOfExperience: number;
  description: string;
  imageUrl: string;
}

export const ServiceProviderListings = (): JSX.Element => {
  const [category] = createSignal("");
  const [location] = createSignal("");
  const [isFilterBarExpanded, setIsFilterBarExpanded] = createSignal(false);
  const mockProfiles = [
    {
      id: 1,
      name: "John Smith",
      category: "Carpenter",
      location: "USA",
      rating: 4.5,
      yearsOfExperience: 10,
      description:
        "Experienced carpenter specializing in custom woodwork and furniture.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "Jane Doe",
      category: "Teacher",
      location: "Canada",
      rating: 4.8,
      yearsOfExperience: 8,
      description:
        "Certified teacher with a passion for helping students achieve their full potential.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 3,
      name: "David Lee",
      category: "Engineer",
      location: "UK",
      rating: 4.2,
      yearsOfExperience: 12,
      description:
        "Professional engineer specializing in structural design and project management.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 4,
      name: "Sarah Williams",
      category: "Electrician",
      location: "USA",
      rating: 4.7,
      yearsOfExperience: 7,
      description:
        "Licensed electrician providing residential and commercial electrical services.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 5,
      name: "Michael Brown",
      category: "Plumber",
      location: "Australia",
      rating: 4.9,
      yearsOfExperience: 15,
      description:
        "Master plumber specializing in complex plumbing installations and repairs.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 6,
      name: "Maria Garcia",
      category: "Chef",
      location: "Spain",
      rating: 4.6,
      yearsOfExperience: 9,
      description:
        "Experienced chef offering catering services and private cooking lessons.",
      imageUrl: "https://picsum.photos/200",
    },
    {
      id: 7,
      name: "Anthony Etienne",
      category: "Chef",
      location: "Basillia",
      rating: 4.6,
      yearsOfExperience: 9,
      description:
        "Experienced chef offering catering services and private cooking lessons.",
      imageUrl: "https://picsum.photos/200",
    },
  ];
  const [profiles, setProfiles] = createSignal<Profile[]>(mockProfiles);
  const [openFilterBar, setOpenFilterBar] = createSignal(
    window.innerWidth > 768 ? true : false
  );

  const categories: FilterOption[] = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home-garden", label: "Home & Garden" },
  ];

  const subCategories: FilterOption[] = [
    { value: "laptops", label: "Laptops" },
    { value: "phones", label: "Phones" },
    { value: "shirts", label: "Shirts" },
    { value: "pants", label: "Pants" },
    { value: "sofas", label: "Sofas" },
    { value: "tables", label: "Tables" },
  ];

  const locations: FilterOption[] = [
    { value: "usa", label: "USA" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "UK" },
  ];

  const prices: FilterOption[] = [
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100+", label: "$100+" },
  ];

  const toggleFilterBar = () => {
    setIsFilterBarExpanded(!isFilterBarExpanded());
  };

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

    const filteredProfiles = mockProfiles.filter((profile) => {
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

  return (
    <div class="flex flex-wrap">
      {window.innerWidth < 768 && (
        <button
          id="filter_toggle"
          class={`${css_class.filter_toggle} md:hidden fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 hover:bg-blue-700 z-10`}
          //   onClick={toggleFilterBar}
          //   onClick={() => setOpenFilterBar(!openFilterBar())}
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
            locations={locations}
            prices={prices}
            onApplyFilters={handleApplyFilters}
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
        <div style={"width: 94vw"}>
          <FilterBar
            categories={categories}
            subCategories={subCategories}
            locations={locations}
            prices={prices}
            onApplyFilters={handleApplyFilters}
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
                    src={profile.imageUrl}
                    alt={profile.name}
                    class={css_class.profile_picture}
                  />
                  <div>
                    <h2 class={css_class.profile_name}>{profile.name}</h2>
                    <p class={css_class.profile_category}>{profile.category}</p>
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
                        {profile.rating} ({profile.yearsOfExperience} years of
                        experience)
                      </span>
                    </div>
                  </div>
                </div>
                <p
                  class={`${css_class.profile_details} ${css_class.text_truncate}`}
                >
                  {profile.description}
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
