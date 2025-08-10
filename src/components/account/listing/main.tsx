import {
    Component,
    createMemo,
    createResource,
    createSignal,
    For,
    JSX,
    onMount,
} from 'solid-js';
import css_class from './style.module.css';
import { FilterBar, Pagination } from '../../utils';
import { ArtisanModel } from '../../../models/profile';
import { ProviderProfileDetail } from '../../utils/modals';
import { authService } from '../../../oauth/manager';
import { useNavigate } from '@solidjs/router';
import { SecureLocalStorage, LocalStorageKey } from '../../../lib/localstore';
import { PublicHandler } from '../../../api';
import { ArtisanApiHandler } from '../../../api/backend/profile';

interface FilterOption {
    category: string;
    subCategory: string;
    location: string;
    price: number;
    rating?: number;
}

interface ApiCategoriesResponse {
    [key: string]: string[];
}

export interface ListingsFilter {
    filters: string[];
    string_params: string[];
    limit?: number;
    offset?: number;
}

export const ServiceProviderListings = (): JSX.Element => {
    const navigate = useNavigate();
    const [openFilterBar] = createSignal(
        window.innerWidth > 768 ? true : false
    );
    const [viewProfile, setViewProfile] = createSignal(false);
    const [currentListing, setCurrentListing] = createSignal<ArtisanModel>();
    const handlePageChange = (offset: number, limit: number) => {
        setFilterProps({
            ...filterProps(),
            limit: limit,
            offset: offset,
        });
    };

    const [artisanCount, setArtisanCount] = createSignal(0);

    const fetchArtisans = async (
        props: ListingsFilter
    ): Promise<ArtisanModel[]> => {
        let api = new ArtisanApiHandler();
        let listings: ArtisanModel[] = [];
        const result = await api.fetchAllArtisans(props);
        if (result.success) {
            setArtisanCount(result.data.count);
            listings = result.data.listings as ArtisanModel[];
        }
        setArtisanCount(result.data.count);
        return listings;
    };

    const NUMBER_OF_ITEMS_PER_PAGE = 21;
    const [currentPage, setCurrentPage] = createSignal(1);
    const [categories, setCategories] = createSignal<string[]>([]);
    const [filterProps, setFilterProps] = createSignal<ListingsFilter>({
        filters: [''],
        string_params: [''],
        limit: NUMBER_OF_ITEMS_PER_PAGE,
    });
    const [filterOption, setFilterOption] = createSignal<FilterOption>({
        category: '',
        subCategory: '',
        price: 0,
        rating: 5,
        location: '',
    });
    const [profileListings] = createResource(filterProps, fetchArtisans);

    const openListing = (listingID: string) => {
        setCurrentListing(
            profileListings.latest!.find((el) => el.id === listingID)!
        );
        setViewProfile(true);
    };
    const [apiCategories, setApiCategories] =
        createSignal<ApiCategoriesResponse>({});
    const subCategories = createMemo(
        () => apiCategories()[filterOption()!.category]
    );

    onMount(async () => {
        if (!authService.isAuthValid()) {
            navigate('/login');
            return;
        }

        let cachedCategores = SecureLocalStorage.getItem<ApiCategoriesResponse>(
            LocalStorageKey.PairProfitCategories
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
                    LocalStorageKey.PairProfitCategories,
                    res.data.categories
                );
                console.log(res.data.categories);
                setCategories(Object.keys(res.data.categories));
            } else {
                console.error(
                    'API response for categories was not an object:',
                    res
                );
                setApiCategories({});
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setApiCategories({});
        }
    });

    const handleApplyFilters = () => {
        let filters = [];
        let params = [];
        if (filterOption().category !== '') {
            filters.push('category');
            params.push(filterOption().category);
        }
        if (filterOption().subCategory !== '') {
            filters.push('sub_category');
            params.push(filterOption().subCategory);
        }

        setFilterProps({
            filters: [...new Set(filters.filter((e) => e))],
            string_params: [...new Set(params.filter((e) => e))],
            limit: NUMBER_OF_ITEMS_PER_PAGE,
        });
    };

    function showModal() {
        document.getElementById('filterModal')!.classList.remove('hidden');
        document.getElementById('filterModal')!.style.left = '0';
        document.getElementById('filterModal')!.style.opacity = '1';
        document.getElementById('filterModal')!.style.visibility = 'visible';
    }

    function hideModal() {
        document.getElementById('filterModal')!.style.left = '-100%';
        document.getElementById('filterModal')!.style.opacity = '0';
        document.getElementById('filterModal')!.style.visibility = 'hidden';
        setTimeout(() => {
            document.getElementById('filterModal')!.classList.add('hidden');
        }, 300);
    }

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
        <div class="containers">
            <div>
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
                    <div style={'margin-bottom: 5px; padding: 3px'}>
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

                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                    style={'margin-top: 10px;'}
                >
                    <For each={profileListings.latest}>
                        {(profile) => (
                            <div>
                                <div class={css_class.profile_card}>
                                    <div class=" p-6 pb-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-shrink-0">
                                        <div class="flex justify-center -mb-12">
                                            <img
                                                class="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                                                src={
                                                    profile.profile_picture !==
                                                    ''
                                                        ? profile.profile_picture
                                                        : `https://picsum.photos/200?random=${Math.random()}`
                                                }
                                                alt={`${profile.name} Profile Picture`}
                                            />
                                        </div>
                                    </div>
                                    <div class="p-6 pt-16 flex-grow flex flex-col justify-between">
                                        <div class="text-center mb-4">
                                            <h3 class="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                                                {profile.name}
                                            </h3>
                                            <p
                                                class="text-md text-blue-700 font-semibold mb-2 provider-specialization"
                                                style={'height: 45px'}
                                            >
                                                {profile.specialization}
                                            </p>
                                            <p
                                                class="text-sm text-gray-600 mb-3"
                                                style={'height: 45px'}
                                            >
                                                {profile.category} &bull;{' '}
                                                {profile.sub_category}
                                            </p>
                                            <div class="flex items-center justify-center text-yellow-500 mb-4">
                                                <RenderStars
                                                    rating={
                                                        profile.overall_rating
                                                    }
                                                />
                                                <span class="text-gray-700 ml-2 font-semibold">
                                                    {profile.overall_rating}
                                                </span>
                                                <span class="text-gray-500 text-sm ml-1">
                                                    ({profile.total_reviews}{' '}
                                                    Reviews)
                                                </span>
                                            </div>
                                            <div class="flex items-center justify-center text-gray-700 text-sm mb-2">
                                                <svg
                                                    class="w-4 h-4 mr-1 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17.657 16.727A8 8 0 0120 18a8 8 0 01-16 0c0-.825.166-1.62.474-2.373L12 3l5.657 13.727z"
                                                    ></path>
                                                </svg>
                                                <span>{profile.location}</span>
                                            </div>
                                        </div>

                                        <div class="mb-4 text-center text-gray-700 text-sm provider-bio h-10">
                                            {profile.bio.length <= 90
                                                ? profile.bio
                                                : profile.bio.slice(0, 90)}{' '}
                                            ...
                                        </div>

                                        <div class="mt-auto text-center">
                                            <button
                                                onClick={() =>
                                                    openListing(profile.id)
                                                }
                                                class="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                            >
                                                View Full Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>

            <Pagination
                itemsPerPage={NUMBER_OF_ITEMS_PER_PAGE}
                totalItems={artisanCount()}
                onPageChange={handlePageChange}
                initialPage={1}
                maxPagesToShow={5}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

const RenderStars: Component<{ rating: number }> = (props) => {
    const fullStars = () => Math.floor(props.rating);
    const hasHalfStar = () => props.rating % 1 !== 0;
    const emptyStars = () => 5 - Math.ceil(props.rating);
    return (
        <div class="flex items-center text-yellow-500">
            <For each={Array(fullStars())}>
                {() => <i class="fas fa-star text-base"></i>}
            </For>

            {hasHalfStar() && <i class="fas fa-star-half-alt text-base"></i>}

            <For each={Array(emptyStars())}>
                {() => <i class="far fa-star text-base"></i>}
            </For>
        </div>
    );
};
