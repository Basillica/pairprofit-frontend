import { createSignal, For, JSX } from "solid-js";
import "./style.css";

interface FilterOption {
  value: string;
  label: string;
}

interface ResponsiveFilterBarProps {
  categories: FilterOption[];
  subCategories: FilterOption[];
  locations: FilterOption[];
  prices: FilterOption[];
  onApplyFilters: (filters: {
    category: string;
    subCategory: string;
    location: string;
    price: string;
  }) => void;
}

export const FilterBar = (props: ResponsiveFilterBarProps): JSX.Element => {
  const [category, setCategory] = createSignal("");
  const [subCategory, setSubCategory] = createSignal("");
  const [location, setLocation] = createSignal("");
  const [price, setPrice] = createSignal("");

  const handleApplyFilters = () => {
    props.onApplyFilters({
      category: category(),
      subCategory: subCategory(),
      location: location(),
      price: price(),
    });
  };

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
            value={category()}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
            <option value="">All Categories</option>
            <For each={props.categories}>
              {(option) => <option value={option.value}>{option.label}</option>}
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
            value={subCategory()}
            onChange={(e) => setSubCategory(e.currentTarget.value)}
          >
            <option value="">All Subcategories</option>
            <For each={props.subCategories}>
              {(option) => <option value={option.value}>{option.label}</option>}
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
          >
            <option value="">All Locations</option>
            <For each={props.locations}>
              {(option) => <option value={option.value}>{option.label}</option>}
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
        <label for="price" class="filter-label">
          Price
        </label>
        <div class="select-wrapper">
          <select
            id="price"
            class="filter-select"
            value={price()}
            onChange={(e) => setPrice(e.currentTarget.value)}
          >
            <option value="">All Prices</option>
            <For each={props.prices}>
              {(option) => <option value={option.value}>{option.label}</option>}
            </For>
          </select>
          <div class="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <button class="filter-button" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};
