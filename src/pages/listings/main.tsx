import {
  createSignal,
  Switch,
  Match,
  onMount,
  createMemo,
  createResource,
} from "solid-js";
import css_module from "./style.module.css";
import { FilterBar } from "../../components/utils";
import { ServiceListingA } from "./listings1";
import { ServiceListingsB } from "./listings2";
import { ServiceListingsC } from "./listings3";
import { PublicHandler } from "../../api";
import { useNavigate } from "@solidjs/router";
import { authService } from "../../oauth/manager";
import { SecureLocalStorage } from "../../lib/localstore";
import { ListingApiHandler } from "../../api/backend/listing";
import { ListingPayload } from "../../models/listing";

// Define the structure of the data you get from your API
interface ApiCategoriesResponse {
  [key: string]: string[];
}

interface FilterOption {
  category: string;
  subCategory: string;
  location: string;
  price: number;
}

export interface ListingsFilter {
  filters: string[];
  string_params: string[];
  limit?: number;
  offset?: number;
}

export const ServiceListings = () => {
  const [apiCategories, setApiCategories] = createSignal<ApiCategoriesResponse>(
    {}
  );
  const NUMBER_OF_ITEMS_PER_PAGE = 20;
  const [openFilterBar] = createSignal(window.innerWidth > 768 ? true : false);
  const navigate = useNavigate();
  const [categories, setCategories] = createSignal<string[]>([]);
  const [listingsCount, setListingsCount] = createSignal(0);
  const [filterOption, setFilterOption] = createSignal<FilterOption>({
    category: "",
    subCategory: "",
    price: 0,
    location: "",
  });

  const subCategories = createMemo(
    () => apiCategories()[filterOption()!.category]
  );

  const fetchListings = async (
    props: ListingsFilter
  ): Promise<ListingPayload[]> => {
    let api = new ListingApiHandler();
    let listings: ListingPayload[] = [];
    const result = await api.fetchAllListins(props);
    if (result.success) {
      setListingsCount(result.data.count);
      listings = result.data.listings as ListingPayload[];
    }
    return listings;
  };

  const [filterProps, setFilterProps] = createSignal<ListingsFilter>({
    filters: [""],
    string_params: [""],
    limit: 10,
  });

  const [listings] = createResource(filterProps, fetchListings);

  const [ListingType] = createSignal<string>(
    window.innerWidth > 768 ? "Type1" : "Type1"
  );

  const handleApplyFilters = () => {
    let filters = [];
    let params = [];
    if (filterOption().category !== "") {
      filters.push("category");
      params.push(filterOption().category);
    }
    filters.push(...filterProps().filters);
    if (filterOption().subCategory !== "") {
      filters.push("sub_category");
      params.push(filterOption().subCategory);
    }
    params.push(...filterProps().string_params);

    setFilterProps({
      filters: [...new Set(filters.filter((e) => e))],
      string_params: [...new Set(params.filter((e) => e))],
      limit: NUMBER_OF_ITEMS_PER_PAGE,
    });
  };

  const handlePageChange = (newPage: number, offset: number, limit: number) => {
    console.log("going to page: ", newPage);
    setFilterProps({
      ...filterProps(),
      limit: limit,
      offset: offset,
      // limit
    });
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
        <div style={"padding-bottom: 10px; margin-top: 5px"}>
          <Switch fallback={<p>Loading filters...</p>}>
            <Match when={apiCategories()}>
              <FilterBar
                categories={categories}
                subCategories={subCategories}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                onApplyFilters={handleApplyFilters}
                handleInputChange={handleInputChange}
              />
            </Match>
          </Switch>
        </div>
      )}

      <Switch fallback={<p>Loading service listings...</p>}>
        <Match when={ListingType() === "Type1"}>
          <ServiceListingA
            categories={apiCategories}
            listings={listings}
            listingsCount={listingsCount}
            handlePageChange={handlePageChange}
          />
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
