import { createSignal, createEffect, For, Show, Component } from "solid-js";
import { StarRating } from "./rating";
import { EditProfileModal } from "./edit";
import { ListingProfile } from "./type";

// Main Component
export const ManageServiceProfiles: Component<{}> = () => {
  // Dummy Data for User's Service Profiles
  const [userProfiles, setUserProfiles] = createSignal<ListingProfile[]>([
    {
      id: "provider1",
      fullName: "John Doe",
      specialization: "Carpenter",
      profilePicture:
        "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      overallRating: 4.8,
      totalReviews: 120,
      bio: "Experienced woodworker specializing in custom furniture and intricate installations. I prioritize quality and client satisfaction, delivering durable and beautiful results.",
      baseLocation: "Nuremberg, Germany",
      serviceRadius: "50km",
      serviceAreas: ["Fürth", "Erlangen", "Schwabach"],
      contactMethods: ["Platform Chat (Recommended)", "Email"],
      businessLegalName: "Doe's Custom Woodwork",
      businessRegistration: "DE123456789",
      yearsInBusiness: 15,
      skills: [
        "Custom Furniture",
        "Wood Carving",
        "Deck Building",
        "Renovation",
      ],
    },
    {
      id: "provider2",
      fullName: "Jane Smith",
      specialization: "Web Developer",
      profilePicture: "https://picsum.photos/200?random=2",
      overallRating: 4.5,
      totalReviews: 55,
      bio: "Full-stack web developer passionate about creating engaging and efficient digital experiences. Specializing in React, Node.js, and modern UI/UX design.",
      baseLocation: "Berlin, Germany",
      serviceRadius: "Remote",
      serviceAreas: ["Worldwide"],
      contactMethods: ["Platform Chat (Recommended)", "Email", "Phone"],
      businessLegalName: "Jane Smith Digital Solutions",
      businessRegistration: "DE987654321",
      yearsInBusiness: 8,
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "UI/UX Design",
        "API Development",
      ],
    },
    {
      id: "provider3",
      fullName: "Mark Johnson",
      specialization: "Electrician",
      profilePicture: "https://picsum.photos/200?random=29",
      overallRating: 3.9,
      totalReviews: 15,
      bio: "Certified electrician for residential and commercial properties. From new installations to urgent repairs, I ensure safe and reliable electrical systems.",
      baseLocation: "Hamburg, Germany",
      serviceRadius: "30km",
      serviceAreas: ["Hamburg Central", "Altona"],
      contactMethods: ["Platform Chat (Recommended)", "Phone"],
      businessLegalName: "Johnson Electrical",
      businessRegistration: "HB987654",
      yearsInBusiness: 5,
      skills: [
        "Wiring",
        "Troubleshooting",
        "Installations",
        "Smart Home Systems",
        "Appliance Repair",
      ],
    },
  ]);

  const [activeProfileId, setActiveProfileIdInternal] = createSignal(
    localStorage.getItem("activeProviderProfileId")
  );
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [editingProfile, setEditingProfile] = createSignal<ListingProfile>();

  // Initialize active profile if none is set, or if an existing active one is deleted
  // This also serves as the initial render logic in SolidJS
  createEffect(() => {
    const currentActiveId = activeProfileId();
    const profiles = userProfiles();
    if (profiles.length > 0) {
      const activeExists = profiles.some((p) => p.id === currentActiveId);
      if (!activeExists) {
        setActiveProfileIdInternal(profiles[0].id); // Default to first if current active is gone or none set
      }
    } else {
      localStorage.removeItem("activeProviderProfileId"); // Clear if no profiles exist
      setActiveProfileIdInternal(null);
    }
  });

  const setActiveProfile = (id: string) => {
    localStorage.setItem("activeProviderProfileId", id);
    setActiveProfileIdInternal(id);
    const activeProfile = userProfiles().find((p) => p.id === id);
    if (activeProfile) {
      alert(
        `You are now acting as "${activeProfile.fullName} (${activeProfile.specialization})"`
      );
    } else {
      alert("No active profile selected.");
    }
  };

  const openEditModal = (profileId: string) => {
    const profile = userProfiles().find((p) => p.id === profileId);
    if (profile) {
      setEditingProfile(profile);
      setShowEditModal(true);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProfile();
  };

  const saveProfileChanges = (updatedProfile: ListingProfile) => {
    setUserProfiles((prevProfiles) =>
      prevProfiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
    alert("Profile updated successfully! (Check console for updated data)");
    console.log("Updated Profile:", updatedProfile);
    // In a real application, you would send `updatedProfile` to your backend API here
  };

  const deleteProfile = (profileId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this profile? This action cannot be undone."
      )
    ) {
      setUserProfiles((prevProfiles) =>
        prevProfiles.filter((p) => p.id !== profileId)
      );
      alert("Profile deleted successfully! (Check console)");
      console.log("Remaining Profiles:", userProfiles());
      // In a real application, you would send a delete request to your backend API here
    }
  };

  return (
    <div class="w-full bg-white p-8 rounded-lg shadow-lg">
      <EditProfileModal
        show={showEditModal()}
        editingProfile={editingProfile}
        onClose={closeEditModal}
        onSave={saveProfileChanges}
      />

      {/* <div class="flex flex-wrap">
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"> */}
      <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Manage Your Service Profiles
      </h1>
      <p class="text-gray-600 text-center mb-6">
        Here you can oversee all your different service provider roles, add new
        ones, or make changes.
      </p>

      <div class="mb-8 text-center">
        {/* In a real SolidJS app, you'd use a router link instead of a plain <a> tag if navigating within the SPA */}
        <a
          href="/create_provider_profile"
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
        </a>
      </div>

      <section class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Your Existing Profiles
        </h2>
        <div
          id="profilesContainer"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Show
            when={userProfiles().length > 0}
            fallback={
              <p class="text-gray-500 text-center col-span-full mt-4">
                You haven't created any service profiles yet. Click "Create New
                Service Profile" to get started!
              </p>
            }
          >
            <For each={userProfiles()}>
              {(profile) => {
                const isActive = profile.id === activeProfileId();
                return (
                  <div
                    classList={{
                      "bg-white": true,
                      "p-6": true,
                      "rounded-lg": true,
                      "shadow-md": true,
                      flex: true,
                      "flex-col": true,
                      "items-center": true,
                      "text-center": true,
                      transition: true,
                      "duration-200": true,
                      "hover:shadow-lg": true,
                      "border-4": isActive,
                      border: !isActive,
                      "border-blue-500": isActive,
                      "border-gray-200": !isActive,
                    }}
                  >
                    <img
                      src={
                        profile.profilePicture ||
                        "https://via.placeholder.com/100/E0E0E0/808080?text=Profile"
                      }
                      alt={profile.fullName}
                      class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
                    />
                    <h3 class="text-xl font-semibold text-gray-900 mb-1">
                      {profile.fullName}
                    </h3>
                    <p class="text-blue-600 mb-2">{profile.specialization}</p>
                    <div class="flex items-center justify-center mb-3">
                      <StarRating rating={profile.overallRating} />
                      <span class="text-gray-700 text-sm font-semibold">
                        {profile.overallRating.toFixed(1)}
                      </span>
                      <span class="text-gray-500 text-xs ml-1">
                        ({profile.totalReviews})
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                      {profile.bio}
                    </p>
                    <Show when={isActive}>
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
                        Active Profile
                      </span>
                    </Show>
                    <div class="flex flex-wrap justify-center gap-3 mt-auto w-full">
                      {/* In a real SolidJS app, you'd use a router link if navigating within the SPA */}
                      <a
                        href={`/provider_profile/${profile.id}`}
                        class="flex-1 min-w-[100px] bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-md hover:bg-gray-300 text-center"
                      >
                        View Profile
                      </a>
                      <button
                        onClick={() => openEditModal(profile.id)}
                        class="flex-1 min-w-[100px] bg-yellow-500 text-white text-sm py-2 px-3 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProfile(profile.id)}
                        class="flex-1 min-w-[100px] bg-red-500 text-white text-sm py-2 px-3 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <Show when={!isActive}>
                        <button
                          onClick={() => setActiveProfile(profile.id)}
                          class="flex-1 min-w-[100px] bg-blue-500 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-600"
                        >
                          Activate
                        </button>
                      </Show>
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
