import { Component, createSignal, For, Setter, Show } from 'solid-js';

type Language = {
    id: number;
    name: string;
    level: 'Fluent' | 'Conversational' | 'Basic';
};

const INITIAL_LANGUAGES: Language[] = [
    { id: 1, name: 'English', level: 'Fluent' },
    { id: 2, name: 'Spanish', level: 'Conversational' },
    { id: 3, name: 'French', level: 'Conversational' },
    { id: 4, name: 'German', level: 'Basic' },
];

// Close/X Icon for the Header
const CloseIcon: Component = () => (
    <svg
        class="w-7 h-7 text-gray-900"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// Edit/Pencil Icon
const EditIcon: Component = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17.75 2.25a2.807 2.807 0 0 0-3.972 0L3.217 12.812a2.6 2.6 0 0 0-.663 1.133l-1.105 3.947a.536.536 0 0 0 .66.66l3.945-1.105a2.57 2.57 0 0 0 1.134-.663L17.75 6.222a2.807 2.807 0 0 0 0-3.972m-3.214.757a1.737 1.737 0 0 1 2.456 2.457l-1.1 1.1-2.456-2.458zm-1.857 1.857 2.457 2.458-8.706 8.705a1.5 1.5 0 0 1-.664.388l-3.03.848.848-3.029c.07-.25.205-.48.389-.664z"
            fill="#000"
        />
    </svg>
);

// Delete/Trash Icon
const DeleteIcon: Component = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m5.645 5.333.677 11.374a.666.666 0 0 0 .665.626h6.026a.667.667 0 0 0 .665-.626l.677-11.374zm9.713 0-.681 11.433a1.666 1.666 0 0 1-1.664 1.567H6.987a1.667 1.667 0 0 1-1.664-1.567l-.68-11.433H2.917V4.75a.417.417 0 0 1 .416-.417h13.334a.417.417 0 0 1 .416.417v.583zM11.667 2.5a.417.417 0 0 1 .416.417V3.5H7.917v-.583a.417.417 0 0 1 .416-.417zm-3.75 5h1l.416 7.5h-1zm3.166 0h1l-.416 7.5h-1z"
            fill="#000"
        />
    </svg>
);

const MenuIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
            fill="#121926"
        />
    </svg>
);

const LanguageActions: Component<{
    language: Language;
    onClose: () => void;
}> = (props) => {
    // Placeholder actions
    const handleEdit = () => {
        alert(`Editing ${props.language.name}`);
        props.onClose();
    };

    const handleDelete = () => {
        if (
            confirm(`Are you sure you want to delete ${props.language.name}?`)
        ) {
            alert(`${props.language.name} deleted.`);
        }
        props.onClose();
    };

    return (
        <div class="absolute right-0 top-20 sm:right-0 sm:left-auto z-20 w-[169px] p-2 bg-white shadow-xl rounded-xl flex flex-col justify-start items-start origin-top-right border border-gray-100">
            <button
                onClick={handleEdit}
                class="w-full p-2 rounded-lg flex justify-start items-center gap-2 text-sm font-normal text-gray-800 transition hover:bg-gray-100 cursor-pointer"
            >
                <EditIcon />
                <span>Edit</span>
            </button>
            <button
                onClick={handleDelete}
                class="w-full p-2 rounded-lg flex justify-start items-center gap-2 text-sm font-normal text-gray-800 transition hover:bg-gray-100 cursor-pointer"
            >
                <DeleteIcon />
                <span>Delete</span>
            </button>
        </div>
    );
};

// --- Language Item Component ---
const LanguageItem: Component<{ language: Language }> = (props) => {
    // State to track which language's menu is open. Null if none.
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);

    // Close menu when clicking outside (simple mechanism)
    const handleToggle = (e: MouseEvent) => {
        e.stopPropagation(); // Prevent the click from immediately propagating and closing it
        setIsMenuOpen(!isMenuOpen());
    };

    return (
        <div class="relative w-full">
            <div class="w-full p-4 border border-gray-300 rounded-xl flex justify-between items-center">
                <div class="flex flex-col justify-start items-start gap-3">
                    <p class="text-lg sm:text-xl font-semibold text-gray-900 leading-7">
                        {props.language.name}
                    </p>
                    <p class="text-base font-normal text-gray-700 leading-6">
                        {props.language.level}
                    </p>
                </div>

                {/* Menu Button */}
                <button
                    onClick={handleToggle}
                    class="p-1 rounded-full hover:bg-gray-100 transition relative"
                    aria-label={`Options for ${props.language.name}`}
                >
                    <MenuIcon />
                </button>
            </div>

            {/* Context Menu */}
            <Show when={isMenuOpen()}>
                <LanguageActions
                    language={props.language}
                    onClose={() => setIsMenuOpen(false)}
                />
            </Show>
        </div>
    );
};

export const LanguagesEditor: Component<{
    setProfileLanguage: Setter<boolean>;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(true); // Control the visibility of the panel
    const [languages] = createSignal(INITIAL_LANGUAGES);

    return (
        <div
            // class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-300"
            class="fixed inset-0 z-40 bg-gray-200 bg-opacity-50 transition-opacity duration-300"
            onClick={() => props.setProfileLanguage(false)}
        >
            <div
                class="fixed z-50 transition-transform duration-300 
                       bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 sm:bottom-0 
                       w-full sm:max-w-[600px] sm:h-full h-[80vh] bg-white rounded-t-2xl sm:rounded-none shadow-2xl"
                style={{
                    transform: isOpen()
                        ? 'translateY(0) translateX(0)'
                        : 'translateY(100%) translateX(0) sm:translateY(0) sm:translateX(100%)',
                }}
            >
                {/* Scrollable Content Wrapper */}
                <div class="flex flex-col h-full">
                    {/* Content Area (Scrollable part) */}
                    <div class="flex-grow flex flex-col justify-start items-start gap-8 sm:gap-10 overflow-y-auto">
                        {/* 1. Header */}
                        <div class="sticky top-0 w-full px-4 sm:px-10 py-4 sm:py-6 border-b border-gray-200 bg-white flex justify-between items-center z-10">
                            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 leading-9">
                                Languages
                            </h2>
                            <button
                                class="cursor-pointer"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* 2. Language List */}
                        <div class="w-full px-4 sm:px-10 flex flex-col gap-5">
                            <For each={languages()}>
                                {(lang) => <LanguageItem language={lang} />}
                            </For>
                        </div>
                    </div>

                    {/* 3. Footer (Add Language Button) */}
                    <div class="sticky bottom-0 w-full px-4 sm:px-10 py-4 border-t border-gray-300 bg-white flex justify-end items-center z-10">
                        <button
                            onClick={() => alert('Add New Language logic')}
                            class="px-5 py-3 bg-[#1376A1] rounded-lg text-white font-semibold text-base transition hover:bg-sky-800"
                        >
                            + Add Language
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
