import { Accessor, createSignal, For, JSX, Setter } from "solid-js";
import "./style.css";

interface FilterOption {
  category: string;
  subCategory: string;
  location: string;
  price: number;
}

interface ResponsiveFilterBarProps {
  categories: Accessor<string[]>;
  subCategories: Accessor<string[]>;
  setFilterOption: Setter<FilterOption>;
  filterOption: Accessor<FilterOption>;
  onApplyFilters: (filters: FilterOption) => void;
  handleInputChange: (
    e: Event & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => void;
}

export const FilterBar = (props: ResponsiveFilterBarProps): JSX.Element => {
  const [location, setLocation] = createSignal("");
  const [price, setPrice] = createSignal("");

  return (
    <div
      class="container-fluid filter-bar filter-section"
      style={"padding: 8px"}
    >
      <div class="filter-section">
        <label for="main-category" class="filter-label">
          Main Category
        </label>
        <div class="select-wrapper">
          <select
            id="main-category"
            class="filter-select"
            value={props.filterOption()!.category}
            onChange={(e) => props.handleInputChange(e)}
            name="category"
          >
            <option value="">All Categories</option>
            <For each={props.categories()}>
              {(option) => <option value={option}>{option}</option>}
            </For>
          </select>
          <div class="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <label for="sub-category" class="filter-label">
          Sub Category
        </label>
        <div class="select-wrapper">
          <select
            id="sub-category"
            class="filter-select"
            value={props.filterOption()!.subCategory}
            onChange={(e) => props.handleInputChange(e)}
            name="subCategory"
          >
            <option value="">All Subcategories</option>
            <For each={props.subCategories()}>
              {(option) => <option value={option}>{option}</option>}
            </For>
          </select>
          <div class="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <label for="location" class="filter-label">
          Location
        </label>
        <div class="select-wrapper">
          <select
            id="location"
            class="filter-select"
            value={location()}
            onChange={(e) => setLocation(e.currentTarget.value)}
            name="location"
          >
            <option value="">All Locations</option>
            {/* <For each={props.locations}>
              {(option) => <option value={option.value}>{option.label}</option>}
            </For> */}
          </select>
          <div class="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="filter-section">
        <label for="price" class="filter-label">
          Price
        </label>
        <div class="select-wrapper">
          <select
            id="price"
            class="filter-select"
            value={price()}
            onChange={(e) => setPrice(e.currentTarget.value)}
            name="price"
          >
            <option value="">All Prices</option>
            {/* <For each={props.prices}>
              {(option) => <option value={option.value}>{option.label}</option>}
            </For> */}
          </select>
          <div class="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <button
        class="filter-button"
        onClick={() => props.onApplyFilters(props.filterOption())}
      >
        Apply Filters
      </button>
    </div>
  );
};
