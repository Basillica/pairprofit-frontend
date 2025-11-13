import { Component, createSignal, For, Show } from 'solid-js';
import { LoginStore, StepTransitions } from './types';

interface LanguageEntry {
    id: number; // Unique identifier for keying and deletion
    language: string;
    proficiency: string;
    isRemovable: boolean;
}

export const ArtisansSelfDescription: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [description, setDescription] = createSignal('');
    const [currentLanguage, setCurrentLanguage] = createSignal('');
    const [currentProficiency, setCurrentProficiency] = createSignal('');

    const availableLanguages = [
        'Spanish',
        'French',
        'German',
        'Mandarin',
        'Japanese',
    ];
    const proficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Native'];
    const isFormValid = () =>
        description().length > 10 && selectedLanguages().length > 0;
    const [selectedLanguages, setSelectedLanguages] = createSignal<
        LanguageEntry[]
    >([
        {
            id: Date.now(),
            language: 'English',
            proficiency: 'Native',
            isRemovable: false,
        },
    ]);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanVerificationNTrust
        );
    };
    const isInputReady = () =>
        currentLanguage() !== '' && currentProficiency() !== '';

    const handleCaret = () => {
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanLocationNAvailability
        );
    };
    const addLanguage = () => {
        const lang = currentLanguage();
        const prof = currentProficiency();
        if (lang && prof) {
            // Check if the language is already added
            const isDuplicate = selectedLanguages().some(
                (entry) => entry.language === lang
            );
            if (isDuplicate) {
                console.log(`${lang} is already listed.`);
                return;
            }
            const newEntry: LanguageEntry = {
                id: Date.now(),
                language: lang,
                proficiency: prof,
                isRemovable: true,
            };
            setSelectedLanguages((prev) => [...prev, newEntry]);
            // Reset inputs
            setCurrentLanguage('');
            setCurrentProficiency('');
        }
    };
    const deleteLanguage = (id: number) => {
        setSelectedLanguages((prev) => prev.filter((entry) => entry.id !== id));
    };
    const totalSteps = 5;
    const currentStep = 4;
    const progressWidth = `${(currentStep / totalSteps) * 100}%`;

    return (
        <form
            onSubmit={handleSubmit}
            class="w-full px-4 flex flex-col items-center justify-start min-h-screen md:px-12 bg-[#FCFCFD]"
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
                        <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 32px; display: flex">
                            {/* Main Form Section */}
                            <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
                                {/* 1. Description Textarea (remains the same) */}
                                <div style="align-self: stretch; height: 115px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px; display: flex;">
                                    <textarea
                                        value={description()}
                                        onInput={(e) =>
                                            setDescription(
                                                e.currentTarget.value
                                            )
                                        }
                                        placeholder="Tell clients about your craft"
                                        rows={5}
                                        style="
                                            flex-grow: 1; 
                                            padding: 12px; 
                                            border: none; 
                                            border-radius: 8px;
                                            font-size: 14px; 
                                            font-family: Geist; 
                                            line-height: 22.40px;
                                            color: #1E1E1E;
                                            resize: none; 
                                            box-sizing: border-box;
                                        "
                                    />
                                </div>
                                {/* 2. List of Selected Languages */}
                                <For each={selectedLanguages()}>
                                    {(entry) => (
                                        <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                                            {/* Language and Proficiency Containers */}
                                            <div style="flex: 1; justify-content: flex-start; align-items: center; gap: 16px; display: flex">
                                                {/* Language Display (Left Slot) */}
                                                <div style="flex: 1; max-width: 272px; height: 46px; padding: 12px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px; justify-content: flex-start; align-items: center; display: flex; background: ${entry.isRemovable ? '#FFFFFF' : '#F3F6F9'};">
                                                    <div style="text-align: left;">
                                                        <span style="text-align: center; color: #697586; font-size: 14px; font-family: Geist; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                                                            {entry.language}
                                                        </span>
                                                        {/* Show the required message only for the non-removable language */}
                                                        <Show
                                                            when={
                                                                !entry.isRemovable
                                                            }
                                                        >
                                                            <span style="color: #697586; font-size: 12px; font-family: Geist; font-weight: 400; line-height: 19.20px; word-wrap: break-word">
                                                                &nbsp;(all
                                                                profile includes
                                                                this)
                                                            </span>
                                                        </Show>
                                                    </div>
                                                </div>

                                                {/* Proficiency Display (Right Slot) */}
                                                <div style="flex: 1; max-width: 272px; height: 46px; padding: 12px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px; justify-content: space-between; align-items: center; display: flex; background: ${entry.isRemovable ? '#FFFFFF' : '#F3F6F9'};">
                                                    <div style="text-align: center; color: #697586; font-size: 14px; font-family: Geist; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                                                        {entry.proficiency}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delete Button (Conditional) */}
                                            <Show when={entry.isRemovable}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteLanguage(entry.id)
                                                    }
                                                    style="width: 24px; height: 24px; border: none; background: none; cursor: pointer; padding: 0;"
                                                    aria-label={`Remove ${entry.language}`}
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10.2004 4.8H13.8004C13.8004 4.32261 13.6107 3.86478 13.2732 3.52721C12.9356 3.18965 12.4778 3 12.0004 3C11.523 3 11.0652 3.18965 10.7276 3.52721C10.39 3.86478 10.2004 4.32261 10.2004 4.8ZM9.00039 4.8C9.00039 4.00435 9.31646 3.24129 9.87907 2.67868C10.4417 2.11607 11.2047 1.8 12.0004 1.8C12.796 1.8 13.5591 2.11607 14.1217 2.67868C14.6843 3.24129 15.0004 4.00435 15.0004 4.8H21.0004C21.1595 4.8 21.3121 4.86322 21.4247 4.97574C21.5372 5.08826 21.6004 5.24087 21.6004 5.4C21.6004 5.55913 21.5372 5.71175 21.4247 5.82427C21.3121 5.93679 21.1595 6 21.0004 6H19.7356L18.3028 18.4128C18.2015 19.2902 17.7812 20.0998 17.1218 20.6875C16.4625 21.2752 15.61 21.5999 14.7268 21.6H9.27399C8.39074 21.5999 7.53833 21.2752 6.87895 20.6875C6.21958 20.0998 5.79927 19.2902 5.69799 18.4128L4.26519 6H3.00039C2.84126 6 2.68865 5.93679 2.57613 5.82427C2.4636 5.71175 2.40039 5.55913 2.40039 5.4C2.40039 5.24087 2.4636 5.08826 2.57613 4.97574C2.68865 4.86322 2.84126 4.8 3.00039 4.8H9.00039ZM6.88959 18.276C6.9573 18.8609 7.23765 19.4005 7.67729 19.7921C8.11694 20.1837 8.68521 20.4001 9.27399 20.4H14.7268C15.3156 20.4001 15.8838 20.1837 16.3235 19.7921C16.7631 19.4005 17.0435 18.8609 17.1112 18.276L18.5272 6H5.47359L6.88959 18.276ZM10.2004 9C10.3595 9 10.5121 9.06322 10.6247 9.17574C10.7372 9.28826 10.8004 9.44087 10.8004 9.6V16.8C10.8004 16.9591 10.7372 17.1117 10.6247 17.2243C10.5121 17.3368 10.3595 17.4 10.2004 17.4C10.0413 17.4 9.88865 17.3368 9.77613 17.2243C9.6636 17.1117 9.60039 16.9591 9.60039 16.8V9.6C9.60039 9.44087 9.6636 9.28826 9.77613 9.17574C9.88865 9.06322 10.0413 9 10.2004 9ZM14.4004 9.6C14.4004 9.44087 14.3372 9.28826 14.2247 9.17574C14.1121 9.06322 13.9595 9 13.8004 9C13.6413 9 13.4886 9.06322 13.3761 9.17574C13.2636 9.28826 13.2004 9.44087 13.2004 9.6V16.8C13.2004 16.9591 13.2636 17.1117 13.3761 17.2243C13.4886 17.3368 13.6413 17.4 13.8004 17.4C13.9595 17.4 14.1121 17.3368 14.2247 17.2243C14.3372 17.1117 14.4004 16.9591 14.4004 16.8V9.6Z"
                                                            fill="#697586"
                                                        />
                                                    </svg>
                                                </button>
                                            </Show>
                                            <Show when={!entry.isRemovable}>
                                                <div style="width: 24px; height: 24px;"></div>
                                            </Show>
                                        </div>
                                    )}
                                </For>

                                {/* 3. Dropdowns for Adding New Language (Hidden when not adding) */}
                                <Show
                                    when={
                                        selectedLanguages().length
                                        // selectedLanguages().filter(
                                        //     (e) => e.isRemovable
                                        // ).length
                                    }
                                >
                                    <div style="width: 100%; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
                                        {/* Language Dropdown Input */}
                                        <div style="width: 50%; height: 46px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px;">
                                            <select
                                                value={currentLanguage()}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setCurrentLanguage(
                                                        e.currentTarget.value
                                                    );
                                                }}
                                                style="width: 100%; height: 100%; padding: 12px; border: none; border-radius: 8px; background-color: transparent; font-size: 14px; font-family: Geist; line-height: 22.40px; color: #697586; appearance: none; cursor: pointer;"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Language
                                                </option>
                                                <For each={availableLanguages}>
                                                    {(lang) => (
                                                        <option value={lang}>
                                                            {lang}
                                                        </option>
                                                    )}
                                                </For>
                                            </select>
                                        </div>

                                        {/* Proficiency Dropdown Input */}
                                        <div style="width: 50%; height: 46px; border-radius: 8px; outline: 1px #CDD5DF solid; outline-offset: -0.50px;">
                                            <select
                                                value={currentProficiency()}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setCurrentProficiency(
                                                        e.currentTarget.value
                                                    );
                                                }}
                                                style="width: 100%; height: 100%; padding: 12px; border: none; border-radius: 8px; background-color: transparent; font-size: 14px; font-family: Geist; line-height: 22.40px; color: #697586; appearance: none; cursor: pointer;"
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Proficiency
                                                </option>
                                                <For each={proficiencies}>
                                                    {(level) => (
                                                        <option value={level}>
                                                            {level}
                                                        </option>
                                                    )}
                                                </For>
                                            </select>
                                        </div>
                                        <div style="width: 24px; height: 24px;"></div>
                                    </div>
                                </Show>

                                {/* 4. Action Button (Add or Next) */}
                                <button
                                    onClick={addLanguage} // Only call addLanguage if inputs are ready
                                    disabled={!isInputReady()}
                                    style={`
                                        padding: 8px 10px; 
                                        background: ${
                                            isInputReady()
                                                ? 'none'
                                                : 'rgba(208, 228, 236, 0.16)'
                                        };
                                        border-radius: 24px; 
                                        outline: 1px ${
                                            isInputReady()
                                                ? '#1376A1'
                                                : '#CDD5DF'
                                        } solid; 
                                        outline-offset: -1px; 
                                        justify-content: flex-start; 
                                        align-items: flex-start; 
                                        gap: 8px; 
                                        display: inline-flex;
                                        border: none;
                                        cursor: ${
                                            isInputReady()
                                                ? 'pointer'
                                                : 'not-allowed'
                                        };
                                        transition: all 0.2s;
                                    `}
                                >
                                    <div style="width: 24px; height: 24px; position: relative">
                                        {/* Plus Icon SVG (Matching the design) */}
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H13V16H11V13H8V11H11V8H13V11H16V13Z"
                                                fill={
                                                    isInputReady()
                                                        ? '#1376A1'
                                                        : '#CDD5DF'
                                                }
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        style={`text-align: center; color: ${
                                            isInputReady()
                                                ? '#1376A1'
                                                : '#9AA4B2'
                                        }; font-size: 14px; font-family: Geist; font-weight: 400; line-height: 22.40px; word-wrap: break-word`}
                                    >
                                        Add a language
                                    </div>
                                </button>
                            </div>
                            {/* Next Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid()}
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
                                    cursor: ${
                                        isFormValid()
                                            ? 'pointer'
                                            : 'not-allowed'
                                    };
                                    background: ${
                                        isFormValid() ? '#1376A1' : '#E3E8EF'
                                    }; 
                                    color: ${
                                        isFormValid() ? '#FFFFFF' : '#9AA4B2'
                                    }; 
                                    font-size: 16px; 
                                    font-family: Geist; 
                                    font-weight: 600; 
                                    line-height: 25.60px;
                                    transition: background-color 0.2s;
                                `}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
