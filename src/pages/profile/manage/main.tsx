import {
    createSignal,
    createEffect,
    For,
    Show,
    Component,
    onMount,
    createResource,
} from 'solid-js';
import { StarRating } from './rating';
import {
    DeleteItemModal,
    EditProfileModal,
} from '../../../components/utils/modals';
import { CreateProviderProfile } from '../../../components/utils/modals';
import { SecureLocalStorage, LocalStorageKey } from '../../../lib/localstore';
import { ArtisanModel } from '../../../models/profile';
import { ArtisanApiHandler } from '../../../api/backend/profile';
import { UserModel } from '../../../models/auth';
import css_module from './style.module.css';
import { ViewProfileModal } from '../../../components/utils/modals';
import { BucketAPIHandler } from '../../../api/supabase';

export interface ListingsFilter {
    filters: string[];
    string_params: string[];
    limit?: number;
    offset?: number;
}

export const ManageServiceProfiles: Component<{}> = () => {
    const [authUser, setAuthUser] = createSignal<UserModel>();
    const fetchProfiles = async (props: ListingsFilter) => {
        const api = new ArtisanApiHandler();
        const result = await api.getListingByID(authUser()!.id, props);
        if (result) {
            console.log(result.data.listings);
            setUserProfiles(result.data.listings);
            return result.data.listings;
        }
    };
    const NUMBER_OF_ITEMS_PER_PAGE = 21;
    const [filterProps, setFilterProps] = createSignal<ListingsFilter>({
        filters: [''],
        string_params: [''],
        limit: NUMBER_OF_ITEMS_PER_PAGE,
    });
    const [artisanProfiles] = createResource(filterProps, fetchProfiles);
    const [userProfiles, setUserProfiles] = createSignal<ArtisanModel[]>(
        artisanProfiles.latest ?? []
    );
    const [activeProfileId, setActiveProfileIdInternal] = createSignal(
        SecureLocalStorage.getItem(LocalStorageKey.AuthUserActiveProfile)
    );
    const [deleteProfileListing, setDeleteProfileListing] = createSignal(false);
    const [showEditModal, setShowEditModal] = createSignal(false);
    const [showViewModal, setShowViewModal] = createSignal(false);
    const [showCreateModal, setShowCreateModal] = createSignal(false);
    const [editingProfile, setEditingProfile] = createSignal<ArtisanModel>();
    const [viewingProfile, setViewingProfile] = createSignal<ArtisanModel>();
    const [deleteCurrentProfile, setCurrentDeleteProfile] =
        createSignal<ArtisanModel>();

    const [isAppLoading, setAppLoading] = createSignal(false);

    onMount(async () => {
        const user = SecureLocalStorage.getItem<UserModel>(
            LocalStorageKey.AppAuthUserModel
        );
        if (user) {
            setAuthUser(user);
            setFilterProps((prev) => ({
                ...prev,
                filters: ['user_id'],
                string_params: [user.id],
            }));
        }
    });
    // Initialize active profile if none is set, or if an existing active one is deleted
    // This also serves as the initial render logic in SolidJS
    createEffect(() => {
        const currentActiveId = SecureLocalStorage.getItem<string>(
            LocalStorageKey.AuthUserActiveProfile
        );
        if (currentActiveId && userProfiles().length > 0) {
            setActiveProfileIdInternal(currentActiveId);
        }
    });

    const setActiveProfile = (id: string) => {
        SecureLocalStorage.storeItem(LocalStorageKey.AuthUserActiveProfile, id);
        setActiveProfileIdInternal(id);
    };

    const openEditModal = (profileId: string) => {
        const profile = userProfiles().find(
            (p: ArtisanModel) => p.id === profileId
        );
        if (profile) {
            setEditingProfile(profile);
            setShowEditModal(true);
        }
    };

    const openViewModal = (profileId: string) => {
        const profile = userProfiles().find(
            (p: ArtisanModel) => p.id === profileId
        );
        if (profile) {
            setViewingProfile(profile);
            setShowViewModal(true);
        }
    };

    const openDeleteListing = (listingID: string) => {
        setCurrentDeleteProfile(
            userProfiles()!.find((el) => el.id === listingID)!
        );
        setDeleteProfileListing(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingProfile();
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setViewingProfile();
    };

    const saveProfileChanges = async (updatedProfile: ArtisanModel) => {
        setAppLoading(true);
        const api = new ArtisanApiHandler();
        const result = await api.editListing(updatedProfile.id, updatedProfile);
        if (result.success) {
            setUserProfiles((prevProfiles) =>
                prevProfiles.map((p) =>
                    p.id === updatedProfile.id ? updatedProfile : p
                )
            );
        }
        setAppLoading(false);
    };

    function getFilePath(url: string): string | null {
        const profilesPath = '/profiles/';
        const startIndex = url.indexOf(profilesPath);

        if (startIndex !== -1) {
            // Add the length of "/profiles/" to get the start of the UUID
            return url.substring(startIndex + profilesPath.length);
        }
        return null; // UUID part not found
    }

    const deleteProfile = async () => {
        setDeleteProfileListing(false);
        setAppLoading(true);

        const supabase = new BucketAPIHandler();
        const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
        if (!project_url) {
            console.error('VITE_SUPABASE_PROJECT_URL is missing.');
            setAppLoading(false);
            return;
        }

        let filePath = getFilePath(deleteCurrentProfile()!.id);
        if (filePath) {
            let result = await supabase.deleteFile('profiles', [filePath]);
            console.log('the rseult ------', result);
        }

        const api = new ArtisanApiHandler();
        const result = await api.deleteListing(deleteCurrentProfile()!.id);
        if (result.success) {
            setUserProfiles((prevProfiles) =>
                prevProfiles.filter((p) => p.id !== deleteCurrentProfile()!.id)
            );
            console.log('done deleting profile');
        }
        setAppLoading(false);
    };

    return (
        <div
            class="w-full bg-white p-8 rounded-lg shadow-lg"
            style={'min-height: 90vh'}
        >
            {(artisanProfiles.loading || isAppLoading()) && <Overlay />}

            <ViewProfileModal
                show={showViewModal()}
                artisanProfile={viewingProfile}
                onClose={closeViewModal}
            />

            <EditProfileModal
                show={showEditModal()}
                artisanProfile={editingProfile}
                onClose={closeEditModal}
                onSave={saveProfileChanges}
            />

            <CreateProviderProfile
                isOpen={showCreateModal}
                closeModal={setShowCreateModal}
                userProfiles={userProfiles}
                setUserProfiles={setUserProfiles}
            />

            <DeleteItemModal
                isOpen={deleteProfileListing}
                continueDeletion={setDeleteProfileListing}
                deleteListing={deleteProfile}
                message="Are you sure that you want to delete this profile? All your contacts and message for this profile would be lost as well."
            />
            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
                Manage Your Service Profiles
            </h1>
            <p class="text-gray-600 text-center mb-6">
                Here you can oversee all your different service provider roles,
                add new ones, or make changes.
            </p>

            <div class="mb-8 text-center">
                <button
                    onClick={() => setShowCreateModal(true)}
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                        ></path>
                    </svg>
                    Create New Service Profile
                </button>
            </div>

            <section class="mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Your Existing Profiles
                </h2>
                <div
                    id="profilesContainer"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <Show
                        when={!artisanProfiles.loading}
                        fallback={
                            <p class="text-gray-500 text-center col-span-full mt-4">
                                You haven't created any service profiles yet.
                                Click "Create New Service Profile" to get
                                started!
                            </p>
                        }
                    >
                        <For each={userProfiles()}>
                            {(profile: ArtisanModel) => {
                                return (
                                    <div
                                        classList={{
                                            'bg-white': true,
                                            'p-6': true,
                                            'rounded-lg': true,
                                            'shadow-md': true,
                                            flex: true,
                                            'flex-col': true,
                                            'items-center': true,
                                            'text-center': true,
                                            transition: true,
                                            'duration-200': true,
                                            'hover:shadow-lg': true,
                                            'border-4':
                                                profile.id ===
                                                activeProfileId(),
                                            border:
                                                !profile.id ===
                                                activeProfileId(),
                                            'border-blue-500':
                                                profile.id ===
                                                activeProfileId(),
                                            'border-gray-200':
                                                !profile.id ===
                                                activeProfileId(),
                                        }}
                                    >
                                        <img
                                            src={
                                                profile.profile_picture ||
                                                'https://via.placeholder.com/100/E0E0E0/808080?text=Profile'
                                            }
                                            alt={profile.name}
                                            class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
                                        />
                                        <h3 class="text-xl font-semibold text-gray-900 mb-1">
                                            {profile.name}
                                        </h3>
                                        <p class="text-blue-600 mb-2">
                                            {profile.specialization}
                                        </p>
                                        <div class="flex items-center justify-center mb-3">
                                            <StarRating
                                                rating={profile.overall_rating}
                                            />
                                            <span class="text-gray-700 text-sm font-semibold">
                                                {profile.overall_rating.toFixed(
                                                    1
                                                )}
                                            </span>
                                            <span class="text-gray-500 text-xs ml-1">
                                                ({profile.total_reviews})
                                            </span>
                                        </div>
                                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {profile.bio}
                                        </p>
                                        <Show
                                            when={
                                                profile.id === activeProfileId()
                                            }
                                        >
                                            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
                                                Active Profile
                                            </span>
                                        </Show>
                                        <div class="flex flex-wrap justify-center gap-3 mt-auto w-full">
                                            {/* In a real SolidJS app, you'd use a router link if navigating within the SPA */}
                                            <button
                                                onClick={() =>
                                                    openViewModal(profile.id)
                                                }
                                                // href={`/provider_profile/${profile.id}`}
                                                class="flex-1 min-w-[100px] bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-md hover:bg-gray-300 text-center"
                                            >
                                                View Profile
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openEditModal(profile.id)
                                                }
                                                class="flex-1 min-w-[100px] bg-yellow-500 text-white text-sm py-2 px-3 rounded-md hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    openDeleteListing(
                                                        profile.id
                                                    )
                                                }
                                                class="flex-1 min-w-[100px] bg-red-500 text-white text-sm py-2 px-3 rounded-md hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            {profile.id !==
                                                activeProfileId() && (
                                                <button
                                                    onClick={() =>
                                                        setActiveProfile(
                                                            profile.id
                                                        )
                                                    }
                                                    class="flex-1 min-w-[100px] bg-blue-500 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-600"
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            }}
                        </For>
                    </Show>
                </div>
            </section>
        </div>
    );
};

const Overlay: Component = () => {
    return (
        <div class={css_module.loading_overlay}>
            <svg class={css_module.loading_spinner} viewBox="0 0 50 50">
                <circle
                    class="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke-width="5"
                ></circle>
            </svg>
        </div>
    );
};
