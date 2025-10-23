import { createSignal } from 'solid-js';

const ProfileInput = (props: {
    label: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
    type?: string;
}) => (
    <div class="flex flex-col gap-2 flex-grow min-w-0">
        {/* Label: [font-size: 16px; font-weight: 500] */}
        <label class="text-base font-medium text-gray-800">{props.label}</label>

        {/* Input Field: Stylized as requested */}
        <input
            type={props.type || 'text'}
            value={props.value}
            onInput={(e) => props.onChange(e.currentTarget.value)}
            placeholder={props.placeholder}
            // [height: 46px; padding: 12px; border-radius: 8px; outline: 1px #CDD5DF solid]
            class="h-11 w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
        />
    </div>
);

export const ProfileInformation = () => {
    // Form state signals
    const [firstName, setFirstName] = createSignal('Stanley');
    const [lastName, setLastName] = createSignal('Agu');
    const [email, setEmail] = createSignal('stanleyagu@gmail.com');
    const [address, setAddress] = createSignal('5843 Elm street Anytown, USA');
    const [profilePic, setProfilePic] = createSignal(
        `https://picsum.photos/200?random=${Math.random()}`
    );

    // Reference for the hidden file input
    let fileInputRef: HTMLInputElement | undefined;

    const handleFileChange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            // Create a local URL for image preview - this is the core of the image selector
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const handlePictureUploadClick = () => {
        // Programmatically trigger the hidden file input
        fileInputRef?.click();
    };

    const handleSaveChanges = () => {
        alert('Changes saved!');
        // In a real application, you would make an API call here.
    };

    return (
        <div class="flex flex-col gap-7 w-full">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                class="hidden"
                accept="image/*"
            />

            {/* Sub-Header: [font-size: 18px; font-weight: 500] */}
            <div class="text-lg font-medium text-gray-700 pb-4">
                Edit your personal information
            </div>

            <div class="flex flex-col gap-5">
                {/* --- Profile Picture Section --- */}
                <div class="relative w-24 h-24 mb-4">
                    <img
                        src={profilePic()}
                        alt="Profile"
                        class="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {/* Camera Button: [background: #1376A1; border-radius: 40px] */}
                    <button
                        onClick={handlePictureUploadClick}
                        class="absolute bottom-0 right-0 p-2 bg-[#1376A1] rounded-full text-white w-8 h-8 flex items-center justify-center shadow-lg ring-4 ring-white"
                        aria-label="Change profile picture"
                    >
                        {/* <div class="w-4 h-4 text-white">{Icons.camera}</div> */}
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>

                {/* --- Form Fields Container --- */}
                <div class="flex flex-col gap-3">
                    {/* 1. Name Fields (Responsive Grid) */}
                    {/* [border-bottom: 1px #E3E8EF solid] */}
                    <div class="py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <ProfileInput
                            label="First Name"
                            value={firstName()}
                            placeholder="Stanley"
                            onChange={setFirstName}
                        />
                        <ProfileInput
                            label="Last Name"
                            value={lastName()}
                            placeholder="Agu"
                            onChange={setLastName}
                        />
                    </div>

                    {/* 2. Email Address */}
                    <div class="py-4 border-b border-gray-200 flex flex-col gap-4">
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div class="flex-grow">
                                <ProfileInput
                                    label="Email Address"
                                    value={email()}
                                    placeholder="stanleyagu@gmail.com"
                                    onChange={setEmail}
                                    type="email"
                                />
                            </div>
                            {/* Change Email Button: [padding: 14px 16px; border-radius: 24px] */}
                            <button
                                class="py-3.5 px-4 rounded-full border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
                                onClick={() => console.log('Change Email')}
                            >
                                Change email
                            </button>
                        </div>
                        {/* Add Another Email Button: [padding: 10px; border-radius: 24px] */}
                        <button
                            class="w-fit py-2 px-4 rounded-full cursor-pointer border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            onClick={() => console.log('Add another email')}
                        >
                            <div class="w-5 h-5 text-gray-700">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                            Add another email
                        </button>
                    </div>

                    {/* 3. Address */}
                    <div class="pt-4 pb-0 flex flex-col gap-4">
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div class="flex-grow">
                                <ProfileInput
                                    label="Address"
                                    value={address()}
                                    placeholder="5843 Elm street Anytown, USA"
                                    onChange={setAddress}
                                />
                            </div>
                            {/* Change Address Button */}
                            <button
                                class="py-3.5 px-4 rounded-full border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
                                onClick={() => console.log('Change Address')}
                            >
                                Change address
                            </button>
                        </div>
                        {/* Add Another Address Button */}
                        <button
                            class="w-fit py-2 px-4 rounded-full border border-gray-500 text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
                            onClick={() => console.log('Add another address')}
                        >
                            <div class="w-5 h-5 text-gray-700">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                            Add another address
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Save Changes Button --- */}
            <div class="w-full flex justify-end pt-8 border-t border-gray-100 mt-8">
                {/* [padding: 12px 16px; background: #1376A1; border-radius: 8px] */}
                <button
                    onClick={handleSaveChanges}
                    class="py-3 px-6 bg-[#1376A1] text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors text-base"
                >
                    Save changes
                </button>
            </div>
        </div>
    );
};
