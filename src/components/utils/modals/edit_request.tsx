import {
  createSignal,
  For,
  Show,
  Component,
  Accessor,
  Setter,
  onMount,
  createEffect,
} from "solid-js";
import { Portal } from "solid-js/web";
import modal_styles from "./style.module.css";
import { SecureLocalStorage } from "../../../lib/localstore";
import { PublicHandler } from "../../../api";
import { authService } from "../../../oauth/manager";
import { useNavigate } from "@solidjs/router";
import { ListingApiHandler } from "../../../api/backend/listing";
import { UserModel } from "../../../models/auth";
import { LoadingAnimation } from "../../../lib/lottie";
import { ListingPayload, UrgencyType } from "../../../models/listing";
import { PreviewImages } from "./preview_images";
import { BucketAPIHandler } from "../../../api/supabase";

interface NewListingForm {
  serviceCategory: string;
  serviceSubCategory: string;
  requestTitle: string;
  requestDescription: string;
  locationStreet: string;
  locationCity: string;
  locationPostalCode: string;
  locationCountry: string;
  specificLocationDetails: string;
  desiredTimeline: string;
  specificDateTime: string;
  estimatedBudget: string;
  additionalNotes: string;
  contactMethod: string;
  urgency: string;
  agreeTerms: boolean;
  isNegotiable: boolean;
  desiredTimeLine: string;
}

interface ImageProps {
  type: string;
  url: string;
  name: string;
}

export const EditServiceRequestForm: Component<{
  isOpen: Accessor<boolean>;
  closeModal: Setter<boolean>;
  listing: Accessor<ListingPayload | undefined>;
  authUser: Accessor<UserModel | null>;
}> = (props) => {
  const [formData, setFormData] = createSignal<NewListingForm>({
    serviceCategory: props.listing()?.category!,
    serviceSubCategory: props.listing()?.sub_category!,
    requestTitle: props.listing()?.title!,
    requestDescription: props.listing()?.description!,
    locationStreet: props.listing()?.location_street!,
    locationCity: props.listing()?.location_city!,
    locationPostalCode: props.listing()?.location_postal_code!,
    locationCountry: props.listing()?.location_country!,
    specificLocationDetails: props.listing()?.specific_location_details!,
    desiredTimeline: props.listing()?.desired_timeline!,
    specificDateTime: props.listing()?.specific_date_time!,
    estimatedBudget: props.listing()?.estimated_budget!.toString()!,
    additionalNotes: props.listing()?.additional_notes!,
    contactMethod: props.listing()?.contact_method!,
    urgency: props.listing()?.urgency!,
    agreeTerms: false,
    isNegotiable: props.listing()?.is_negotiable!,
    desiredTimeLine: props.listing()?.desired_timeline!,
  });

  const [uploadedFiles, setUploadedFiles] = createSignal<
    { file: File; previewUrl: string; mimeType: string }[]
  >([]);

  const [attachments, setAttachments] = createSignal<ImageProps[]>();

  const handleRemoveImage = (name: string) => {
    const newAttachments = attachments()?.filter((el) => el.name !== name);
    let att: ImageProps[] = [];

    newAttachments!.map((el) => {
      att.push({
        url: el.url,
        type: el.type,
        name: el.name,
      });
    });
    setAttachments(att);
  };

  const makeUniqueByUrl = (arr: ImageProps[]) => {
    const seenUrls = new Set();
    return arr.filter((item) => {
      if (!seenUrls.has(item.url)) {
        seenUrls.add(item.url);
        return true; // Keep this item
      }
      return false; // Discard this item (duplicate URL)
    });
  };

  const imagesToBeDeleted = (
    originalArray: ImageProps[],
    modifiedArray: ImageProps[]
  ) => {
    // Create a Set of URLs from arrayB for efficient lookups.
    // This allows O(1) average time complexity for checking existence.
    const urlsInB = new Set(modifiedArray.map((item) => item.url));

    // Filter arrayA: keep items whose URL is NOT found in urlsInB
    const itemsToDelete = originalArray.filter((item) => {
      return !urlsInB.has(item.url);
    });

    return itemsToDelete;
  };

  createEffect(() => {
    if (props.listing() && !formData().serviceCategory) {
      let attachments: ImageProps[] = [];

      props.listing()?.attachments!.map((el) => {
        attachments.push({
          url: el.url,
          type: el.type,
          name: el.name,
        });
      });

      setAttachments(attachments);

      setFormData({
        serviceCategory: props.listing()?.category!,
        serviceSubCategory: props.listing()?.sub_category!,
        requestTitle: props.listing()?.request_title!,
        requestDescription: props.listing()?.request_description!,
        locationStreet: props.listing()?.location_street!,
        locationCity: props.listing()?.location_city!,
        locationPostalCode: props.listing()?.location_postal_code!,
        locationCountry: props.listing()?.location_country!,
        specificLocationDetails: props.listing()?.specific_location_details!,
        desiredTimeline: props.listing()?.desired_timeline!,
        specificDateTime: props.listing()?.specific_date_time! ?? "", // new Date().toISOString(),
        estimatedBudget: props.listing()?.estimated_budget!.toString()!,
        additionalNotes: props.listing()?.additional_notes!,
        contactMethod: props.listing()?.contact_method!,
        urgency: props.listing()?.urgency!,
        agreeTerms: false,
        isNegotiable: props.listing()?.is_negotiable!,
        desiredTimeLine: props.listing()?.desired_timeline!,
        id: props.listing()?.id!,
      });
    }
  });

  const navigate = useNavigate();
  const [apiCategories, setApiCategories] = createSignal<{
    [key: string]: string[];
  }>({});
  const [isLoading, setIsLoading] = createSignal(false);

  const handleTextArea = (
    e: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  onMount(async () => {
    if (!authService.isAuthValid()) {
      navigate("/login");
      return;
    }

    let cachedCategores = SecureLocalStorage.getItem<{
      [key: string]: string[];
    }>("x-pairprofit-categories");
    if (cachedCategores) {
      setApiCategories(cachedCategores);
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
      } else {
        console.error("API response for categories was not an object:", res);
        setApiCategories({});
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setApiCategories({});
    }
  });

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (
    e: InputEvent & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const files: File[] = Array.from(e.target.files!);
    const currentFiles: { file: File; previewUrl: string }[] = uploadedFiles();

    if (currentFiles.length + files.length + attachments()!.length > 5) {
      alert("You can upload a maximum of 5 files.");
      e.target.value = ""; // Clear input
      return;
    }

    const newFilesToUpload: {
      file: File;
      previewUrl: string;
      mimeType: string;
    }[] = [];
    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert(`File "${file.name}" is too large. Max 5MB per file.`);
      } else {
        newFilesToUpload.push({
          file: file,
          previewUrl: file.name,
          mimeType: file.type,
        });
      }
    });

    setUploadedFiles((prev) => [...prev, ...newFilesToUpload]);
    e.target.value = "";
  };

  const removeFile = (fileNameToRemove: string) => {
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter(
        (item) => item.file.name !== fileNameToRemove
      );
      // Revoke Object URLs to free memory
      prev.forEach((item) => {
        if (item.file.name === fileNameToRemove && item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return updatedFiles;
    });
  };

  const slugify = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = SecureLocalStorage.getItem<UserModel>("x-auth-user-model");
    if (!user) return;

    // start the process
    setIsLoading(true);

    const listingApi = new ListingApiHandler();
    const bucketApi = new BucketAPIHandler();
    const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;

    // --- 1. Prepare Base Payload ---
    // Destructuring and clearer variable names for readability
    const currentListing = props.listing()!; // Get current listing once
    const currentFormData = formData(); // Get form data once

    // Ensure we have a valid ID and title from the original listing
    if (
      !currentListing?.id ||
      !currentListing?.title ||
      !currentListing?.created_at
    ) {
      console.error(
        "Missing critical listing data (id, title, created_at). Aborting."
      );
      setIsLoading(false);
      return;
    }

    const payload = {
      id: currentListing.id,
      title: currentListing.title,
      created_at: currentListing.created_at,
      updated_at: new Date().toISOString(),
      // Form Data Mapped
      location: currentFormData.locationCity,
      description: `Request for the services in the ${currentFormData.serviceCategory} and ${currentFormData.serviceSubCategory} fields`,
      price: currentFormData.isNegotiable
        ? 0.0
        : Number(currentFormData.estimatedBudget),
      longitude: 0.0,
      latitude: 0.0,
      is_negotiable: currentFormData.isNegotiable,
      urgency: currentFormData.urgency,
      customer_name: user.firstname,
      request_title: currentFormData.requestTitle,
      category: currentFormData.serviceCategory,
      sub_category: currentFormData.serviceSubCategory,
      request_description: currentFormData.requestDescription,
      location_street: currentFormData.locationStreet,
      location_city: currentFormData.locationCity,
      location_postal_code: currentFormData.locationPostalCode,
      location_country: currentFormData.locationCountry,
      specific_location_details: currentFormData.specificLocationDetails,
      desired_timeline: currentFormData.desiredTimeline as UrgencyType,
      estimated_budget: currentFormData.isNegotiable
        ? 0.0
        : Number(currentFormData.estimatedBudget),
      additional_notes: currentFormData.additionalNotes,
      contact_method: currentFormData.contactMethod,
      specific_date_time: currentFormData.specificDateTime,
      creator_id: user.id,
      scope: user.scope,

      // Attachments will be built dynamically
      // attachments: props.listing()?.attachments!,
      attachments: [] as ImageProps[], // Initialize as empty array
    };

    try {
      // --- 2. Handle File Uploads (New Attachments) ---
      const newFilesToUpload = uploadedFiles();
      const uploadPromises = newFilesToUpload.map(async (element) => {
        const filePath = `${slugify(currentFormData.serviceCategory)}/${slugify(
          currentFormData.serviceSubCategory
        )}/${element.previewUrl}`;

        const file_url_path = await bucketApi.uploadFile(
          "listings",
          filePath,
          element.file
        );

        if (file_url_path) {
          return {
            type: element.mimeType,
            url: `${project_url}/storage/v1/object/public/listings/${file_url_path}`,
            name: element.previewUrl,
          } as ImageProps;
        }
        return null;
      });

      // Await all new file uploads
      const newUploadedAttachments = (await Promise.all(uploadPromises)).filter(
        Boolean
      ) as ImageProps[];
      // Add newly uploaded attachments to payload.attachments
      payload.attachments.push(...newUploadedAttachments);

      // --- 3. Consolidate Kept Attachments ---
      // 'attachments()' should represent the files the user wants to keep from existing ones,
      // and any new ones are handled by newUploadedAttachments.
      // So, we add the attachments from `attachments()` (which likely already includes retained old ones)
      // and then deduplicate everything.
      const keptExistingAttachments = attachments()! || []; // Handle potential null/undefined
      payload.attachments.push(...keptExistingAttachments);

      // Make sure all attachments (newly uploaded + kept existing) are unique by URL
      payload.attachments = makeUniqueByUrl(payload.attachments);

      // --- 4. Identify and Delete Old Images ---
      // We need the original attachments that were loaded when the form opened.
      const originalAttachments: ImageProps[] =
        currentListing.attachments || [];

      // Find attachments that are in originalAttachments but NOT in the final payload.attachments
      const imagesToDelete = imagesToBeDeleted(
        originalAttachments,
        payload.attachments
      );

      if (imagesToDelete.length > 0) {
        console.log("Images to delete from storage:", imagesToDelete);
        const deletePromises = imagesToDelete.map(async (element) => {
          // Extract the path relative to the bucket, e.g., 'listings/category/subcategory/A.png'
          const filePathInBucket = element.url.replace(
            `${project_url}/storage/v1/object/public/listings/`,
            ""
          );

          console.log(`Deleting: ${filePathInBucket}`);
          const result = await bucketApi.deleteFile("listings", [
            filePathInBucket,
          ]);
          return result;
        });

        await Promise.all(deletePromises);
        console.log("Dangling images deletion process completed.");
      }

      // --- 5. Handle Listing Update ---
      const result = await listingApi.editListing(payload.id, payload);

      if (result.success) {
        props.closeModal(false);
      } else {
        console.error("Failed to update listing:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    props.closeModal(false);
  };

  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div
          classList={{ "modal-overlay": true, active: props.isOpen() }}
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
        >
          <div class={modal_styles.modal_content}>
            <span class={modal_styles.modal_close_button} onClick={handleClose}>
              &times;
            </span>
            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Edit a Service Request
            </h1>
            <p class="text-gray-600 text-center mb-8">
              Tell us what kind of assistance you need. Artisans will see your
              request and can reach out to offer their services!
            </p>

            {isLoading() ? (
              <div style={"width: 90px; height: 90px"}>
                <LoadingAnimation />
              </div>
            ) : (
              <form onSubmit={handleSubmit} class="space-y-6">
                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    1. What do you need assistance with?
                  </h2>

                  <div class="bg-blue-50 border border-green-600 p-4 rounded-md mb-4">
                    <p class="text-blue-800 font-medium">
                      <span class="font-semibold">
                        ℹ️ Here you will need to provide basic information about
                        the service you are looking for
                      </span>
                    </p>
                    <p class="text-gray-700 text-sm mt-2">
                      Provide a category and subcategory to give artisans more
                      context about what you need
                    </p>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label
                        for="serviceCategory"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service Category
                      </label>
                      <DropDown
                        values={Object.keys(apiCategories())}
                        handleSelect={handleSelect}
                        title="Select a category"
                        name="serviceCategory"
                        currentValue={props.listing()?.category!}
                      />
                    </div>

                    <div>
                      <label
                        for="serviceSubCategory"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service Subcategory
                      </label>
                      <DropDown
                        values={apiCategories()[formData().serviceCategory]}
                        handleSelect={handleSelect}
                        title="Select a subcategory"
                        name="serviceSubCategory"
                        currentValue={props.listing()?.sub_category! ?? ""}
                      />
                    </div>
                  </div>
                  {/* </div> */}

                  <div>
                    <label
                      for="requestTitle"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Request Title / Headline
                    </label>
                    <input
                      type="text"
                      name="requestTitle"
                      id="requestTitle"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Broken car on A9, Leaky faucet in bathroom"
                      value={formData().requestTitle}
                      onInput={(e) => handleInputChange(e)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="requestDescription"
                      class="block text-sm font-medium text-gray-700 pt-5"
                    >
                      Detailed Description of Your Need
                    </label>
                    <textarea
                      name="requestDescription"
                      id="requestDescription"
                      rows="6"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Provide as much detail as possible: What's the problem? What have you tried? Any specific requirements?"
                      value={formData().requestDescription}
                      onInput={(e) => handleTextArea(e)}
                      required
                    ></textarea>
                  </div>
                </section>

                {/* location */}
                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    2. Where and when do you need this done?
                  </h2>

                  <div class="bg-green-50 border border-gray-600 p-4 rounded-md mb-4">
                    <p class="text-blue-800 font-medium">
                      <span class="font-semibold">
                        ℹ️ Provide information about the location where the
                        service is needed
                      </span>
                    </p>
                    <p class="text-blue-700 text-sm mt-2">
                      This will help us match you with artisans closest to you
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label
                        for="locationStreet"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Street Address / General Area
                      </label>
                      <input
                        type="text"
                        name="locationStreet"
                        id="locationStreet"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Example Str. 123, or 'Near Central Station'"
                        value={formData().locationStreet}
                        onInput={(e) => handleInputChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="locationCity"
                        class="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="locationCity"
                        id="locationCity"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formData().locationCity}
                        onInput={(e) => handleInputChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="locationPostalCode"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="locationPostalCode"
                        id="locationPostalCode"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., 90402"
                        value={formData().locationPostalCode}
                        onInput={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="locationCountry"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="locationCountry"
                        id="locationCountry"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formData().locationCountry}
                        onInput={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="specificLocationDetails"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Specific Location Details (Optional)
                    </label>
                    <textarea
                      name="specificLocationDetails"
                      id="specificLocationDetails"
                      rows="3"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 'Car is on the shoulder of A9, northbound, at kilometer mark 150', 'Apt 3B on the 2nd floor'"
                      value={
                        formData().specificLocationDetails !== "undefined"
                          ? formData().specificLocationDetails
                          : ""
                      }
                      onInput={(e) => handleTextArea(e)}
                    ></textarea>
                  </div>

                  <div class="mt-6">
                    <label
                      for="desiredTimeline"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Desired Timeline / Urgency
                    </label>
                    <select
                      id="desiredTimeline"
                      name="desiredTimeline"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={formData().desiredTimeline}
                      onInput={(e) => handleSelect(e)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="IMMEDIATE">Immediately / Emergency</option>
                      <option value="24h">Within 24 hours</option>
                      <option value="FEW_DAYS">Within a few days</option>
                      <option value="NEXT_WEEK">Within the next week</option>
                      <option value="FLEXIBLE">
                        Flexible / Any time convenient
                      </option>
                      <option value="SPECIFIC_DATE">
                        I have a specific date/time (please specify below)
                      </option>
                    </select>
                  </div>

                  <Show when={formData().desiredTimeline === "SPECIFIC_DATE"}>
                    <div id="specificDateTimeContainer" class="mt-4">
                      <label
                        for="specificDateTime"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Specific Date and Time
                      </label>
                      <input
                        type="datetime-local"
                        name="specificDateTime"
                        id="specificDateTime"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={formData().specificDateTime}
                        onInput={handleInputChange}
                        required={
                          formData().desiredTimeline === "specific_date"
                        } // Required only when visible
                      />
                    </div>
                  </Show>
                </section>

                {/* budget */}
                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    3. Budget & Additional Information
                  </h2>

                  <div class="bg-blue-50 border border-green-600 p-4 rounded-md mb-4">
                    <p class="text-blue-800 font-medium">
                      <span class="font-semibold">
                        ℹ️ Specify what your budget would be
                      </span>
                    </p>
                    <p class="text-gray-700 text-sm mt-2">
                      You can also make it negptiable and speak with the artisan
                      about it later
                    </p>
                  </div>
                  <div>
                    <label
                      for="estimatedBudget"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="number"
                      name="estimatedBudget"
                      id="estimatedBudget"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 200 (EUR)"
                      min="0"
                      value={formData().estimatedBudget}
                      onInput={handleInputChange}
                      style={`${
                        formData().isNegotiable
                          ? "pointer-events: none; opacity: 0.4;"
                          : ""
                      }`}
                    />
                    <p class="mt-2 text-sm text-gray-500">
                      Providing a budget helps artisans understand your
                      expectations and propose suitable solutions.
                    </p>
                    <div class="flex items-center pt-2">
                      <input
                        id="isNegotiable"
                        name="isNegotiable"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().isNegotiable}
                        onInput={(e) =>
                          setFormData({
                            ...formData(),
                            isNegotiable: e.currentTarget.checked,
                          })
                        }
                        required
                      />
                      <label
                        for="isNegotiable"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Negotiable
                      </label>
                    </div>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    4. File Attachment
                  </h2>

                  <div class="mt-6">
                    <label
                      for="attachments"
                      class="block text-sm font-medium text-gray-700 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 hover:border-blue-400 transition-colors duration-200 cursor-pointer"
                    >
                      Attachments (Photos, Documents - Optional)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p class="mt-2">
                        Drag and drop files here, or{" "}
                        <span class="text-blue-600 font-medium">
                          click to upload
                        </span>
                      </p>
                    </label>
                    <input
                      type="file"
                      name="attachments"
                      id="attachments"
                      multiple
                      accept="image/*, .pdf, .doc, .docx"
                      class="hidden"
                      onInput={(e) => handleFileChange(e)}
                    />

                    <p class="mt-2 text-xs text-gray-500">
                      Max 5 files. JPG, PNG, PDF, DOCX allowed. Max 5MB per
                      file.
                    </p>

                    <div
                      id="imagePreviewContainer"
                      class="image-preview-container"
                    >
                      <For each={uploadedFiles()}>
                        {(item) => (
                          <div
                            class={modal_styles.image_preview}
                            data-file-name={item.file.name}
                          >
                            <Show
                              when={item.previewUrl}
                              fallback={
                                <span class="text-sm text-gray-500 px-2 py-1 text-center whitespace-nowrap text-wrap ">
                                  {item.file.name}
                                </span>
                              }
                            >
                              <img src={item.previewUrl} alt="Preview" />
                            </Show>
                            <button
                              type="button"
                              class={modal_styles.remove_btn}
                              onClick={() => removeFile(item.file.name)}
                            >
                              &times;
                            </button>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>

                  <PreviewImages
                    attachments={attachments}
                    handleRemoveImage={handleRemoveImage}
                  />
                </section>

                {/* contact method */}
                <section class="pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    5. How should artisans contact you?
                  </h2>
                  <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                    <p class="text-blue-800 font-medium">
                      <span class="font-semibold">
                        ℹ️ Platform Chat is recommended
                      </span>{" "}
                      for initial contact to ensure your privacy and keep
                      communications organized.
                    </p>
                    <p class="text-blue-700 text-sm mt-2">
                      You can exchange phone numbers or emails with an artisan
                      later if you choose.
                    </p>
                  </div>
                  <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="contactChat"
                        name="contactMethod"
                        value="Platform Chat"
                        checked={formData().contactMethod === "Platform Chat"}
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onInput={handleInputChange}
                        required
                      />
                      <label
                        for="contactChat"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Platform Chat (Default & Recommended)
                      </label>
                    </div>
                    <div class="flex items-center">
                      <br />
                      <input
                        type="radio"
                        id="contactPhone"
                        name="contactMethod"
                        value="Phone Call"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().contactMethod === "Phone Call"}
                        onInput={handleInputChange}
                        required
                      />
                      <label
                        for="contactPhone"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Phone Call
                      </label>
                      <br />
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="contactEmail"
                        name="contactMethod"
                        value="Email"
                        checked={formData().contactMethod === "Email"}
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onInput={handleInputChange}
                        required
                      />
                      <label
                        for="contactEmail"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Email
                      </label>
                      <br />
                    </div>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    6. Extras
                  </h2>
                  <div class="mt-6 pb-5">
                    <label
                      for="additionalNotes"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Additional Notes / Preferences (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      id="additionalNotes"
                      rows="4"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 'Prefer artisans who speak English', 'Need service on a weekend', 'Must be insured'"
                      value={formData().additionalNotes}
                      onInput={(e) => handleTextArea(e)}
                    ></textarea>
                  </div>

                  <div class="bg-green-50 border border-yellow-600 p-4 rounded-md mb-4">
                    <p class="text-blue-800 font-medium">
                      <span class="font-semibold">
                        ℹ️ Here you can specify the urgency of the request:
                      </span>
                    </p>
                    <p class="text-blue-700 text-sm mt-2">
                      depending on the urgency of the request so that artisans
                      can prioritize them
                    </p>
                  </div>

                  <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="Low"
                        name="urgency"
                        value="Low"
                        checked={formData().urgency === "Low"}
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onInput={handleInputChange}
                        required
                      />
                      <label for="Low" class="ml-2 block text-sm text-gray-900">
                        Low
                      </label>
                    </div>
                    <div class="flex items-center">
                      <br />
                      <input
                        type="radio"
                        id="Medium"
                        name="urgency"
                        value="Medium"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().urgency === "Medium"}
                        onInput={handleInputChange}
                        required
                      />
                      <label
                        for="Medium"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Medium
                      </label>
                      <br />
                    </div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="High"
                        name="urgency"
                        value="High"
                        checked={formData().urgency === "High"}
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onInput={handleInputChange}
                        required
                      />
                      <label
                        for="High"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        High
                      </label>
                      <br />
                    </div>
                  </div>
                </section>
                <div class="pt-8">
                  <div class="flex items-center">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData().agreeTerms}
                      onInput={handleInputChange}
                      required
                    />
                    <label
                      for="agreeTerms"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a href="#" class="text-blue-600 hover:text-blue-500">
                        Customer Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" class="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                </div>
                <div
                  class="pt-6"
                  style={`${
                    !formData().agreeTerms
                      ? "pointer-events: none; opacity: 0.4;"
                      : ""
                  }`}
                >
                  <button
                    // disabled={formData().agreeTerms}
                    type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    // onClick={() => handleSubmit}
                  >
                    Post My Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Show>
    </Portal>
  );
};

const DropDown: Component<{
  values: string[];
  handleSelect: (
    e: InputEvent & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => void;
  title: string;
  name: string;
  currentValue?: string;
}> = (props) => {
  const [currentValue, setCurrentValue] = createSignal<string>(
    props.currentValue ?? ""
  );
  const handleSelect = (
    e: InputEvent & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) => {
    e.preventDefault();
    setCurrentValue(e.currentTarget.value);
    props.handleSelect(e);
  };
  return (
    <select
      id={props.name}
      name={props.name}
      class="mt-1 block w-full pb-5 pt-5 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      value={currentValue()}
      onInput={(e) => handleSelect(e)}
      required
    >
      <option value="">{props.title}</option>
      <For each={props.values}>
        {(value, i) => (
          <option value={value} id={`option-${i()}`}>
            {value}
          </option>
        )}
      </For>
      <option value="other">Other</option>
    </select>
  );
};
