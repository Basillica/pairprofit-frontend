import {
    Accessor,
    Component,
    createSignal,
    For,
    Match,
    Resource,
    Switch,
} from 'solid-js';
import css_module from './style.module.css';
import { ListingPayload } from '../../../models/listing';
import {
    Pagination,
    ServiceRequestDetails,
    EditServiceRequestForm,
    DeleteItemModal,
    NotificationBar,
} from '../../../components';
import { authService } from '../../../oauth/manager';
import { ListingApiHandler } from '../../../api/backend/listing';
import { useAppContext } from '../../../state';
import { BucketAPIHandler } from '../../../api/supabase';

export const ServiceListingA: Component<{
    categories: Accessor<{
        [key: string]: string[];
    }>;
    listings: Resource<ListingPayload[]>;
    listingsCount: Accessor<number>;
    handlePageChange: (offset: number, limit: number) => void;
}> = (props) => {
    const [currentListing, setCurrentListing] = createSignal<ListingPayload>();
    const [viewListing, setViewListing] = createSignal(false);
    const [editListing, setEditListing] = createSignal(false);
    const [deleteListings, setDeleteListing] = createSignal(false);
    const [currentPage, setCurrentPage] = createSignal(1);
    const { notification } = useAppContext();
    const [authUser] = createSignal(authService.getAuthUser());
    const NUMBER_OF_ITEMS_PER_PAGE = 20;

    const openListing = (listingID: string) => {
        setCurrentListing(
            props.listings.latest!.find((el) => el.id === listingID)!
        );
        setViewListing(true);
    };

    const openEditListing = (listingID: string) => {
        setCurrentListing(
            props.listings.latest!.find((el) => el.id === listingID)!
        );
        setEditListing(true);
    };

    const openDeleteListing = (listingID: string) => {
        setCurrentListing(
            props.listings.latest!.find((el) => el.id === listingID)!
        );
        setDeleteListing(true);
    };

    const deleteListing = async () => {
        const listingApi = new ListingApiHandler();
        const bucketApi = new BucketAPIHandler();
        const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;

        if (currentListing()?.attachments!.length! > 0) {
            const deletePromises = currentListing()?.attachments!.map(
                async (element) => {
                    const filePathInBucket = element.url.replace(
                        `${project_url}/storage/v1/object/public/listings/`,
                        ''
                    );

                    console.log(`Deleting: ${filePathInBucket}`);
                    const result = await bucketApi.deleteFile('listings', [
                        filePathInBucket,
                    ]);
                    return result;
                }
            );
            await Promise.all(deletePromises!);
            console.log('Dangling images deletion process completed.');
        }

        const result = await listingApi.deleteListing(currentListing()?.id!);
        if (result.success) {
            notification.showAppNotification(
                'success',
                `the listing has been successfully deleted`
            );
        } else {
            notification.showAppNotification(
                'error',
                `the listing could not be deleted`
            );
        }
        setDeleteListing(false);
    };

    const getFileIcon = (filename: string) => {
        const ext = filename.split('/').pop()!.toLowerCase();
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
                return 'fa-solid fa-image';
            case 'pdf':
                return 'fa-solid fa-file-pdf';
            case 'doc':
            case 'docx':
                return 'fa-solid fa-file-word';
            case 'xls':
            case 'xlsx':
                return 'fa-solid fa-file-excel';
            case 'ppt':
            case 'pptx':
                return 'fa-solid fa-file-powerpoint';
            case 'zip':
            case 'rar':
            case '7z':
                return 'fa-solid fa-file-archive';
            case 'txt':
                return 'fa-solid fa-file-alt';
            case 'json':
            case 'js':
            case 'html':
            case 'css':
                return 'fa-solid fa-file-code';
            case 'csv':
                return 'fa-solid fa-file-csv';
            case 'mp3':
            case 'wav':
                return 'fa-solid fa-file-audio';
            case 'mp4':
            case 'mov':
                return 'fa-solid fa-file-video';
            default:
                return 'fa-solid fa-file';
        }
    };

    const filterAttachments = (
        attachments: {
            type: string;
            url: string;
            name: string;
        }[]
    ) => {
        if (!Array.isArray(attachments)) {
            console.error('Input must be an array of attachments.');
            return [];
        }
        return attachments.filter((attachment) => attachment.url !== '');
    };

    return (
        <div class="flex flex-wrap">
            <ServiceRequestDetails
                isOpen={viewListing}
                listing={currentListing}
                closeModel={setViewListing}
            />

            <EditServiceRequestForm
                isOpen={editListing}
                listing={currentListing}
                closeModal={setEditListing}
                authUser={authUser}
            />

            <DeleteItemModal
                isOpen={deleteListings}
                continueDeletion={setDeleteListing}
                deleteListing={deleteListing}
            />

            <NotificationBar
                type={notification.notificationType}
                message={notification.notificationMessage}
                duration={4000}
            />
            <For each={props.listings.latest}>
                {(service) => (
                    <div class="md:w-6/12 px-2 lg:w-2/10 mb-2">
                        <div class={css_module.listing_card}>
                            <div class="p-5 pb-2 relative">
                                <div class="absolute top-4 right-4 flex space-x-2">
                                    {service.creator_id === authUser()?.id && (
                                        <button
                                            class={css_module.edit_button}
                                            aria-label="Edit listing"
                                            onClick={() =>
                                                openEditListing(service.id)
                                            }
                                        >
                                            <i class="fas fa-edit text-base"></i>
                                        </button>
                                    )}

                                    {service.creator_id === authUser()?.id && (
                                        <button
                                            class={css_module.delete_button}
                                            aria-label="Delete listing"
                                            onClick={() =>
                                                openDeleteListing(service.id)
                                            }
                                        >
                                            <i class="fas fa-trash-alt text-base"></i>
                                        </button>
                                    )}
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight pr-14">
                                    {service.sub_category} Request
                                </h3>
                                <p class="text-sm text-gray-600 mb-3">
                                    {service.category} &bull;{' '}
                                    {service.sub_category}
                                </p>
                                <div class="flex items-center text-gray-700 text-sm mb-4">
                                    <i
                                        class={`fas fa-map-marker-alt ${css_module.detail_icon}`}
                                    ></i>
                                    <span>
                                        {service.location_city},{' '}
                                        {service.location_country}
                                    </span>
                                </div>
                            </div>

                            <div class="p-5 pt-2 border-t border-gray-200 flex-grow">
                                <p class="text-2xl font-extrabold text-blue-600 mb-4 card-price">
                                    {service.price < 1
                                        ? `Negotiable`
                                        : `${service.price}/Hour`}
                                </p>
                                <p class="text-sm text-gray-700 leading-relaxed mb-4 card-description">
                                    {service.description}
                                </p>
                                <p class="text-sm text-gray-400 leading-relaxed mb-4 card-description">
                                    <b>Attachments</b>
                                </p>
                                <div
                                    class={`${css_module.attachment_container} flex flex-wrap gap-2 mb-1`}
                                >
                                    {service.attachments.length > 0 && (
                                        <For
                                            each={filterAttachments(
                                                service.attachments
                                            )}
                                        >
                                            {(attachment) => (
                                                <a
                                                    href={`${attachment.url}`}
                                                    target="_blank"
                                                    class={`${css_module.attachment_link}`}
                                                >
                                                    <i
                                                        class={`${getFileIcon(
                                                            attachment.type
                                                        )}`}
                                                    ></i>
                                                    <span>
                                                        {attachment.name
                                                            .length > 40
                                                            ? `${attachment.name.slice(
                                                                  0,
                                                                  40
                                                              )}...`
                                                            : attachment.name}
                                                    </span>
                                                </a>
                                            )}
                                        </For>
                                    )}
                                </div>
                            </div>

                            <div class="p-5 pt-2 border-t border-gray-200 flex flex-wrap justify-between items-center text-sm text-gray-600 gap-2">
                                <div class="flex items-center gap-2 flex-grow">
                                    <Switch
                                        fallback={
                                            <i class="fa-solid fa-arrow-up"></i>
                                        }
                                    >
                                        <Match
                                            when={service.urgency === 'High'}
                                        >
                                            <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md font-semibold text-xs whitespace-nowrap">
                                                Urgent
                                            </span>
                                        </Match>
                                        <Match
                                            when={service.urgency === 'Medium'}
                                        >
                                            <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded-md font-semibold text-xs whitespace-nowrap">
                                                {service.urgency}
                                            </span>
                                        </Match>
                                        <Match when={service.urgency === 'Low'}>
                                            <span class="bg-green-200 text-green-800 px-2 py-1 rounded-md font-semibold text-xs whitespace-nowrap">
                                                Flexible
                                            </span>
                                        </Match>
                                    </Switch>
                                </div>
                                <button
                                    onClick={() => openListing(service.id)}
                                    class={`${css_module.submit_button}`}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </For>

            <div
                style={{
                    width: '100%',
                    left: '50%',
                    'flex-shrink': 0,
                    color: '#ecf0f1',
                    padding: '0.1rem 0',
                }}
            >
                <Pagination
                    itemsPerPage={NUMBER_OF_ITEMS_PER_PAGE}
                    totalItems={props.listingsCount()}
                    onPageChange={props.handlePageChange}
                    initialPage={1}
                    maxPagesToShow={5}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ServiceListingA;
