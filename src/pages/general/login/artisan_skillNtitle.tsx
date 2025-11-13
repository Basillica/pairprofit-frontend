import { Component, createSignal, For } from 'solid-js';
import { LoginStore, StepTransitions } from './types';

export const ArtisansSkillNTitle: Component<{
    loginStore: LoginStore;
}> = (props) => {
    const [title, setTitle] = createSignal('Culinary Chef');
    const [skills, setSkills] = createSignal([
        'Home made pastries',
        'Soups',
        'Salad',
    ]);
    const [newSkillInput, setNewSkillInput] = createSignal('');
    const maxSkills = 10;
    const [selectedYears, setSelectedYears] = createSignal<string>(
        'Skills / Specialization'
    ); // For the dropdown

    const addSkill = (e: Event) => {
        e.preventDefault(); // Prevent form submission if this is part of a form
        const trimmedSkill = newSkillInput().trim();
        if (
            trimmedSkill &&
            skills().length < maxSkills &&
            !skills().includes(trimmedSkill)
        ) {
            setSkills([...skills(), trimmedSkill]);
            setNewSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills().filter((skill) => skill !== skillToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addSkill(e);
        }
    };

    // 2. Handler
    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log();
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanLocationNAvailability
        );
    };

    const handleCaret = () => {
        props.loginStore.updateStore(
            'currentStep',
            StepTransitions.ArtisanCreateAccount
        );
    };

    const totalSteps = 5;
    const currentStep = 2;
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
                            style={{ width: progressWidth }} // Use SolidJS dynamic style binding
                        ></div>
                        <div style="align-self: stretch; color: #697586; font-size: 14px; font-weight: 400; line-height: 22.40px; word-wrap: break-word">
                            {currentStep}/5
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center justify-center gap-10 md:gap-10 p-4">
                        <div class="flex flex-col justify-start items-center gap-1">
                            <h1 class="text-3xl font-bold text-gray-900 text-center leading-snug">
                                Now add a title & skill to tell the world what
                                you do!
                            </h1>
                            <p class="text-base text-gray-600 text-center leading-relaxed">
                                This is the very first thing the clients sees or
                                searches for, so make it count!
                            </p>
                        </div>
                        {/* Form Fields Section */}
                        <div class="w-full flex flex-col items-start gap-8 max-w-lg mx-auto">
                            {' '}
                            {/* Max width for content, centered */}
                            {/* Title Input */}
                            <div class="w-full flex flex-col items-start gap-4">
                                <div class="w-full h-11 px-3 py-2 border border-primary-blue rounded-lg flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Culinary Chef"
                                        class="flex-grow bg-transparent outline-none text-primary-blue text-sm font-normal placeholder-primary-blue"
                                        value={title()}
                                        onInput={(e) =>
                                            setTitle(e.currentTarget.value)
                                        }
                                    />
                                </div>

                                {/* Skill Tags Input */}
                                <div class="w-full flex flex-col items-end gap-2">
                                    <div class="w-full p-3 border border-border-gray rounded-lg flex flex-wrap items-center gap-2">
                                        <For each={skills()}>
                                            {(skill) => (
                                                <div class="flex items-center gap-1 bg-[#1376A1] rounded-full px-2 py-1 text-white text-sm font-normal">
                                                    <button
                                                        onClick={() =>
                                                            removeSkill(skill)
                                                        }
                                                        class="p-0.5 rounded-full hover:bg-white hover:text-primary-blue focus:outline-none focus:ring-1 focus:ring-white"
                                                        aria-label={`Remove ${skill}`}
                                                    >
                                                        <svg
                                                            class="w-3 h-3 stroke-current"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M18 6L6 18M6 6L18 18"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <span>{skill}</span>
                                                </div>
                                            )}
                                        </For>
                                        <input
                                            type="text"
                                            placeholder="Enter skill here"
                                            class="flex-grow min-w-[100px] bg-transparent outline-none text-light-gray-text text-sm font-normal placeholder-light-gray-text"
                                            value={newSkillInput()}
                                            onInput={(e) =>
                                                setNewSkillInput(
                                                    e.currentTarget.value
                                                )
                                            }
                                            onKeyDown={handleKeyDown}
                                            disabled={
                                                skills().length >= maxSkills
                                            }
                                        />
                                    </div>
                                    <div class="text-right text-light-gray-text text-xs font-normal">
                                        Max {maxSkills - skills().length} skills
                                        left
                                    </div>
                                </div>

                                {/* Dropdown for Years */}
                                <div class="w-full h-11 px-3 py-2 border border-primary-blue rounded-lg flex items-center justify-between relative">
                                    <select
                                        class="absolute inset-0 w-full h-full bg-transparent appearance-none text-primary-blue text-sm font-normal outline-none cursor-pointer px-3"
                                        value={selectedYears()}
                                        onInput={(e) =>
                                            setSelectedYears(
                                                e.currentTarget.value
                                            )
                                        }
                                    >
                                        <option value="" disabled selected>
                                            Skills / Specialization
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5+">5+</option>
                                    </select>
                                    <span class="text-primary-blue text-sm font-normal pointer-events-none">
                                        {selectedYears()}
                                    </span>{' '}
                                    {/* Display selected value */}
                                    {/* Custom Dropdown Arrow */}
                                    <div class="pointer-events-none absolute right-3 flex items-center justify-center">
                                        <svg
                                            class="w-4 h-4 text-light-gray-text"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="self-stretch flex flex-col justify-start items-center gap-3">
                                <button
                                    type="submit"
                                    class="self-stretch h-12 px-4 py-3 bg-cyan-700 rounded-lg inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-relaxed
                                       transition duration-150 hover:bg-[#1376A1] focus:outline-none focus:ring-4 focus:ring-cyan-700/50 cursor-pointer"
                                >
                                    Next
                                </button>
                                <div class="self-stretch text-center text-sm leading-snug">
                                    <span class="text-slate-800 font-normal">
                                        Already have an account?{' '}
                                    </span>
                                    <span
                                        class="text-sky-800 font-semibold cursor-pointer"
                                        onClick={() =>
                                            props.loginStore.updateStore(
                                                'currentStep',
                                                StepTransitions.ClientWelcomeBack
                                            )
                                        }
                                    >
                                        Sign In here
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
