import { Component, createSignal, For, Show } from 'solid-js';
import { LoginStore, COUNTRIES, StepTransitions } from './types';

export const ArtisansVerificationNTrust: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [profilePhotoUrl, setProfilePhotoUrl] = createSignal<string | null>(
        null
    );
    const [idDocumentFile, setIdDocumentFile] = createSignal<File | null>(null);
    const [phoneNumber, setPhoneNumber] = createSignal('');
    const [selectedCountryCode, setSelectedCountryCode] = createSignal(
        COUNTRIES[0].dialCode
    );
    const [isCodeSent, setIsCodeSent] = createSignal(false);
    const [verificationCode, setVerificationCode] = createSignal('');

    // Handles the profile photo upload (File to URL conversion)
    const handleProfilePhotoChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePhotoUrl(url);
        }
    };

    // Handles the ID document upload
    const handleIdDocumentChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            setIdDocumentFile(file);
            console.log('ID Document selected:', file.name);
        }
    };

    // Sends a dummy verification code
    const handleSendCode = () => {
        if (!phoneNumber() || phoneNumber().length < 8) {
            alert('Please enter a valid phone number.');
            return;
        }
        console.log(
            `Sending code to: ${selectedCountryCode()}${phoneNumber()}`
        );
        setIsCodeSent(true);
        // Simulate code being sent
        setTimeout(() => console.log('Code sent successfully!'), 500);
    };

    // Final submission handler
    const handleFinish = () => {
        console.log('--- Form Data ---');
        console.log('Photo Uploaded:', !!profilePhotoUrl());
        console.log('ID Document Uploaded:', !!idDocumentFile());
        console.log(
            'Full Phone Number:',
            `${selectedCountryCode()}${phoneNumber()}`
        );
        console.log('Verification Code:', verificationCode());
        // Add actual form submission logic here
        console.log('Verification process finished! (Check console for data)');
    };

    // Determine if the "Finish" button should be active
    const canFinish = () =>
        !!profilePhotoUrl() &&
        !!idDocumentFile() &&
        isCodeSent() &&
        verificationCode().length === 6; // Assuming a 6-digit code

    const totalSteps = 5;
    const currentStep = 5;
    const progressWidth = `${(currentStep / totalSteps) * 100}%`;

    const handleSubmit = () => {};
    const handleCaret = () => {
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanSelfDescription
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 pt-12 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
        >
            <div class="w-full flex flex-col justify-start items-right gap-10">
                <div class="w-full flex flex-col justify-start items-right gap-10">
                    <button
                        class="flex items-center text-white text-2xl font-bold tracking-wide cursor-pointer"
                        onClick={handleCaret}
                        type="button"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.97508 4.94165L2.91675 9.99998L7.97508 15.0583"
                                stroke="#041820"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M17.0833 10H3.05835"
                                stroke="#041820"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
                        <div
                            class="h-2 left-0 top-0 bg-[#1376A1] rounded-full"
                            style={{ width: progressWidth }}
                        ></div>
                        <div style="align-self: stretch; color: #697586; font-size: 14px; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                            {currentStep}/5
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center gap-10">
                        <div class="w-full flex flex-col items-center gap-1">
                            <h1 class="w-full text-center text-dark-text text-2xl md:text-3xl lg:text-4xl font-bold leading-tight md:leading-snug">
                                Tell us a little about yourself
                            </h1>
                            <p class="text-center text-gray-text text-sm md:text-base font-normal leading-relaxed">
                                This will help clients trust and know you
                                better.
                            </p>
                        </div>
                    </div>

                    <div style="flex-direction: column; justify-content: flex-start; align-items: center; gap: 40px; display: flex">
                        <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
                            {/* 1. Profile Photo Upload */}
                            <div style="width: 100px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
                                <div style="align-self: stretch; color: #EEF2F6; font-size: 14px;  font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                                    Upload photo
                                </div>
                                <div style="align-self: stretch; height: 100px; position: relative;">
                                    {/* Input for File Selection (Hidden) */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePhotoChange}
                                        id="profile-photo-upload"
                                        style="opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer; z-index: 10;"
                                    />

                                    {/* Visual Container (Clickable Label) */}
                                    <label
                                        for="profile-photo-upload"
                                        style="display: block; width: 100%; height: 100%; cursor: pointer;"
                                    >
                                        <div style="width: 100px; height: 100px; position: absolute; background: #EEF2F6; overflow: hidden; border-radius: 100px;">
                                            {profilePhotoUrl() ? (
                                                <img
                                                    src={profilePhotoUrl()!}
                                                    alt="Profile Photo Preview"
                                                    style="width: 100%; height: 100%; object-fit: cover;"
                                                />
                                            ) : (
                                                // Placeholder Avatar SVG (Simplified)
                                                <div style="width: 80px; height: 80px; margin: 10px; position: absolute;">
                                                    <svg
                                                        width="80"
                                                        height="80"
                                                        viewBox="0 0 80 80"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            width="80"
                                                            height="80"
                                                            fill="transparent"
                                                        />
                                                        <circle
                                                            cx="40"
                                                            cy="20"
                                                            r="16"
                                                            fill="#364152"
                                                        />
                                                        <path
                                                            d="M60.6 68.3333C60.6 57.5733 51.35 48.3333 40 48.3333C28.65 48.3333 19.4 57.5733 19.4 68.3333H60.6Z"
                                                            fill="#364152"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Edit Icon (Simplified placeholder) */}
                                        <div style="width: 24px; height: 24px; position: absolute; right: 0; bottom: 0; background: white; border-radius: 50%; border: 2px solid #E3E8EF; display: flex; justify-content: center; align-items: center;">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9 1.5L10.5 3L4.5 9H3V7.5L9 1.5Z"
                                                    fill="#041820"
                                                />
                                            </svg>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* 2. ID Document Upload */}
                            <label
                                for="id-document-upload"
                                style="align-self: stretch; height: 140px; padding: 12px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px; flex-direction: column; justify-content: center; align-items: center; gap: 12px; display: flex; cursor: pointer; background: ${idDocumentFile() ? '#F3F6F9' : 'none'};"
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleIdDocumentChange}
                                    id="id-document-upload"
                                    style="display: none;"
                                />
                                <div style="text-align: center; color: #697586; font-size: 14px;  font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                                    {idDocumentFile()
                                        ? `File Selected: ${
                                              idDocumentFile()!.name
                                          }`
                                        : 'Upload any government ID or business document'}
                                </div>
                                {/* Upload Icon Placeholder */}
                                <div style="width: 16px; height: 16px; position: relative">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.6667 9.33333V12.6667C12.6667 13.02 12.5228 13.3594 12.2627 13.6195C12.0026 13.8796 11.6631 14.0234 11.3101 14.0234H4.66675C4.31378 14.0234 3.97435 13.8796 3.71428 13.6195C3.45421 13.3594 3.31033 13.02 3.31033 12.6667V9.33333M5.33341 6.66667L8.00008 4L10.6667 6.66667M8.00008 4V10.6667"
                                            stroke="#9AA4B2"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </label>

                            {/* 3. Phone Number Verification Section */}
                            <div style="width: 100%; align-self: stretch; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
                                {/* Phone Number Input Row */}
                                <div style="width: 100%; align-self: stretch; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
                                    {/* Country Code Dropdown */}
                                    <div style="width: 100%; justify-content: flex-start; align-items: center; gap: 16px; display: flex">
                                        <div style="width: 25%; padding: 12px 8px; background: #FCFCFD; border-radius: 8px; outline: 1px #E3E8EF solid; outline-offset: -1px; display: flex; justify-content: flex-start; align-items: center;">
                                            <select
                                                value={selectedCountryCode()}
                                                onChange={(e) =>
                                                    setSelectedCountryCode(
                                                        e.currentTarget.value
                                                    )
                                                }
                                                style="width: 100%; border: none; background: none; color: #0D121C; font-size: 14px;  font-weight: 600; appearance: none; padding-right: 20px; cursor: pointer;"
                                            >
                                                <For each={COUNTRIES}>
                                                    {(country) => (
                                                        <option
                                                            value={
                                                                country.dialCode
                                                            }
                                                        >
                                                            {`${country.dialCode}`}
                                                        </option>
                                                    )}
                                                </For>
                                            </select>
                                        </div>
                                        {/* Phone Number Input */}
                                        <div style="flex: 1 1 0; height: 46px; padding: 12px; border-radius: 8px; background: #FCFCFD; outline: 1px #CDD5DF solid; outline-offset: -0.50px; justify-content: flex-start; align-items: center; display: flex">
                                            <input
                                                type="tel"
                                                placeholder="Phone number"
                                                value={phoneNumber()}
                                                onInput={(e) =>
                                                    setPhoneNumber(
                                                        e.currentTarget.value.replace(
                                                            /[^0-9]/g,
                                                            ''
                                                        )
                                                    )
                                                } // Only allow digits
                                                disabled={isCodeSent()}
                                                style="width:100%; border: none; background: #FCFCFD; color: #1E1E1E; font-size: 14px;  font-weight: 400; line-height: 10px; outline: none;"
                                            />
                                        </div>
                                    </div>
                                    {/* Send Code Button */}
                                    <button
                                        onClick={handleSendCode}
                                        disabled={
                                            isCodeSent() ||
                                            phoneNumber().length < 8
                                        }
                                        style={`
                                            padding: 6px; 
                                            border-radius: 20px; 
                                            outline: 1px #1376A1 solid; 
                                            justify-content: center; 
                                            align-items: center; 
                                            background: ${
                                                isCodeSent() ||
                                                phoneNumber().length < 8
                                                    ? 'rgba(208, 228, 236, 0.16)'
                                                    : 'white'
                                            };
                                            color: ${
                                                isCodeSent() ||
                                                phoneNumber().length < 8
                                                    ? '#9AA4B2'
                                                    : '#1376A1'
                                            };
                                            border: none;
                                            cursor: ${
                                                isCodeSent() ||
                                                phoneNumber().length < 8
                                                    ? 'not-allowed'
                                                    : 'pointer'
                                            };
                                        `}
                                    >
                                        <div style="font-size: 14px; height: 35px; font-weight: 400; line-height: 15px;">
                                            {isCodeSent()
                                                ? 'Code Sent'
                                                : 'Send code'}
                                        </div>
                                    </button>
                                </div>
                                {/* Verification Code Input (Shown after code is sent) */}
                                {/* Helper Text */}
                            </div>
                            <Show when={isCodeSent()}>
                                <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
                                    <div style="flex: 1 1 0; height: 46px; padding: 12px; border-radius: 8px; outline: 1px #1376A1 solid; outline-offset: -0.50px; justify-content: flex-start; align-items: center; display: flex">
                                        <input
                                            type="text"
                                            placeholder="Enter verification code (6 digits)"
                                            value={verificationCode()}
                                            onInput={(e) =>
                                                setVerificationCode(
                                                    e.currentTarget.value.slice(
                                                        0,
                                                        6
                                                    )
                                                )
                                            }
                                            maxLength={6}
                                            style="width: 100%; border: none; background: none; color: #1E1E1E; font-size: 14px;  font-weight: 400; line-height: 22.40px; outline: none;"
                                        />
                                    </div>
                                </div>
                            </Show>
                            <div style="align-self: stretch; color: #202939; font-size: 12px; font-weight: 400; line-height: 19.20px; word-wrap: break-word">
                                We'll send a code to you to verify your phone
                                number.
                            </div>
                        </div>

                        {/* 4. Finish Button */}
                        <button
                            onClick={handleFinish}
                            disabled={!canFinish()}
                            style={`
                                align-self: stretch; 
                                height: 52px; 
                                padding: 12px 16px; 
                                border-radius: 8px; 
                                justify-content: center; 
                                align-items: center; 
                                gap: 10px; 
                                display: inline-flex;
                                border: none;
                                background: ${
                                    canFinish() ? '#1376A1' : '#E3E8EF'
                                }; 
                                cursor: ${
                                    canFinish() ? 'pointer' : 'not-allowed'
                                };
                                transition: background-color 0.2s;
                            `}
                        >
                            <div style="text-align: center; color: ${canFinish() ? 'white' : '#9AA4B2'}; font-size: 16px;  font-weight: 600; line-height: 25.60px; word-wrap: break-word">
                                Finish
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
