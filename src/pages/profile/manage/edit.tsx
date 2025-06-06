import {
  Component,
  createSignal,
  createEffect,
  Accessor,
  For,
  Show,
} from "solid-js";
import { ListingProfile } from "./type";
import { DynamicInputGroup } from "./input";
import { Portal } from "solid-js/web";
import modal_styles from "./style.module.css";

// Edit Profile Modal Component
export const EditProfileModal: Component<{
  show: boolean;
  editingProfile: Accessor<ListingProfile | undefined>;
  onClose: () => void;
  onSave: (updatedProfile: ListingProfile) => void;
}> = (props) => {
  let profilePictureUploadRef: any;
  let profilePicturePreviewRef: any;

  // Local state for the form fields
  const [formData, setFormData] = createSignal<ListingProfile>({
    id: "",
    fullName: "",
    specialization: "",
    profilePicture:
      "https://via.placeholder.com/100/E0E0E0/808080?text=Profile",
    overallRating: 0,
    totalReviews: 0,
    bio: "",
    baseLocation: "",
    serviceRadius: "",
    serviceAreas: [""], // Start with one empty
    contactMethods: [],
    businessLegalName: "",
    businessRegistration: "",
    yearsInBusiness: 0,
    skills: [""], // Start with one empty
  });

  // Effect to update form data when editingProfile prop changes
  createEffect(() => {
    if (props.editingProfile()) {
      const profile = props.editingProfile()!;
      setFormData({
        id: profile.id,
        fullName: profile.fullName,
        specialization: profile.specialization,
        profilePicture:
          profile.profilePicture ||
          "https://via.placeholder.com/100/E0E0E0/808080?text=Profile",
        overallRating: profile.overallRating,
        totalReviews: profile.totalReviews,
        bio: profile.bio,
        baseLocation: profile.baseLocation,
        serviceRadius: profile.serviceRadius || "",
        serviceAreas:
          profile.serviceAreas && profile.serviceAreas.length > 0
            ? [...profile.serviceAreas]
            : [""],
        contactMethods: [...profile.contactMethods],
        businessLegalName: profile.businessLegalName || "",
        businessRegistration: profile.businessRegistration || "",
        yearsInBusiness: profile.yearsInBusiness || 0,
        skills:
          profile.skills && profile.skills.length > 0
            ? [...profile.skills]
            : [""],
      });
      // Update preview immediately if the profile has a picture
      if (profilePicturePreviewRef) {
        profilePicturePreviewRef.src =
          profile.profilePicture ||
          "https://via.placeholder.com/100/E0E0E0/808080?text=Profile";
      }
    }
  });

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const methods = new Set(prev.contactMethods);
      if (checked) {
        methods.add(value);
      } else {
        methods.delete(value);
      }
      return { ...prev, contactMethods: Array.from(methods) };
    });
  };

  const handleFileChange = (
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    let files = e.target.files!;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: event.target!.result as string,
        }));
        if (profilePicturePreviewRef) {
          profilePicturePreviewRef.src = event.target!.result;
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        profilePicture:
          "https://via.placeholder.com/100/E0E0E0/808080?text=Profile",
      }));
      if (profilePicturePreviewRef) {
        profilePicturePreviewRef.src =
          "https://via.placeholder.com/100/E0E0E0/808080?text=Profile";
      }
    }
  };

  const addDynamicInput = (type: string) => {
    if (type === "serviceAreas") {
      setFormData((prev) => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, ""],
      }));
    } else if (type === "skills") {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
    }
  };

  const removeDynamicInput = (type: string, index: number) => {
    if (type === "serviceAreas") {
      setFormData((prev) => {
        const newAreas = prev.serviceAreas.filter((_, i) => i !== index);
        // Ensure there's at least one input if all are removed
        return { ...prev, serviceAreas: newAreas.length > 0 ? newAreas : [""] };
      });
    } else if (type === "skills") {
      setFormData((prev) => {
        const newSkills = prev.skills.filter((_, i) => i !== index);
        // Ensure there's at least one input if all are removed
        return { ...prev, skills: newSkills.length > 0 ? newSkills : [""] };
      });
    }
  };

  const handleSubmit = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    e.preventDefault();

    // Filter out empty dynamic inputs before submitting
    const cleanedFormData = {
      ...formData(),
      serviceAreas: formData().serviceAreas.filter(
        (area) => area.trim() !== ""
      ),
      skills: formData().skills.filter((skill) => skill.trim() !== ""),
    };

    // Handle image upload if a new file is selected
    const newProfilePicFile = profilePictureUploadRef!.files[0];
    if (newProfilePicFile) {
      // Simulate upload: In real app, this would be a real upload and update URL
      cleanedFormData.profilePicture = URL.createObjectURL(newProfilePicFile);
    }

    props.onSave(cleanedFormData); // Pass the cleaned and potentially updated data to the parent
    props.onClose(); // Close the modal
  };

  const handleClose = () => {
    props.onClose();
    // Reset form to initial state when closing
    setFormData({
      id: "",
      fullName: "",
      specialization: "",
      profilePicture:
        "https://via.placeholder.com/100/E0E0E0/808080?text=Profile",
      overallRating: 0,
      totalReviews: 0,
      bio: "",
      baseLocation: "",
      serviceRadius: "",
      serviceAreas: [""],
      contactMethods: [],
      businessLegalName: "",
      businessRegistration: "",
      yearsInBusiness: 0,
      skills: [""],
    });
    // Reset preview image to placeholder
    if (profilePicturePreviewRef) {
      profilePicturePreviewRef.src =
        "https://via.placeholder.com/100/E0E0E0/808080?text=Profile";
    }
  };

  return (
    <Portal>
      <Show when={props.show}>
        <div
          class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
          classList={{ "modal-overlay": true, active: props.show }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div class={modal_styles.modal_content}>
            <span class={modal_styles.modal_close_button} onClick={handleClose}>
              &times;
            </span>
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              Edit Service Profile
            </h2>

            <form onSubmit={(e) => handleSubmit} class="space-y-6">
              <input type="hidden" name="id" value={formData().id} />

              <section class="border-b border-gray-200 pb-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Basic Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      for="editProviderFullName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="editProviderFullName"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData().fullName}
                      onInput={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="editProviderSpecialization"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Main Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      id="editProviderSpecialization"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData().specialization}
                      onInput={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div class="mb-6">
                  <label
                    for="editProfilePictureUpload"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <div class="mt-1 flex items-center space-x-4">
                    <img
                      ref={profilePicturePreviewRef}
                      src={formData().profilePicture}
                      alt="Profile Preview"
                      class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                    <label
                      for="editProfilePictureUpload"
                      class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Change photo</span>
                      <input
                        ref={profilePictureUploadRef}
                        id="editProfilePictureUpload"
                        name="profilePicture"
                        type="file"
                        class="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    JPG, PNG, GIF up to 5MB. Recommended: square aspect ratio.
                  </p>
                </div>

                <div>
                  <label
                    for="editProviderBio"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Short Bio / About Me
                  </label>
                  <textarea
                    name="bio"
                    id="editProviderBio"
                    rows="5"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData().bio}
                    onInput={(e) => handleInputChange}
                    required
                  ></textarea>
                </div>
              </section>

              <section class="border-b border-gray-200 pb-6 pt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Location & Contact
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label
                      for="editBaseLocation"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Your Base Location (City, Country)
                    </label>
                    <input
                      type="text"
                      name="baseLocation"
                      id="editBaseLocation"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData().baseLocation}
                      onInput={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="editServiceRadius"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Service Radius (Optional)
                    </label>
                    <input
                      type="text"
                      name="serviceRadius"
                      id="editServiceRadius"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 20km, Region-wide"
                      value={formData().serviceRadius}
                      onInput={handleInputChange}
                    />
                  </div>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700">
                    Specific Service Areas
                  </label>
                  <div id="editServiceAreasContainer" class="space-y-2 mt-2">
                    <For each={formData().serviceAreas}>
                      {(area, index) => (
                        <DynamicInputGroup
                          name="serviceAreas[]"
                          placeholder="e.g., Munich"
                          value={area}
                          onInput={() => console.log()}
                          //   onInput={(e) =>
                          //     updateDynamicInput(
                          //       "serviceAreas",
                          //       index(),
                          //       e.target.value
                          //     )
                          //   }
                          onRemove={() =>
                            removeDynamicInput("serviceAreas", index())
                          }
                        />
                      )}
                    </For>
                  </div>
                  <button
                    type="button"
                    onClick={() => addDynamicInput("serviceAreas")}
                    class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Service Area
                  </button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Preferred Contact Methods
                  </label>
                  <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                      <input
                        id="editContactChat"
                        name="contactMethods"
                        type="checkbox"
                        value="Platform Chat (Recommended)"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().contactMethods.includes(
                          "Platform Chat (Recommended)"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        for="editContactChat"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Platform Chat (Recommended)
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="editContactEmail"
                        name="contactMethods"
                        type="checkbox"
                        value="Email"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().contactMethods.includes("Email")}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        for="editContactEmail"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Email
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="editContactPhone"
                        name="contactMethods"
                        type="checkbox"
                        value="Phone"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData().contactMethods.includes("Phone")}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        for="editContactPhone"
                        class="ml-2 block text-sm text-gray-900"
                      >
                        Phone
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section class="border-b border-gray-200 pb-6 pt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Business Details (Optional)
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="editBusinessLegalName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Legal Business Name
                    </label>
                    <input
                      type="text"
                      name="businessLegalName"
                      id="editBusinessLegalName"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData().businessLegalName}
                      onInput={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      for="editBusinessRegistration"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      name="businessRegistration"
                      id="editBusinessRegistration"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData().businessRegistration}
                      onInput={handleInputChange}
                    />
                  </div>
                  <div class="col-span-full">
                    <label
                      for="editYearsInBusiness"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Years in Business
                    </label>
                    <input
                      type="number"
                      name="yearsInBusiness"
                      id="editYearsInBusiness"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      min="0"
                      value={formData().yearsInBusiness}
                      onInput={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              <section class="pb-6 pt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                  Your Skills
                </h3>
                <div id="editSkillsContainer" class="space-y-2 mt-2">
                  <For each={formData().skills}>
                    {(skill, index) => (
                      <DynamicInputGroup
                        name="skills[]"
                        placeholder="e.g., Wood Carving"
                        value={skill}
                        onInput={() => console.log()}
                        // onInput={(e) =>
                        //   updateDynamicInput("skills", index(), e.target.value)
                        // }
                        onRemove={() => removeDynamicInput("skills", index())}
                      />
                    )}
                  </For>
                </div>
                <button
                  type="button"
                  onClick={() => addDynamicInput("skills")}
                  class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Skill
                </button>
                <p class="mt-2 text-sm text-gray-500">
                  These skills will help customers find you when searching for
                  specific expertise.
                </p>
              </section>

              <div class="pt-4">
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </Show>
    </Portal>
  );
};
