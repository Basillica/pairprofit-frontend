import {
    Component,
    createSignal,
    createEffect,
    Accessor,
    For,
    Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import modal_styles from './style.module.css';
import {
    ArtisanModel,
    OfferedService,
    PublicUpdate,
    Testimonial,
} from '../../../models/profile';

// // Edit Profile Modal Component
// export const EditProfileModal: Component<{
//     show: boolean;
//     editingProfile: Accessor<ListingProfile | undefined>;
//     onClose: () => void;
//     onSave: (updatedProfile: ListingProfile) => void;
// }> = (props) => {
//     let profilePictureUploadRef: any;
//     let profilePicturePreviewRef: any;

//     // Local state for the form fields
//     const [formData, setFormData] = createSignal<ListingProfile>({
//         id: '',
//         fullName: '',
//         specialization: '',
//         profilePicture:
//             'https://via.placeholder.com/100/E0E0E0/808080?text=Profile',
//         overallRating: 0,
//         totalReviews: 0,
//         bio: '',
//         baseLocation: '',
//         serviceRadius: '',
//         serviceAreas: [''], // Start with one empty
//         contactMethods: [],
//         businessLegalName: '',
//         businessRegistration: '',
//         yearsInBusiness: 0,
//         skills: [''], // Start with one empty
//     });

//     // Effect to update form data when editingProfile prop changes
//     createEffect(() => {
//         if (props.editingProfile()) {
//             const profile = props.editingProfile()!;
//             setFormData({
//                 id: profile.id,
//                 fullName: profile.fullName,
//                 specialization: profile.specialization,
//                 profilePicture:
//                     profile.profilePicture ||
//                     'https://via.placeholder.com/100/E0E0E0/808080?text=Profile',
//                 overallRating: profile.overallRating,
//                 totalReviews: profile.totalReviews,
//                 bio: profile.bio,
//                 baseLocation: profile.baseLocation,
//                 serviceRadius: profile.serviceRadius || '',
//                 serviceAreas:
//                     profile.serviceAreas && profile.serviceAreas.length > 0
//                         ? [...profile.serviceAreas]
//                         : [''],
//                 contactMethods: [...profile.contactMethods],
//                 businessLegalName: profile.businessLegalName || '',
//                 businessRegistration: profile.businessRegistration || '',
//                 yearsInBusiness: profile.yearsInBusiness || 0,
//                 skills:
//                     profile.skills && profile.skills.length > 0
//                         ? [...profile.skills]
//                         : [''],
//             });
//             // Update preview immediately if the profile has a picture
//             if (profilePicturePreviewRef) {
//                 profilePicturePreviewRef.src =
//                     profile.profilePicture ||
//                     'https://via.placeholder.com/100/E0E0E0/808080?text=Profile';
//             }
//         }
//     });

//     const handleInputChange = (
//         e: InputEvent & {
//             currentTarget: HTMLInputElement;
//             target: HTMLInputElement;
//         }
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleCheckboxChange = (
//         e: Event & {
//             currentTarget: HTMLInputElement;
//             target: HTMLInputElement;
//         }
//     ) => {
//         const { value, checked } = e.target;
//         setFormData((prev) => {
//             const methods = new Set(prev.contactMethods);
//             if (checked) {
//                 methods.add(value);
//             } else {
//                 methods.delete(value);
//             }
//             return { ...prev, contactMethods: Array.from(methods) };
//         });
//     };

//     const handleFileChange = (
//         e: Event & {
//             currentTarget: HTMLInputElement;
//             target: HTMLInputElement;
//         }
//     ) => {
//         let files = e.target.files!;
//         const file = files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setFormData((prev) => ({
//                     ...prev,
//                     profilePicture: event.target!.result as string,
//                 }));
//                 if (profilePicturePreviewRef) {
//                     profilePicturePreviewRef.src = event.target!.result;
//                 }
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setFormData((prev) => ({
//                 ...prev,
//                 profilePicture:
//                     'https://via.placeholder.com/100/E0E0E0/808080?text=Profile',
//             }));
//             if (profilePicturePreviewRef) {
//                 profilePicturePreviewRef.src =
//                     'https://via.placeholder.com/100/E0E0E0/808080?text=Profile';
//             }
//         }
//     };

//     const addDynamicInput = (type: string) => {
//         if (type === 'serviceAreas') {
//             setFormData((prev) => ({
//                 ...prev,
//                 serviceAreas: [...prev.serviceAreas, ''],
//             }));
//         } else if (type === 'skills') {
//             setFormData((prev) => ({ ...prev, skills: [...prev.skills, ''] }));
//         }
//     };

//     const removeDynamicInput = (type: string, index: number) => {
//         if (type === 'serviceAreas') {
//             setFormData((prev) => {
//                 const newAreas = prev.serviceAreas.filter(
//                     (_, i) => i !== index
//                 );
//                 // Ensure there's at least one input if all are removed
//                 return {
//                     ...prev,
//                     serviceAreas: newAreas.length > 0 ? newAreas : [''],
//                 };
//             });
//         } else if (type === 'skills') {
//             setFormData((prev) => {
//                 const newSkills = prev.skills.filter((_, i) => i !== index);
//                 // Ensure there's at least one input if all are removed
//                 return {
//                     ...prev,
//                     skills: newSkills.length > 0 ? newSkills : [''],
//                 };
//             });
//         }
//     };

//     const handleSubmit = (
//         e: InputEvent & {
//             currentTarget: HTMLInputElement;
//             target: HTMLInputElement;
//         }
//     ) => {
//         e.preventDefault();

//         // Filter out empty dynamic inputs before submitting
//         const cleanedFormData = {
//             ...formData(),
//             serviceAreas: formData().serviceAreas.filter(
//                 (area) => area.trim() !== ''
//             ),
//             skills: formData().skills.filter((skill) => skill.trim() !== ''),
//         };

//         // Handle image upload if a new file is selected
//         const newProfilePicFile = profilePictureUploadRef!.files[0];
//         if (newProfilePicFile) {
//             // Simulate upload: In real app, this would be a real upload and update URL
//             cleanedFormData.profilePicture =
//                 URL.createObjectURL(newProfilePicFile);
//         }

//         props.onSave(cleanedFormData); // Pass the cleaned and potentially updated data to the parent
//         props.onClose(); // Close the modal
//     };

//     const handleClose = () => {
//         props.onClose();
//         // Reset form to initial state when closing
//         setFormData({
//             id: '',
//             fullName: '',
//             specialization: '',
//             profilePicture:
//                 'https://via.placeholder.com/100/E0E0E0/808080?text=Profile',
//             overallRating: 0,
//             totalReviews: 0,
//             bio: '',
//             baseLocation: '',
//             serviceRadius: '',
//             serviceAreas: [''],
//             contactMethods: [],
//             businessLegalName: '',
//             businessRegistration: '',
//             yearsInBusiness: 0,
//             skills: [''],
//         });
//         // Reset preview image to placeholder
//         if (profilePicturePreviewRef) {
//             profilePicturePreviewRef.src =
//                 'https://via.placeholder.com/100/E0E0E0/808080?text=Profile';
//         }
//     };

//     return (
//         <Portal>
//             <Show when={props.show}>
//                 <div
//                     class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
//                     classList={{ 'modal-overlay': true, active: props.show }}
//                     onClick={(e) =>
//                         e.target === e.currentTarget && handleClose()
//                     }
//                 >
//                     <div class={modal_styles.modal_content}>
//                         <span
//                             class={modal_styles.modal_close_button}
//                             onClick={handleClose}
//                         >
//                             &times;
//                         </span>
//                         <h2 class="text-2xl font-bold text-gray-800 mb-6">
//                             Edit Service Profile
//                         </h2>

//                         <form onSubmit={(e) => handleSubmit} class="space-y-6">
//                             <input
//                                 type="hidden"
//                                 name="id"
//                                 value={formData().id}
//                             />

//                             <section class="border-b border-gray-200 pb-6">
//                                 <h3 class="text-xl font-bold text-gray-800 mb-4">
//                                     Basic Information
//                                 </h3>
//                                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                                     <div>
//                                         <label
//                                             for="editProviderFullName"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Full Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="fullName"
//                                             id="editProviderFullName"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             value={formData().fullName}
//                                             onInput={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label
//                                             for="editProviderSpecialization"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Main Specialization
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="specialization"
//                                             id="editProviderSpecialization"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             value={formData().specialization}
//                                             onInput={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>

//                                 <div class="mb-6">
//                                     <label
//                                         for="editProfilePictureUpload"
//                                         class="block text-sm font-medium text-gray-700"
//                                     >
//                                         Profile Picture
//                                     </label>
//                                     <div class="mt-1 flex items-center space-x-4">
//                                         <img
//                                             ref={profilePicturePreviewRef}
//                                             src={formData().profilePicture}
//                                             alt="Profile Preview"
//                                             class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//                                         />
//                                         <label
//                                             for="editProfilePictureUpload"
//                                             class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                                         >
//                                             <span>Change photo</span>
//                                             <input
//                                                 ref={profilePictureUploadRef}
//                                                 id="editProfilePictureUpload"
//                                                 name="profilePicture"
//                                                 type="file"
//                                                 class="sr-only"
//                                                 accept="image/*"
//                                                 onChange={handleFileChange}
//                                             />
//                                         </label>
//                                     </div>
//                                     <p class="mt-2 text-xs text-gray-500">
//                                         JPG, PNG, GIF up to 5MB. Recommended:
//                                         square aspect ratio.
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <label
//                                         for="editProviderBio"
//                                         class="block text-sm font-medium text-gray-700"
//                                     >
//                                         Short Bio / About Me
//                                     </label>
//                                     <textarea
//                                         name="bio"
//                                         id="editProviderBio"
//                                         rows="5"
//                                         class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                         value={formData().bio}
//                                         onInput={(e) => handleInputChange}
//                                         required
//                                     ></textarea>
//                                 </div>
//                             </section>

//                             <section class="border-b border-gray-200 pb-6 pt-6">
//                                 <h3 class="text-xl font-bold text-gray-800 mb-4">
//                                     Location & Contact
//                                 </h3>
//                                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                                     <div>
//                                         <label
//                                             for="editBaseLocation"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Your Base Location (City, Country)
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="baseLocation"
//                                             id="editBaseLocation"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             value={formData().baseLocation}
//                                             onInput={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label
//                                             for="editServiceRadius"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Service Radius (Optional)
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="serviceRadius"
//                                             id="editServiceRadius"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             placeholder="e.g., 20km, Region-wide"
//                                             value={formData().serviceRadius}
//                                             onInput={handleInputChange}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div class="mb-4">
//                                     <label class="block text-sm font-medium text-gray-700">
//                                         Specific Service Areas
//                                     </label>
//                                     <div
//                                         id="editServiceAreasContainer"
//                                         class="space-y-2 mt-2"
//                                     >
//                                         <For each={formData().serviceAreas}>
//                                             {(area, index) => (
//                                                 <DynamicInputGroup
//                                                     name="serviceAreas[]"
//                                                     placeholder="e.g., Munich"
//                                                     value={area}
//                                                     onInput={() =>
//                                                         console.log()
//                                                     }
//                                                     //   onInput={(e) =>
//                                                     //     updateDynamicInput(
//                                                     //       "serviceAreas",
//                                                     //       index(),
//                                                     //       e.target.value
//                                                     //     )
//                                                     //   }
//                                                     onRemove={() =>
//                                                         removeDynamicInput(
//                                                             'serviceAreas',
//                                                             index()
//                                                         )
//                                                     }
//                                                 />
//                                             )}
//                                         </For>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             addDynamicInput('serviceAreas')
//                                         }
//                                         class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                     >
//                                         Add Service Area
//                                     </button>
//                                 </div>

//                                 <div>
//                                     <label class="block text-sm font-medium text-gray-700">
//                                         Preferred Contact Methods
//                                     </label>
//                                     <div class="mt-2 space-y-2">
//                                         <div class="flex items-center">
//                                             <input
//                                                 id="editContactChat"
//                                                 name="contactMethods"
//                                                 type="checkbox"
//                                                 value="Platform Chat (Recommended)"
//                                                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={formData().contactMethods.includes(
//                                                     'Platform Chat (Recommended)'
//                                                 )}
//                                                 onChange={handleCheckboxChange}
//                                             />
//                                             <label
//                                                 for="editContactChat"
//                                                 class="ml-2 block text-sm text-gray-900"
//                                             >
//                                                 Platform Chat (Recommended)
//                                             </label>
//                                         </div>
//                                         <div class="flex items-center">
//                                             <input
//                                                 id="editContactEmail"
//                                                 name="contactMethods"
//                                                 type="checkbox"
//                                                 value="Email"
//                                                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={formData().contactMethods.includes(
//                                                     'Email'
//                                                 )}
//                                                 onChange={handleCheckboxChange}
//                                             />
//                                             <label
//                                                 for="editContactEmail"
//                                                 class="ml-2 block text-sm text-gray-900"
//                                             >
//                                                 Email
//                                             </label>
//                                         </div>
//                                         <div class="flex items-center">
//                                             <input
//                                                 id="editContactPhone"
//                                                 name="contactMethods"
//                                                 type="checkbox"
//                                                 value="Phone"
//                                                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                                 checked={formData().contactMethods.includes(
//                                                     'Phone'
//                                                 )}
//                                                 onChange={handleCheckboxChange}
//                                             />
//                                             <label
//                                                 for="editContactPhone"
//                                                 class="ml-2 block text-sm text-gray-900"
//                                             >
//                                                 Phone
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>

//                             <section class="border-b border-gray-200 pb-6 pt-6">
//                                 <h3 class="text-xl font-bold text-gray-800 mb-4">
//                                     Business Details (Optional)
//                                 </h3>
//                                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label
//                                             for="editBusinessLegalName"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Legal Business Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="businessLegalName"
//                                             id="editBusinessLegalName"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             value={formData().businessLegalName}
//                                             onInput={handleInputChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label
//                                             for="editBusinessRegistration"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Business Registration Number
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="businessRegistration"
//                                             id="editBusinessRegistration"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             value={
//                                                 formData().businessRegistration
//                                             }
//                                             onInput={handleInputChange}
//                                         />
//                                     </div>
//                                     <div class="col-span-full">
//                                         <label
//                                             for="editYearsInBusiness"
//                                             class="block text-sm font-medium text-gray-700"
//                                         >
//                                             Years in Business
//                                         </label>
//                                         <input
//                                             type="number"
//                                             name="yearsInBusiness"
//                                             id="editYearsInBusiness"
//                                             class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                             min="0"
//                                             value={formData().yearsInBusiness}
//                                             onInput={handleInputChange}
//                                         />
//                                     </div>
//                                 </div>
//                             </section>

//                             <section class="pb-6 pt-6">
//                                 <h3 class="text-xl font-bold text-gray-800 mb-4">
//                                     Your Skills
//                                 </h3>
//                                 <div
//                                     id="editSkillsContainer"
//                                     class="space-y-2 mt-2"
//                                 >
//                                     <For each={formData().skills}>
//                                         {(skill, index) => (
//                                             <DynamicInputGroup
//                                                 name="skills[]"
//                                                 placeholder="e.g., Wood Carving"
//                                                 value={skill}
//                                                 onInput={() => console.log()}
//                                                 // onInput={(e) =>
//                                                 //   updateDynamicInput("skills", index(), e.target.value)
//                                                 // }
//                                                 onRemove={() =>
//                                                     removeDynamicInput(
//                                                         'skills',
//                                                         index()
//                                                     )
//                                                 }
//                                             />
//                                         )}
//                                     </For>
//                                 </div>
//                                 <button
//                                     type="button"
//                                     onClick={() => addDynamicInput('skills')}
//                                     class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                 >
//                                     Add Skill
//                                 </button>
//                                 <p class="mt-2 text-sm text-gray-500">
//                                     These skills will help customers find you
//                                     when searching for specific expertise.
//                                 </p>
//                             </section>

//                             <div class="pt-4">
//                                 <button
//                                     type="submit"
//                                     class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Show>
//         </Portal>
//     );
// };

/**
 * TestimonialInput Component
 * Renders input fields for a single testimonial and allows its removal.
 */
const TestimonialInput: Component<{
    testimonial: Testimonial;
    index: Accessor<number>;
    arrayName: 'testimonials'; // Explicitly define arrayName for this component
    onInput: (
        arrayName: 'testimonials',
        index: number,
        field: keyof Testimonial,
        value: string | number
    ) => void;
    onRemove: (arrayName: 'testimonials', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`testimonial-reviewer-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Reviewer Name
                    </label>
                    <input
                        type="text"
                        id={`testimonial-reviewer-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.reviewer}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'reviewer',
                                e.target.value
                            )
                        }
                        placeholder="Reviewer Name"
                    />
                </div>
                <div>
                    <label
                        for={`testimonial-rating-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        id={`testimonial-rating-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.rating}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'rating',
                                parseInt(e.target.value) || 0
                            )
                        }
                        min="1"
                        max="5"
                        placeholder="Rating"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`testimonial-comment-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Comment
                    </label>
                    <textarea
                        id={`testimonial-comment-${props.index()}`}
                        rows="2"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.comment}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'comment',
                                e.target.value
                            )
                        }
                        placeholder="Testimonial comment"
                    ></textarea>
                </div>
                <div>
                    <label
                        for={`testimonial-date-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id={`testimonial-date-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.date}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'date',
                                e.target.value
                            )
                        }
                    />
                </div>
                <div>
                    <label
                        for={`testimonial-service-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Service Title
                    </label>
                    <input
                        type="text"
                        id={`testimonial-service-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.testimonial.serviceTitle}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'serviceTitle',
                                e.target.value
                            )
                        }
                        placeholder="Service related to testimonial"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

/**
 * OfferedServiceInput Component
 * Renders input fields for a single offered service and allows its removal.
 */
const OfferedServiceInput: Component<{
    service: OfferedService;
    index: Accessor<number>;
    arrayName: 'services_offered'; // Explicitly define arrayName for this component
    onInput: (
        arrayName: 'services_offered',
        index: number,
        field: keyof OfferedService,
        value: string
    ) => void;
    onRemove: (arrayName: 'services_offered', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`service-title-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Service Title
                    </label>
                    <input
                        type="text"
                        id={`service-title-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.title}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'title',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Custom Wood Carving"
                    />
                </div>
                <div>
                    <label
                        for={`service-category-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        id={`service-category-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.category}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'category',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Woodwork"
                    />
                </div>
                <div>
                    <label
                        for={`service-price-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        id={`service-price-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.price}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'price',
                                e.target.value
                            )
                        }
                        placeholder="e.g., $100/hr or Fixed Price"
                    />
                </div>
                <div>
                    <label
                        for={`service-link-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Link (Optional)
                    </label>
                    <input
                        type="url"
                        id={`service-link-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.service.link}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'link',
                                e.target.value
                            )
                        }
                        placeholder="Link to service details"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

/**
 * PublicUpdateInput Component
 * Renders input fields for a single public update and allows its removal.
 */
const PublicUpdateInput: Component<{
    update: PublicUpdate;
    index: Accessor<number>;
    arrayName: 'public_updates'; // Explicitly define arrayName for this component
    onInput: (
        arrayName: 'public_updates',
        index: number,
        field: keyof PublicUpdate,
        value: string | null
    ) => void;
    onRemove: (arrayName: 'public_updates', index: number) => void;
}> = (props) => {
    return (
        <div class="flex flex-col sm:flex-row gap-2 border border-gray-200 rounded-md p-3 items-end">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        for={`update-date-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id={`update-date-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.date}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'date',
                                e.target.value
                            )
                        }
                    />
                </div>
                <div>
                    <label
                        for={`update-type-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Type
                    </label>
                    <input
                        type="text"
                        id={`update-type-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.type}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'type',
                                e.target.value
                            )
                        }
                        placeholder="e.g., Event, New Product"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-title-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id={`update-title-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.title}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'title',
                                e.target.value
                            )
                        }
                        placeholder="Update Title"
                    />
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-content-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Content
                    </label>
                    <textarea
                        id={`update-content-${props.index()}`}
                        rows="3"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.content}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'content',
                                e.target.value
                            )
                        }
                        placeholder="Details of the update"
                    ></textarea>
                </div>
                <div class="md:col-span-2">
                    <label
                        for={`update-image-${props.index()}`}
                        class="block text-xs font-medium text-gray-600"
                    >
                        Image URL (Optional)
                    </label>
                    <input
                        type="text" // Using text for URL, could be file input for actual upload
                        id={`update-image-${props.index()}`}
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                        value={props.update.image || ''}
                        onInput={(e) =>
                            props.onInput(
                                props.arrayName,
                                props.index(),
                                'image',
                                e.target.value
                            )
                        }
                        placeholder="Image URL"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={() => props.onRemove(props.arrayName, props.index())}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md shadow-sm text-sm"
            >
                Remove
            </button>
        </div>
    );
};

/**
 * EditProfileModal SolidJS Component
 *
 * This modal allows users to edit their artisan profile details.
 * It uses the ArtisanModel for data structure and handles form input,
 * file uploads for profile pictures, and submission of updated data.
 *
 * Props:
 * - show: boolean - Controls the visibility of the modal.
 * - editingProfile: Accessor<ArtisanModel | undefined> - The current artisan profile data to be edited.
 * - onClose: () => void - Callback function to close the modal.
 * - onSave: (updatedProfile: ArtisanModel) => void - Callback function to save the updated profile.
 */

/**
 * EditProfileModal SolidJS Component
 *
 * This modal allows users to edit their artisan profile details.
 * It uses the ArtisanModel for data structure and handles form input,
 * file uploads for profile pictures, and submission of updated data.
 *
 * Props:
 * - show: boolean - Controls the visibility of the modal.
 * - editingProfile: Accessor<ArtisanModel | undefined> - The current artisan profile data to be edited.
 * - onClose: () => void - Callback function to close the modal.
 * - onSave: (updatedProfile: ArtisanModel) => void - Callback function to save the updated profile.
 */
export const EditProfileModal: Component<{
    show: boolean;
    editingProfile: Accessor<ArtisanModel | undefined>;
    onClose: () => void;
    onSave: (updatedProfile: ArtisanModel) => void;
}> = (props) => {
    // Refs for direct DOM access, particularly for file input and image preview
    let profilePictureUploadRef: HTMLInputElement | undefined;
    let profilePicturePreviewRef: HTMLImageElement | undefined;

    // Default placeholder image for the profile picture
    const DEFAULT_PROFILE_PICTURE =
        'https://placehold.co/100x100/E0E0E0/808080?text=Profile';

    // SolidJS signal to manage the form data.
    // Initialized with default values conforming to ArtisanModel.
    const [formData, setFormData] = createSignal<ArtisanModel>({
        id: '',
        user_id: '',
        name: '',
        category: '',
        sub_category: '',
        profile_picture: DEFAULT_PROFILE_PICTURE,
        followers: 0,
        specialization: '',
        certifications: '',
        bio: '',
        overall_rating: 0,
        total_reviews: 0,
        location: '',
        years_in_business: 0,
        business_name: '',
        business_registration: '',
        contact_preferences: [],
        rating_breakdown: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
        testimonials: [],
        services_offered: [],
        public_updates: [],
    });

    /**
     * createEffect hook to synchronize formData with the editingProfile prop.
     * This ensures that when the modal opens with a new profile, the form fields are populated.
     */
    createEffect(() => {
        if (props.editingProfile()) {
            // Merge the existing formData defaults with the incoming editingProfile data.
            // This ensures all ArtisanModel fields are present and correctly typed.
            setFormData((prev) => ({
                ...prev, // Retain default values for fields not explicitly provided by editingProfile
                ...props.editingProfile(),
                // Ensure array/object fields are always initialized to prevent issues if they are null/undefined
                contact_preferences: props.editingProfile()?.contact_preferences
                    ? [...props.editingProfile()!.contact_preferences]
                    : [],
                testimonials: props.editingProfile()?.testimonials
                    ? props
                          .editingProfile()!
                          .testimonials.map((t) => ({ ...t }))
                    : [],
                services_offered: props.editingProfile()?.services_offered
                    ? props
                          .editingProfile()!
                          .services_offered.map((s) => ({ ...s }))
                    : [],
                public_updates: props.editingProfile()?.public_updates
                    ? props
                          .editingProfile()!
                          .public_updates.map((p) => ({ ...p }))
                    : [],
                rating_breakdown: props.editingProfile()?.rating_breakdown
                    ? { ...props.editingProfile()!.rating_breakdown }
                    : { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
                // Set default profile picture if the incoming profile_picture is missing
                profile_picture:
                    props.editingProfile()?.profile_picture ||
                    DEFAULT_PROFILE_PICTURE,
            }));
            // Update the profile picture preview immediately if the ref is available
            if (profilePicturePreviewRef) {
                profilePicturePreviewRef.src =
                    props.editingProfile()?.profile_picture ||
                    DEFAULT_PROFILE_PICTURE;
            }
        } else {
            // If no profile is being edited (e.g., modal is closing or opened without data), reset the form.
            handleClose();
        }
    });

    /**
     * Handles changes for text and number input fields.
     * Updates the corresponding field in the formData signal.
     */
    const handleInputChange = (
        e: InputEvent & {
            currentTarget: HTMLInputElement | HTMLTextAreaElement; // Supports both input and textarea
            target: HTMLInputElement | HTMLTextAreaElement;
        }
    ) => {
        const { name, value } = e.target;
        // Special handling for numeric inputs like 'years_in_business'
        if (name === 'years_in_business') {
            setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    /**
     * Handles changes for checkbox inputs, specifically for 'contact_preferences'.
     * Adds or removes the value from the contact_preferences array based on checkbox state.
     */
    const handleCheckboxChange = (
        e: Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            // Use a Set for efficient adding/removing of contact methods
            const methods = new Set(prev.contact_preferences);
            if (checked) {
                methods.add(value);
            } else {
                methods.delete(value);
            }
            // Convert back to array for the ArtisanModel structure
            return { ...prev, contact_preferences: Array.from(methods) };
        });
    };

    /**
     * Handles changes for the profile picture file input.
     * Reads the selected file and updates the profile_picture in formData,
     * also updating the image preview.
     */
    const handleFileChange = (
        e: Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
        }
    ) => {
        const files = e.target.files;
        const file = files ? files[0] : null; // Get the first selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target!.result as string;
                setFormData((prev) => ({
                    ...prev,
                    profile_picture: result, // Update profile_picture with base64 string
                }));
                // Update the preview image source
                if (profilePicturePreviewRef) {
                    profilePicturePreviewRef.src = result;
                }
            };
            reader.readAsDataURL(file); // Read the file as a Data URL (base64 string)
        } else {
            // If no file is selected, revert to the default placeholder
            setFormData((prev) => ({
                ...prev,
                profile_picture: DEFAULT_PROFILE_PICTURE,
            }));
            if (profilePicturePreviewRef) {
                profilePicturePreviewRef.src = DEFAULT_PROFILE_PICTURE;
            }
        }
    };

    /**
     * Handles input changes for nested arrays of objects (testimonials, services_offered, public_updates).
     * @param arrayName The name of the array field in ArtisanModel (e.g., 'testimonials').
     * @param index The index of the object within the array to update.
     * @param fieldName The specific field within the object to update (e.g., 'reviewer').
     * @param value The new value for the field.
     */
    const handleArrayObjectInputChange = <K extends keyof ArtisanModel>(
        arrayName: K,
        index: number,
        fieldName: any, //keyof ArtisanModel[K][number], // Type for nested field name
        value: string | number | null
    ) => {
        setFormData((prev) => {
            // Create a deep copy of the array and the object to ensure immutability
            const newArray = (prev[arrayName] as any[]).map((item, i) =>
                i === index ? { ...item, [fieldName]: value } : { ...item }
            );
            return { ...prev, [arrayName]: newArray as ArtisanModel[K] };
        });
    };

    /**
     * Adds a new empty object to one of the dynamic arrays (testimonials, services_offered, public_updates).
     * @param arrayName The name of the array field in ArtisanModel.
     */
    const addArrayObjectInput = (
        arrayName: 'testimonials' | 'services_offered' | 'public_updates'
    ) => {
        setFormData((prev) => {
            const newArray = [...prev[arrayName]];
            if (arrayName === 'testimonials') {
                newArray.push({
                    id: Date.now(),
                    reviewer: '',
                    rating: 0,
                    date: '',
                    comment: '',
                    serviceTitle: '',
                });
            } else if (arrayName === 'services_offered') {
                newArray.push({
                    id: crypto.randomUUID(),
                    title: '',
                    category: '',
                    price: '',
                    link: '',
                });
            } else if (arrayName === 'public_updates') {
                newArray.push({
                    id: crypto.randomUUID(),
                    date: '',
                    type: '',
                    title: '',
                    content: '',
                    image: null,
                });
            }
            return {
                ...prev,
                [arrayName]: newArray as (typeof prev)[typeof arrayName],
            };
        });
    };

    /**
     * Removes an object from one of the dynamic arrays.
     * @param arrayName The name of the array field in ArtisanModel.
     * @param index The index of the object to remove.
     */
    const removeArrayObjectInput = (
        arrayName: 'testimonials' | 'services_offered' | 'public_updates',
        index: number
    ) => {
        setFormData((prev) => {
            const newArray = (prev[arrayName] as any[]).filter(
                (_, i) => i !== index
            );
            return {
                ...prev,
                [arrayName]: newArray as (typeof prev)[typeof arrayName],
            };
        });
    };

    /**
     * Handles the form submission.
     * Prevents default form submission, prepares the data, and calls the onSave prop.
     */
    const handleSubmit = (
        e: Event // Event type for form submission
    ) => {
        e.preventDefault(); // Prevent default browser form submission

        // Create a copy of formData to ensure all ArtisanModel fields are present
        // and non-editable fields are carried over from the original profile.
        const dataToSave: ArtisanModel = {
            ...formData(),
            // Non-editable fields from ArtisanModel should be preserved from the original profile
            user_id: props.editingProfile()?.user_id || '',
            category: props.editingProfile()?.category || '',
            sub_category: props.editingProfile()?.sub_category || '',
            followers: props.editingProfile()?.followers || 0,
            certifications: props.editingProfile()?.certifications || '',
            overall_rating: props.editingProfile()?.overall_rating || 0,
            total_reviews: props.editingProfile()?.total_reviews || 0,
            rating_breakdown: props.editingProfile()?.rating_breakdown || {
                '5': 0,
                '4': 0,
                '3': 0,
                '2': 0,
                '1': 0,
            },
            // Ensure nested arrays are passed as copies
            testimonials: formData().testimonials.map((t) => ({ ...t })),
            services_offered: formData().services_offered.map((s) => ({
                ...s,
            })),
            public_updates: formData().public_updates.map((p) => ({ ...p })),
        };

        // If a new profile picture file was selected, simulate its upload.
        // In a real application, this would involve uploading to a storage service (e.g., Firebase Storage)
        // and updating `dataToSave.profile_picture` with the returned public URL.
        // For this example, URL.createObjectURL creates a temporary local URL.
        const newProfilePicFile = profilePictureUploadRef?.files?.[0];
        if (newProfilePicFile) {
            dataToSave.profile_picture = URL.createObjectURL(newProfilePicFile);
        }

        props.onSave(dataToSave); // Call the onSave prop with the prepared ArtisanModel data
        props.onClose(); // Close the modal after saving
    };

    /**
     * Handles the modal close action.
     * Calls the onClose prop and resets the form data to its initial default state.
     */
    const handleClose = () => {
        props.onClose(); // Call the onClose prop
        // Reset form data to a clean, default ArtisanModel state
        setFormData({
            id: '',
            user_id: '',
            name: '',
            category: '',
            sub_category: '',
            profile_picture: DEFAULT_PROFILE_PICTURE,
            followers: 0,
            specialization: '',
            certifications: '',
            bio: '',
            overall_rating: 0,
            total_reviews: 0,
            location: '',
            years_in_business: 0,
            business_name: '',
            business_registration: '',
            contact_preferences: [],
            rating_breakdown: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
            testimonials: [],
            services_offered: [],
            public_updates: [],
        });
        // Reset the preview image to the default placeholder
        if (profilePicturePreviewRef) {
            profilePicturePreviewRef.src = DEFAULT_PROFILE_PICTURE;
        }
    };

    return (
        <Portal>
            <Show when={props.show}>
                {/* Modal Overlay */}
                <div
                    class="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300 ease-out z-[9999]"
                    classList={{ 'modal-overlay': true, active: props.show }}
                    onClick={(e) =>
                        // Close modal only if clicking on the overlay, not the content
                        e.target === e.currentTarget && handleClose()
                    }
                >
                    {/* Modal Content */}
                    <div class={modal_styles.modal_content}>
                        {/* Close Button */}
                        <span
                            class={modal_styles.modal_close_button}
                            onClick={handleClose}
                        >
                            &times;
                        </span>
                        {/* Modal Title */}
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">
                            Edit Artisan Profile
                        </h2>

                        {/* Profile Edit Form */}
                        <form onSubmit={handleSubmit} class="space-y-6">
                            {/* Hidden ID field */}
                            <input
                                type="hidden"
                                name="id"
                                value={formData().id}
                            />

                            {/* Basic Information Section */}
                            <section class="border-b border-gray-200 pb-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Basic Information
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Full Name Input */}
                                    <div>
                                        <label
                                            for="editArtisanName"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="editArtisanName"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().name}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {/* Main Specialization Input */}
                                    <div>
                                        <label
                                            for="editArtisanSpecialization"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Main Specialization
                                        </label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            id="editArtisanSpecialization"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().specialization}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Profile Picture Upload */}
                                <div class="mb-6">
                                    <label
                                        for="editProfilePictureUpload"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Profile Picture
                                    </label>
                                    <div class="mt-1 flex items-center space-x-4">
                                        {/* Profile Picture Preview */}
                                        <img
                                            ref={profilePicturePreviewRef}
                                            src={formData().profile_picture}
                                            alt="Profile Preview"
                                            class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                        />
                                        {/* File Input Label and Input */}
                                        <label
                                            for="editProfilePictureUpload"
                                            class="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>Change photo</span>
                                            <input
                                                ref={profilePictureUploadRef}
                                                id="editProfilePictureUpload"
                                                name="profile_picture"
                                                type="file"
                                                class="sr-only"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    <p class="mt-2 text-xs text-gray-500">
                                        JPG, PNG, GIF up to 5MB. Recommended:
                                        square aspect ratio.
                                    </p>
                                </div>

                                {/* Short Bio / About Me Textarea */}
                                <div>
                                    <label
                                        for="editArtisanBio"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Short Bio / About Me
                                    </label>
                                    <textarea
                                        name="bio"
                                        id="editArtisanBio"
                                        rows="5"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData().bio}
                                        onInput={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </section>

                            {/* Location & Contact Section */}
                            <section class="border-b border-gray-200 pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Location & Contact
                                </h3>
                                {/* Base Location Input */}
                                <div class="grid grid-cols-1 gap-6 mb-4">
                                    <div>
                                        <label
                                            for="editLocation"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Your Base Location (City, Country)
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="editLocation"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().location}
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Preferred Contact Methods Checkboxes */}
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                        Preferred Contact Methods
                                    </label>
                                    <div class="mt-2 space-y-2">
                                        <div class="flex items-center">
                                            <input
                                                id="editContactChat"
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Platform Chat (Recommended)"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Platform Chat (Recommended)'
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
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Email"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Email'
                                                )}
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
                                                name="contact_preferences"
                                                type="checkbox"
                                                value="Phone"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={formData().contact_preferences.includes(
                                                    'Phone'
                                                )}
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

                            {/* Business Details Section */}
                            <section class="border-b border-gray-200 pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Business Details (Optional)
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Legal Business Name Input */}
                                    <div>
                                        <label
                                            for="editBusinessName"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Legal Business Name
                                        </label>
                                        <input
                                            type="text"
                                            name="business_name"
                                            id="editBusinessName"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={formData().business_name}
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                    {/* Business Registration Number Input */}
                                    <div>
                                        <label
                                            for="editBusinessRegistration"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Business Registration Number
                                        </label>
                                        <input
                                            type="text"
                                            name="business_registration"
                                            id="editBusinessRegistration"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            value={
                                                formData().business_registration
                                            }
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                    {/* Years in Business Input */}
                                    <div class="col-span-full">
                                        <label
                                            for="editYearsInBusiness"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Years in Business
                                        </label>
                                        <input
                                            type="number"
                                            name="years_in_business"
                                            id="editYearsInBusiness"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            min="0"
                                            value={formData().years_in_business}
                                            onInput={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Testimonials Section */}
                            <section class="pb-6 pt-6 border-b border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Testimonials
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().testimonials}>
                                        {(testimonial, index) => (
                                            <TestimonialInput
                                                testimonial={testimonial}
                                                index={index}
                                                arrayName="testimonials" // Pass arrayName
                                                onInput={
                                                    handleArrayObjectInputChange
                                                }
                                                onRemove={
                                                    removeArrayObjectInput
                                                }
                                            />
                                        )}
                                    </For>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        addArrayObjectInput('testimonials')
                                    }
                                    class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Testimonial
                                </button>
                            </section>

                            {/* Services Offered Section */}
                            <section class="pb-6 pt-6 border-b border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Services Offered
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().services_offered}>
                                        {(service, index) => (
                                            <OfferedServiceInput
                                                service={service}
                                                index={index}
                                                arrayName="services_offered" // Pass arrayName
                                                onInput={
                                                    handleArrayObjectInputChange
                                                }
                                                onRemove={
                                                    removeArrayObjectInput
                                                }
                                            />
                                        )}
                                    </For>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        addArrayObjectInput('services_offered')
                                    }
                                    class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Service
                                </button>
                            </section>

                            {/* Public Updates Section */}
                            <section class="pb-6 pt-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-4">
                                    Public Updates
                                </h3>
                                <div class="space-y-4">
                                    <For each={formData().public_updates}>
                                        {(update, index) => (
                                            <PublicUpdateInput
                                                update={update}
                                                index={index}
                                                arrayName="public_updates" // Pass arrayName
                                                onInput={
                                                    handleArrayObjectInputChange
                                                }
                                                onRemove={
                                                    removeArrayObjectInput
                                                }
                                            />
                                        )}
                                    </For>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        addArrayObjectInput('public_updates')
                                    }
                                    class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Add Update
                                </button>
                            </section>

                            {/* Save Changes Button */}
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
