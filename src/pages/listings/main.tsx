import { createSignal, Switch, Match, onMount, createMemo } from "solid-js"; // Import createMemo
import css_module from "./style.module.css";
import { FilterBar } from "../../components/utils";
import { ServiceListingA } from "./listings1";
import { ServiceListingsB } from "./listings2";
import { ServiceListingsC } from "./listings3";
import { Service } from "./types";
import { PublicHandler } from "../../api/public";

// Define the structure of the data you get from your API
interface ApiCategoriesResponse {
  [key: string]: string[];
}

interface FilterOption {
  value: string;
  label: string;
}

// Your hardcoded service listings (keeping for context)
const serviceListings: Service[] = [
  {
    title: "Plumbing Services",
    provider: "John Smith",
    description:
      "Experienced plumber offering a wide range of services including repairs, installations, and maintenance. Fast and reliable service with upfront pricing.",
    location: "Serving: Erfurt, Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Pipe repair", "drain cleaning", "installations"],
    price: "€50/hour",
    isNegotiable: true,
    coordinates: [50.979, 11.033],
  },
  {
    title: "Carpentry Services",
    provider: "Acme Carpentry",
    description:
      "Professional carpentry services for residential and commercial projects. Custom furniture, installations, and repairs. High-quality workmanship and attention to detail.",
    location: "Serving: Weimar, Jena, Erfurt",
    availability: "Availability: Monday - Saturday",
    servicesOffered: ["Custom cabinets", "framing", "trim work"],
    price: "€60/hour",
    isNegotiable: true,
    coordinates: [50.983, 11.327],
  },
  {
    title: "Electrical Services",
    provider: "Volt Electric",
    description:
      "Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.",
    location: "Serving: Statewide Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Wiring", "lighting", "panel upgrades"],
    price: "€75/hour",
    isNegotiable: true,
    urgency: "high",
    coordinates: [51.083, 11.183],
  },
  {
    title: "Electrical Nürnberg",
    provider: "Volt Electric",
    description:
      "Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.",
    location: "Serving: Statewide Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Wiring", "lighting", "panel upgrades"],
    price: "€75/hour",
    isNegotiable: true,
    urgency: "high",
    coordinates: [41.40338, 2.17403],
  },
  {
    title: "Plumbing Services",
    provider: "John Smith",
    description:
      "Experienced plumber offering a wide range of services including repairs, installations, and maintenance. Fast and reliable service with upfront pricing.",
    location: "Serving: Erfurt, Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Pipe repair", "drain cleaning", "installations"],
    price: "€50/hour",
    isNegotiable: true,
    coordinates: [46.40338, 7.17403],
  },
  {
    title: "Carpentry Services",
    provider: "Acme Carpentry",
    description:
      "Professional carpentry services for residential and commercial projects. Custom furniture, installations, and repairs. High-quality workmanship and attention to detail.",
    location: "Serving: Weimar, Jena, Erfurt",
    availability: "Availability: Monday - Saturday",
    servicesOffered: ["Custom cabinets", "framing", "trim work"],
    price: "€60/hour",
    isNegotiable: true,
    coordinates: [46.40338, 7.17403],
  },
  {
    title: "Electrical Services",
    provider: "Volt Electric",
    description:
      "Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.",
    location: "Serving: Statewide Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Wiring", "lighting", "panel upgrades"],
    price: "€75/hour",
    isNegotiable: true,
    urgency: "high",
    coordinates: [46.40338, 7.17403],
  },
  {
    title: "Electrical Services",
    provider: "Volt Electric",
    description:
      "Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.",
    location: "Serving: Statewide Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Wiring", "lighting", "panel upgrades"],
    price: "€75/hour",
    isNegotiable: true,
    urgency: "low",
    coordinates: [46.40338, 7.17403],
  },
  {
    title: "Electrical Services",
    provider: "Volt Electric",
    description:
      "Certified electricians offering a full range of electrical services. Installations, repairs, and maintenance for residential and commercial properties.",
    location: "Serving: Statewide Thuringia",
    availability: "Availability: 24/7 Emergency Service",
    servicesOffered: ["Wiring", "lighting", "panel upgrades"],
    price: "€75/hour",
    isNegotiable: true,
    urgency: "medium",
    coordinates: [46.40338, 7.17403],
  },
];

export const ServiceListings = () => {
  // Signal to store the fetched categories data
  const [apiCategories, setApiCategories] = createSignal<ApiCategoriesResponse>(
    {}
  );

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

  const [ListingType, setListingType] = createSignal<string>("Type1");
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

  onMount(async () => {
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

  const handleListingTypeToggle = (type: string) => {
    setListingType(type);
  };

  return (
    <div>
      {window.innerWidth > 768 && (
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
      )}

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

      <Switch fallback={<p>Loading service listings...</p>}>
        <Match when={ListingType() === "Type1"}>
          <ServiceListingA listings={serviceListings} />
        </Match>
        <Match when={ListingType() === "Type2"}>
          <ServiceListingsB listings={serviceListings} />
        </Match>
        <Match when={ListingType() === "Type3"}>
          <ServiceListingsC listings={serviceListings} />
        </Match>
      </Switch>
    </div>
  );
};

export default ServiceListings;
