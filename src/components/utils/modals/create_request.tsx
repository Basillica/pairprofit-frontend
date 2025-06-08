import {
  createSignal,
  createEffect,
  For,
  Show,
  Component,
  Accessor,
  Setter,
} from "solid-js";
import { Portal } from "solid-js/web";
import modal_styles from "./style.module.css";

export const PostServiceRequestForm: Component<{
  isOpen: Accessor<boolean>;
  closeModal: Setter<boolean>;
}> = (props) => {
  // Form state management
  const [formData, setFormData] = createSignal({
    serviceCategory: "",
    requestTitle: "",
    requestDescription: "",
    locationStreet: "",
    locationCity: "Nuremberg", // Default to Nuremberg
    locationPostalCode: "",
    locationCountry: "Germany", // Default to Germany
    specificLocationDetails: "",
    desiredTimeline: "",
    specificDateTime: "",
    estimatedBudget: "",
    additionalNotes: "",
    contactMethod: "Platform Chat", // Default selected
    agreeTerms: false,
  });

  // State for uploaded files (stores File objects and their preview URLs)
  const [uploadedFiles, setUploadedFiles] = createSignal<
    { file: File; previewUrl: string }[]
  >([]); // { file: File, previewUrl: string }[]

  // Effect to show/hide specific date/time input based on desiredTimeline
  createEffect(() => {
    if (formData().desiredTimeline !== "specific_date") {
      //   setFormData((prev) => ({ ...prev, specificDateTime: "" }));
    }
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: any) => {
    const files: File[] = Array.from(e.target.files);
    const currentFiles: { file: File; previewUrl: string }[] = uploadedFiles();

    if (currentFiles.length + files.length > 5) {
      alert("You can upload a maximum of 5 files.");
      e.target.value = ""; // Clear input
      return;
    }

    const newFilesToUpload: any[] = [];
    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert(`File "${file.name}" is too large. Max 5MB per file.`);
      } else {
        newFilesToUpload.push({
          file: file,
          previewUrl: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null, // Only create URL for images
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Basic client-side validation
    const data = formData();
    const requiredFields: string[] = [
      "serviceCategory",
      "requestTitle",
      "requestDescription",
      "locationStreet",
      "locationCity",
      "locationPostalCode",
      "locationCountry",
      "desiredTimeline",
    ];

    // for (const field of requiredFields) {
    //   if (!data[field].trim()) {
    //     const label =
    //       document!
    //         .querySelector(`label[for="${field}"]`)
    //         ?.textContent.replace(":", "") || field;
    //     alert(`Please fill in the required field: ${label}`);
    //     document.getElementById(field)?.focus();
    //     return;
    //   }
    // }

    if (
      data.desiredTimeline === "specific_date" &&
      !data.specificDateTime.trim()
    ) {
      alert("Please specify the date and time for your request.");
      document.getElementById("specificDateTime")?.focus();
      return;
    }

    if (!data.agreeTerms) {
      alert(
        "You must agree to the Customer Terms of Service and Privacy Policy."
      );
      document.getElementById("agreeTerms")?.focus();
      return;
    }

    // Prepare FormData for submission
    const submitFormData = new FormData();
    for (const key in data) {
      if (key !== "agreeTerms") {
        // Don't send agreeTerms to backend directly
        // submitFormData.append(key, data[key]);{ file: File, previewUrl: string }[]
      }
    }

    // Append actual file objects
    uploadedFiles()!.forEach((item, index) => {
      submitFormData.append(`attachment_${index}`, item.file);
    });

    console.log("Service Request Data for Submission:");
    for (let [key, value] of submitFormData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: ${value.name} (${value.size} bytes, type: ${value.type})`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    alert(
      "Your service request has been posted successfully! (Check console for data)"
    );

    // In a real application, you would send this submitFormData to your backend API
    // Example using fetch:
    /*
    fetch('/api/service_requests', {
        method: 'POST',
        body: submitFormData // FormData automatically sets 'Content-Type': 'multipart/form-data'
    })
    .then(response => response.json())
    .then(apiResponse => {
        console.log('Success:', apiResponse);
        alert('Your service request has been posted successfully!');
        // Reset form and files
        setFormData({
            serviceCategory: '', requestTitle: '', requestDescription: '',
            locationStreet: '', locationCity: 'Nuremberg', locationPostalCode: '', locationCountry: 'Germany',
            specificLocationDetails: '', desiredTimeline: '', specificDateTime: '',
            estimatedBudget: '', additionalNotes: '', contactMethod: 'Platform Chat', agreeTerms: false,
        });
        setUploadedFiles([]);
        // Potentially redirect user or show a confirmation message
        // window.location.href = `request_confirmation.html?id=${apiResponse.requestId}`;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to post service request. Please try again.');
    });
    */
  };

  const handleClose = () => {
    props.closeModal(false);
  };

  return (
    <Portal>
      <Show when={props.isOpen()}>
        {/* Inject custom styles for image previews */}
        {/* <style>{customStyles}</style> */}

        <div
          classList={{ "modal-overlay": true, active: props.isOpen() }}
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
        >
          <div class={modal_styles.modal_content}>
            <span class={modal_styles.modal_close_button} onClick={handleClose}>
              &times;
            </span>
            <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Post a Service Request
            </h1>
            <p class="text-gray-600 text-center mb-8">
              Tell us what kind of assistance you need. Artisans will see your
              request and can reach out to offer their services!
            </p>

            <form onSubmit={handleSubmit} class="space-y-6">
              <section class="border-b border-gray-200 pb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  1. What do you need assistance with?
                </h2>

                <div>
                  <label
                    for="serviceCategory"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Service Category
                  </label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    class="mt-1 block w-full pb-5 pt-5 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={formData().serviceCategory}
                    onInput={(e) => handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="automotive">Automotive & Mechanics</option>
                    <option value="home_repair">Home Repair & Handyman</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="it_tech">IT & Tech Support</option>
                    <option value="web_design">Web Design & Development</option>
                    <option value="cleaning">Cleaning Services</option>
                    <option value="landscaping">Landscaping & Gardening</option>
                    <option value="personal_training">Personal Training</option>
                    <option value="tutoring">Tutoring & Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

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
                    onInput={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label
                    for="requestDescription"
                    class="block text-sm font-medium text-gray-700"
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
                    onInput={handleInputChange}
                    required
                  ></textarea>
                </div>
              </section>

              <section class="border-b border-gray-200 pb-6 pt-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  2. Where and when do you need this done?
                </h2>

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
                      onInput={handleInputChange}
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
                      onInput={handleInputChange}
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
                    value={formData().specificLocationDetails}
                    onInput={handleInputChange}
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
                    onInput={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="immediate">Immediately / Emergency</option>
                    <option value="24h">Within 24 hours</option>
                    <option value="few_days">Within a few days</option>
                    <option value="next_week">Within the next week</option>
                    <option value="flexible">
                      Flexible / Any time convenient
                    </option>
                    <option value="specific_date">
                      I have a specific date/time (please specify below)
                    </option>
                  </select>
                </div>

                <Show when={formData().desiredTimeline === "specific_date"}>
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
                      required={formData().desiredTimeline === "specific_date"} // Required only when visible
                    />
                  </div>
                </Show>
              </section>

              <section class="border-b border-gray-200 pb-6 pt-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  3. Budget & Additional Information
                </h2>

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
                  />
                  <p class="mt-2 text-sm text-gray-500">
                    Providing a budget helps artisans understand your
                    expectations and propose suitable solutions.
                  </p>
                </div>

                <div class="mt-6">
                  <label
                    for="attachments"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Attachments (Photos, Documents - Optional)
                  </label>
                  <input
                    type="file"
                    name="attachments"
                    id="attachments"
                    multiple
                    accept="image/*, .pdf, .doc, .docx"
                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileChange}
                  />
                  <p class="mt-2 text-xs text-gray-500">
                    Max 5 files. JPG, PNG, PDF, DOCX allowed. Max 5MB per file.
                  </p>
                  <div
                    id="imagePreviewContainer"
                    class="image-preview-container"
                  >
                    <For each={uploadedFiles()}>
                      {(item) => (
                        <div
                          class="image-preview"
                          data-file-name={item.file.name}
                        >
                          <Show
                            when={item.previewUrl}
                            fallback={
                              <span class="text-xs text-gray-500 px-2 py-1 text-center truncate w-full">
                                {item.file.name}
                              </span>
                            }
                          >
                            <img src={item.previewUrl} alt="Preview" />
                          </Show>
                          <button
                            type="button"
                            class="remove-btn"
                            onClick={() => removeFile(item.file.name)}
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </For>
                  </div>
                </div>

                <div class="mt-6">
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
                    onInput={handleInputChange}
                  ></textarea>
                </div>
              </section>

              <section class="pt-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                  4. How should artisans contact you?
                </h2>
                <div class="bg-blue-50 border border-blue-200 p-4 rounded-md mb-4">
                  <p class="text-blue-800 font-medium">
                    <span class="font-semibold">
                      Platform Chat is recommended
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
                      id="contactPlatformChat"
                      name="contactMethod"
                      type="radio"
                      value="Platform Chat"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData().contactMethod === "Platform Chat"}
                      onInput={handleInputChange}
                      required
                    />
                    <label
                      for="contactPlatformChat"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      Platform Chat (Default & Recommended)
                    </label>
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

              <div class="pt-6">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Post My Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </Show>
    </Portal>
  );
};
