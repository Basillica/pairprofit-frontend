import { createSignal, For, JSX } from 'solid-js';

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

export const ResponsiveFilterBar = (props: ResponsiveFilterBarProps): JSX.Element => {
  const [category, setCategory] = createSignal('');
  const [subCategory, setSubCategory] = createSignal('');
  const [location, setLocation] = createSignal('');
  const [price, setPrice] = createSignal('');
  const [isExpanded, setIsExpanded] = createSignal(false);

  const handleApplyFilters = () => {
    props.onApplyFilters({
      category: category(),
      subCategory: subCategory(),
      location: location(),
      price: price(),
    });
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const toggleFilterBar = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <>
      <button id="filter-toggle" class={`md:hidden fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200 hover:bg-blue-700 z-10`} onClick={toggleFilterBar}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="filter-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M12 10.2a2.4 2.4 0 012.4-2.4c.666 0 1.297.253 1.76.707L19.5 10.2l-4.94 4.94a3.42 3.42 0 01-1.76.707 2.4 2.4 0 01-2.4-2.4v-1.8z" />
        </svg>
      </button>
      <div class={`filter-bar ${isExpanded() ? 'expanded' : ''}`} id="filter-bar">
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
              <For each={props.categories}>{(option) => (
                <option value={option.value}>{option.label}</option>
              )}</For>
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
              <For each={props.subCategories}>{(option) => (
                <option value={option.value}>{option.label}</option>
              )}</For>
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
              <For each={props.locations}>{(option) => (
                <option value={option.value}>{option.label}</option>
              )}</For>
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
              <For each={props.prices}>{(option) => (
                <option value={option.value}>{option.label}</option>
              )}</For>
            </select>
            <div class="select-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <button class="filter-button" id="apply-filters" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </>
  );
};