import { createSignal, Switch, Match, onMount, createMemo } from "solid-js"; // Import createMemo
import css_module from "./style.module.css";
import { FilterBar } from "../../components/utils";
import { ServiceListingA } from "./listings1";
import { ServiceListingsB } from "./listings2";
import { ServiceListingsC } from "./listings3";
import { PublicHandler } from "../../api/public";
import { useNavigate } from "@solidjs/router";
import { authService } from "../../oauth/manager";

// Define the structure of the data you get from your API
interface ApiCategoriesResponse {
  [key: string]: string[];
}

interface FilterOption {
  value: string;
  label: string;
}

export const ServiceListings = () => {
  // Signal to store the fetched categories data
  const [apiCategories, setApiCategories] = createSignal<ApiCategoriesResponse>(
    {}
  );
  const [openFilterBar] = createSignal(window.innerWidth > 768 ? true : false);
  const navigate = useNavigate();

  // Signal to store the currently selected main category
  const [selectedCategory, setSelectedCategory] = createSignal<string>(""); // Store the original label, or empty for "All"

  // Derived signal for main categories (for the first dropdown)
  const filterMainCategories = createMemo(() => {
    if (!apiCategories()) return [];
    return Object.keys(apiCategories()).map((key) => ({
      value: key, // Use the original key as value for easier lookup later
      label: key,
    }));
  });

  // Derived signal for subcategories (dynamic based on selectedCategory)
  const filterSubCategories = createMemo(() => {
    const currentCategories = apiCategories();
    const currentSelectedCategory = selectedCategory();

    if (!currentCategories) return []; // No data yet

    if (currentSelectedCategory) {
      // If a category is selected, return only its subcategories
      const subCats = currentCategories[currentSelectedCategory] || [];
      return subCats.map((subCat) => ({
        value: subCat.toLowerCase().replace(/ /g, "-"),
        label: subCat,
      }));
    } else {
      // If no category is selected, return all unique subcategories
      const allSubCategories = new Set<string>();
      for (const category of Object.values(currentCategories)) {
        category.forEach((subCat) => allSubCategories.add(subCat));
      }
      return Array.from(allSubCategories).map((subCat) => ({
        value: subCat.toLowerCase().replace(/ /g, "-"),
        label: subCat,
      }));
    }
  });

  const [ListingType] = createSignal<string>(
    window.innerWidth > 768 ? "Type3" : "Type1"
  );

  const [_, setFilters] = createSignal({
    category: "",
    subCategory: "",
    location: "",
    price: "",
  });

  const handleApplyFilters = (newFilters: {
    category: string;
    subCategory: string;
    location: string;
    price: string;
  }) => {
    console.log("Applying filters in App:", newFilters);
    setFilters(newFilters);
    setSelectedCategory(newFilters.category);
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

  onMount(async () => {
    if (!authService.checkAuth()) {
      navigate("/login");
      return;
    }

    const api = new PublicHandler();
    try {
      const res = await api.fetchCategories();
      console.log(res, "Fetched categories from API");
      if (res.success) {
        setApiCategories(res.data.categories);
      } else {
        console.error("API response for categories was not an object:", res);
        setApiCategories({});
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setApiCategories({});
    }
  });

  // Hardcoded locations and prices (you can fetch these from API similarly if needed)
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

  return (
    <div>
      {/* {window.innerWidth > 768 && (
        <div
          class="flex flex-nowrap justify-between items-center rounded-md"
          style={"padding-top: 4px"}
        >
          <div class="space-x-2 flex-shrink-0">
            <button
              class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`}
              onClick={() => handleListingTypeToggle("Type1")}
            >
              Card View
            </button>
            <button
              class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`}
              onClick={() => handleListingTypeToggle("Type2")}
            >
              List View
            </button>
            <button
              class={`${css_module.top_section_right_button} px-4 py-2 rounded focus:outline-none`}
              onClick={() => handleListingTypeToggle("Type3")}
            >
              Map View
            </button>
          </div>
        </div>
      )} */}

      {window.innerWidth < 768 && (
        <button
          id="filter_toggle"
          class={`${css_module.filter_toggle} md:hidden fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 hover:bg-blue-700 z-10`}
          //   onClick={toggleFilterBar}
          onClick={() => showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={css_module.filter_icon}
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
            categories={filterMainCategories()} // Use the derived main categories
            subCategories={filterSubCategories()} // Use the dynamically filtered subcategories
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
        <div style={"padding-bottom: 10px; margin-top: 5px"}>
          <Switch fallback={<p>Loading filters...</p>}>
            <Match when={apiCategories()}>
              <FilterBar
                categories={filterMainCategories()} // Use the derived main categories
                subCategories={filterSubCategories()} // Use the dynamically filtered subcategories
                locations={locations}
                prices={prices}
                onApplyFilters={handleApplyFilters}
              />
            </Match>
          </Switch>
        </div>
      )}

      <Switch fallback={<p>Loading service listings...</p>}>
        <Match when={ListingType() === "Type1"}>
          <ServiceListingA />
        </Match>
        <Match when={ListingType() === "Type2"}>
          <ServiceListingsB />
        </Match>
        <Match when={ListingType() === "Type3"}>
          <ServiceListingsC />
        </Match>
      </Switch>
    </div>
  );
};
