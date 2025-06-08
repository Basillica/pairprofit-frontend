import { Accessor, Component, createSignal, For, Setter, Show } from "solid-js";
import { Portal } from "solid-js/web";
import modal_styles from "./style.module.css";

export const CreateProviderProfileComponent: Component<{
  isOpen: Accessor<boolean>;
  closeModal: Setter<boolean>;
}> = (props) => {
  // State for form fields
  const [fullName, setFullName] = createSignal("");
  const [specialization, setSpecialization] = createSignal("");
  const [profilePicturePreview, setProfilePicturePreview] = createSignal<
    string | undefined
  >("https://picsum.photos/200?random=2");
  const [profilePictureFile, setProfilePictureFile] = createSignal();
  const [bio, setBio] = createSignal("");
  const [baseLocation, setBaseLocation] = createSignal("");
  const [serviceRadius, setServiceRadius] = createSignal("");
  const [serviceAreas, setServiceAreas] = createSignal([""]); // Start with one empty input
  const [contactMethods, setContactMethods] = createSignal([
    "Platform Chat (Recommended)",
  ]); // Default checked
  const [businessLegalName, setBusinessLegalName] = createSignal("");
  const [businessRegistration, setBusinessRegistration] = createSignal("");
  const [yearsInBusiness, setYearsInBusiness] = createSignal("");
  const [providerSkills, setProviderSkills] = createSignal("");
  const [agreeTerms, setAgreeTerms] = createSignal(false);

  // Handler for profile picture upload
  const handleProfilePictureChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let res = e.target!.result as string;
        setProfilePicturePreview(res);
      };
      reader.readAsDataURL(file);
      setProfilePictureFile(file);
    } else {
      setProfilePicturePreview("https://picsum.photos/200?random=3");
      setProfilePictureFile(null);
    }
  };

  // Handlers for dynamic service areas
  const addServiceArea = () => {
    setServiceAreas([...serviceAreas(), ""]);
  };

  const removeServiceArea = (index: number) => {
    const updatedAreas = serviceAreas().filter((_, i) => i !== index);
    setServiceAreas(updatedAreas);
  };

  // Handler for contact methods checkboxes
  const handleContactMethodChange = (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const { value, checked } = event.target;
    if (checked) {
      setContactMethods([...contactMethods(), value]);
    } else {
      setContactMethods(contactMethods().filter((method) => method !== value));
    }
  };

  // Form submission handler
  const handleSubmit = (
    event: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    event.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!fullName() || !specialization() || !bio() || !baseLocation()) {
      alert(
        "Please fill in all required fields in the Basic Information and Location sections."
      );
      return;
    }
    if (!agreeTerms()) {
      alert(
        "You must agree to the Provider Terms of Service and Privacy Policy."
      );
      return;
    }

    const formData = {
      fullName: fullName(),
      specialization: specialization(),
      bio: bio(),
      baseLocation: baseLocation(),
      serviceRadius: serviceRadius(),
      serviceAreas: serviceAreas().filter((area) => area.trim() !== ""), // Filter out empty inputs
      contactMethods: contactMethods(),
      businessLegalName: businessLegalName(),
      businessRegistration: businessRegistration(),
      yearsInBusiness: yearsInBusiness(),
      providerSkills: providerSkills()
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""), // Split and clean skills
      profilePictureFile: profilePictureFile(), // The File object itself
    };

    console.log("Provider Profile Data:", formData);
    alert("Provider Profile created successfully! (Check console for data)");
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
            <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
              <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
                Create Your Service Provider Profile
              </h1>
              <p class="text-gray-600 text-center mb-8">
                Tell us about yourself and your services. This profile will help
                customers find and trust you!
              </p>

              <form onSubmit={handleSubmit} class="space-y-6">
                <section class="border-b border-gray-200 pb-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    1. Basic Information
                  </h2>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        for="providerFullName"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        name="providerFullName"
                        id="providerFullName"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., John Doe"
                        value={fullName()}
                        onInput={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="providerSpecialization"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Your Main Specialization/Profession
                      </label>
                      <input
                        type="text"
                        name="providerSpecialization"
                        id="providerSpecialization"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Expert Carpenter, Freelance Web Developer"
                        value={specialization()}
                        onInput={(e) => setSpecialization(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-6">
                    <label
                      for="profilePictureUpload"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Profile Picture
                    </label>
                    <div class="mt-1 flex items-center space-x-4">
                      <img
                        src={
                          profilePicturePreview() !== null
                            ? profilePicturePreview()
                            : ""
                        }
                        alt="Profile Preview"
                        class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      />
                      <label
                        for="profilePictureUpload"
                        class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a photo</span>
                        <input
                          id="profilePictureUpload"
                          name="profilePicture"
                          type="file"
                          class="sr-only"
                          accept="image/*"
                          onChange={(e) => handleProfilePictureChange(e)}
                        />
                      </label>
                    </div>
                    <p class="mt-2 text-xs text-gray-500">
                      JPG, PNG, GIF up to 5MB. Recommended: square aspect ratio.
                    </p>
                  </div>

                  <div>
                    <label
                      for="providerBio"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Short Bio / About Me
                    </label>
                    <textarea
                      name="providerBio"
                      id="providerBio"
                      rows="5"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Introduce yourself, your experience, and what makes your services unique."
                      value={bio()}
                      onInput={(e) => setBio(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    2. Location & Contact
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label
                        for="baseLocation"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Your Base Location (City, Country)
                      </label>
                      <input
                        type="text"
                        name="baseLocation"
                        id="baseLocation"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., Nuremberg, Germany"
                        value={baseLocation()}
                        onInput={(e) => setBaseLocation(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="serviceRadius"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Service Radius (Optional, e.g., "50km", "Local")
                      </label>
                      <input
                        type="text"
                        name="serviceRadius"
                        id="serviceRadius"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., 20km, Region-wide"
                        value={serviceRadius()}
                        onInput={(e) => setServiceRadius(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      Specific Service Areas (Add multiple cities/regions you
                      serve)
                    </label>
                    <div id="serviceAreasContainer" class="space-y-2 mt-2">
                      <For each={serviceAreas()}>
                        {(area, i) => (
                          <div class="flex items-center gap-2">
                            <input
                              type="text"
                              name="serviceAreas[]"
                              class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder={
                                i() === 0 ? "e.g., Fürth" : "e.g., Another City"
                              }
                              value={area}
                              // onInput={(e) => updateServiceArea(i(), e.target.value)}
                            />
                            <Show when={serviceAreas().length > 1}>
                              <button
                                type="button"
                                onClick={() => removeServiceArea(i())}
                                class="remove-service-area-btn text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </Show>
                          </div>
                        )}
                      </For>
                    </div>
                    <button
                      type="button"
                      onClick={addServiceArea}
                      class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Service Area
                    </button>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Preferred Contact Methods for Customers
                    </label>
                    <div class="mt-2 space-y-2">
                      <div class="flex items-center">
                        <input
                          id="contactChat"
                          name="contactMethods"
                          type="checkbox"
                          value="Platform Chat (Recommended)"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={contactMethods().includes(
                            "Platform Chat (Recommended)"
                          )}
                          onChange={handleContactMethodChange}
                        />
                        <label
                          for="contactChat"
                          class="ml-2 block text-sm text-gray-900"
                        >
                          Platform Chat (Recommended)
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="contactEmail"
                          name="contactMethods"
                          type="checkbox"
                          value="Email"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={contactMethods().includes("Email")}
                          onChange={handleContactMethodChange}
                        />
                        <label
                          for="contactEmail"
                          class="ml-2 block text-sm text-gray-900"
                        >
                          Email (if selected, ensure your email is on file)
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="contactPhone"
                          name="contactMethods"
                          type="checkbox"
                          value="Phone"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={contactMethods().includes("Phone")}
                          onChange={handleContactMethodChange}
                        />
                        <label
                          for="contactPhone"
                          class="ml-2 block text-sm text-gray-900"
                        >
                          Phone (if selected, ensure your phone number is on
                          file)
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    3. Business Details (Optional)
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        for="businessLegalName"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Legal Business Name
                      </label>
                      <input
                        type="text"
                        name="businessLegalName"
                        id="businessLegalName"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., John Doe Carpentry GmbH"
                        value={businessLegalName()}
                        onInput={(e) => setBusinessLegalName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="businessRegistration"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Business Registration Number (e.g., VAT ID, Trade
                        Register)
                      </label>
                      <input
                        type="text"
                        name="businessRegistration"
                        id="businessRegistration"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g., DE123456789, HRB12345"
                        value={businessRegistration()}
                        onInput={(e) => setBusinessRegistration(e.target.value)}
                      />
                    </div>
                    <div class="col-span-full">
                      <label
                        for="yearsInBusiness"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Years in Business
                      </label>
                      <input
                        type="number"
                        name="yearsInBusiness"
                        id="yearsInBusiness"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        placeholder="e.g., 10"
                        value={yearsInBusiness()}
                        onInput={(e) => setYearsInBusiness(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    4. Your Skills
                  </h2>
                  <div>
                    <label
                      for="providerSkills"
                      class="block text-sm font-medium text-gray-700"
                    >
                      List your key skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="providerSkills"
                      id="providerSkills"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Custom Furniture, Wood Carving, Deck Building, Renovation"
                      value={providerSkills()}
                      onInput={(e) => setProviderSkills(e.target.value)}
                    />
                    <p class="mt-2 text-sm text-gray-500">
                      These skills will help customers find you when searching
                      for specific expertise.
                    </p>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    5. Your Services & Portfolio
                  </h2>
                  <div class="bg-blue-50 border border-blue-200 p-4 rounded-md">
                    <p class="text-blue-800 font-medium">
                      Once your profile is complete, you can start listing the
                      specific services you offer!
                    </p>
                    <p class="text-blue-700 text-sm mt-2">
                      Each service listing will include details like pricing,
                      availability, and description. You'll be able to link your
                      portfolio items to these listings.
                    </p>
                    <button
                      type="button"
                      class="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Your First Service Listing (After Profile Creation)
                    </button>
                  </div>
                </section>

                <section class="border-b border-gray-200 pb-6 pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    6. Ratings & Testimonials
                  </h2>
                  <div class="bg-green-50 border border-green-200 p-4 rounded-md">
                    <p class="text-green-800 font-medium">
                      Your reputation will grow as you provide excellent
                      services!
                    </p>
                    <p class="text-green-700 text-sm mt-2">
                      Customers will be able to leave ratings and reviews after
                      completing a service with you. These will automatically
                      appear on your public profile.
                    </p>
                  </div>
                </section>

                <section class="pt-6">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    7. Public Updates & Project Spotlights
                  </h2>
                  <div class="bg-purple-50 border border-purple-200 p-4 rounded-md">
                    <p class="text-purple-800 font-medium">
                      Showcase your best work and keep customers informed!
                    </p>
                    <p class="text-purple-700 text-sm mt-2">
                      After creating your profile, you'll have a dedicated
                      section to post project spotlights, important
                      announcements, or share insights about your activities.
                    </p>
                  </div>
                </section>

                <div class="pt-8">
                  <div class="flex items-center">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={agreeTerms()}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label
                      for="agreeTerms"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a href="#" class="text-blue-600 hover:text-blue-500">
                        Provider Terms of Service
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
                    Create My Provider Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Show>
    </Portal>
  );
};
