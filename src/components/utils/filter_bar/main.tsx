import { Accessor, createSignal, For, JSX, Setter } from 'solid-js';
import './style.css';

interface FilterOption {
    category: string;
    subCategory: string;
    location: string;
    price: number;
    rating?: number;
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
    const [location, setLocation] = createSignal('');
    const [price, setPrice] = createSignal('');

    return (
        <div
            class="container-fluid filter-bar filter-section top-0 left-0 w-full h-full opacity-75"
            style={'padding: 8px; background-color: #aedfe7ff'}
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
                            {(option) => (
                                <option value={option}>{option}</option>
                            )}
                        </For>
                    </select>
                    <div class="select-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
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
                            {(option) => (
                                <option value={option}>{option}</option>
                            )}
                        </For>
                    </select>
                    <div class="select-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
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
                    </select>
                    <div class="select-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
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
                    </select>
                    <div class="select-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            {props.filterOption().rating && (
                <div class="filter-section">
                    <label for="rating" class="filter-label">
                        Rating
                    </label>
                    <div class="select-wrapper">
                        <select
                            id="rating"
                            class="filter-select"
                            value={props.filterOption()!.rating}
                            onChange={(e) => props.handleInputChange(e)}
                            name="rating"
                        >
                            <option value="">All Subcategories</option>
                            <For each={[1, 2, 3, 4, 5]}>
                                {(option) => (
                                    <option value={option}>{option}</option>
                                )}
                            </For>
                        </select>
                        <div class="select-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <button
                class="filter-button"
                onClick={() => props.onApplyFilters(props.filterOption())}
            >
                Apply Filters
            </button>
        </div>
    );
};
