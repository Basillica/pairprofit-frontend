import {
    createSignal,
    For,
    Show,
    type Component,
    createEffect,
    onCleanup,
    Accessor,
    Setter,
} from 'solid-js';
import { Portal } from 'solid-js/web';

interface JobPost {
    title: string;
    category: string;
    subcategory: string;
    description: string;
    location: string;
    timeline: string;
    budget: string;
    jobType: string;
    attachment: File | null;
}

// --- 2. Reusable Dropdown & Input Components ---
// Simplified Icon for Dropdowns
const Icons = {
    ChevronDown: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    ),
    Image: (props: { class?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class={props.class}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5 1.5-1.454-1.454a2.25 2.25 0 0 1-3.182 0L5.25 17.25m8.25-9a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 4.5v3.75c0 1.042-.166 2.071-.482 3.093M17.25 4.5V21.75a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V4.5a2.25 2.25 0 0 1 2.25-2.25h10.5M12 2.25h4.5a2.25 2.25 0 0 1 2.25 2.25v3.75"
            />
        </svg>
    ),
};

// Custom Select Dropdown Component (Single Select)
const SelectInput: Component<{
    label: string;
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
}> = (props) => {
    const [isOpen, setIsOpen] = createSignal(false);
    let containerRef: HTMLDivElement | undefined;
    const containerClass = () => `
        relative w-full 
        ${isOpen() ? 'z-50' : 'z-20'} 
    `;
    // Click-Away Logic (Simplified)
    createEffect(() => {
        if (isOpen()) {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef && !containerRef.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            onCleanup(() => {
                document.removeEventListener('mousedown', handleClickOutside);
            });
        }
    });

    const selectOption = (option: string) => {
        props.onChange(option);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} class={containerClass()}>
            <label class="block mb-2 text-base font-medium text-gray-800">
                {props.label}
            </label>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                class="flex justify-between items-center w-full h-[46px] px-3 py-3 bg-white border border-gray-300 rounded-lg text-sm font-normal text-left transition-colors hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={isOpen()}
            >
                <span class={props.value ? 'text-gray-900' : 'text-gray-500'}>
                    {props.value || props.placeholder}
                </span>
                <Icons.ChevronDown
                    class={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen() ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </button>

            <Show when={isOpen()}>
                <div class="absolute mt-1 w-full rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-30">
                    <div class="py-1">
                        <For each={props.options}>
                            {(option) => (
                                <div
                                    onClick={() => selectOption(option)}
                                    class={`block px-4 py-2 text-sm cursor-pointer transition-colors
                          ${
                              props.value === option
                                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                  : 'text-gray-700 hover:bg-gray-100'
                          }`}
                                >
                                    {option}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
};

// Simple Text Input
const TextInput: Component<{
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    isTextArea?: boolean;
}> = (props) => {
    const heightClass = props.isTextArea
        ? 'h-[115px] pt-3 resize-none'
        : 'h-[46px]';
    console.log(props, 'props in text input');
    return (
        <div class="w-full">
            <label class="block mb-2 text-base font-medium text-gray-800">
                {props.label}
            </label>
            <input
                value={props.value}
                onInput={(e: any) => props.onChange(e.currentTarget.value)}
                placeholder={props.placeholder}
                // rows={props.isTextArea ? 4 : undefined}
                class={`w-full ${heightClass} px-3 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 transition-colors 
                hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
        </div>
    );
};

const TextArea: Component<{
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    isTextArea?: boolean;
}> = (props) => {
    const heightClass = props.isTextArea
        ? 'h-[115px] pt-3 resize-none'
        : 'h-[46px]';
    console.log(props, 'props in text input');
    return (
        <div class="w-full">
            <label class="block mb-2 text-base font-medium text-gray-800">
                {props.label}
            </label>
            <textarea
                value={props.value}
                onInput={(e: any) => props.onChange(e.currentTarget.value)}
                placeholder={props.placeholder}
                // rows={props.isTextArea ? 4 : undefined}
                class={`w-full ${heightClass} px-3 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 transition-colors 
                hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
        </div>
    );
};

// File Upload Input
const FileUploadInput: Component<{
    value: File | null;
    label: string;
    optional?: boolean;
    onChange: (file: File | null) => void;
}> = (props) => {
    let fileInputRef: HTMLInputElement | undefined;
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);

    const handleFileChange = (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            console.log(files[0].name, 'selected file');
            setSelectedFile(files[0]);
            props.onChange(files[0]);
        } else {
            props.onChange(null);
        }
    };

    return (
        <div class="w-full">
            <label class="block mb-2 text-base font-medium text-gray-800">
                {props.label}
                {props.optional && (
                    <span class="text-sm font-normal text-gray-500">
                        {' '}
                        (optional)
                    </span>
                )}
            </label>

            <div
                onClick={() => fileInputRef?.click()}
                class="w-full h-[115px] p-3 border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center gap-2 text-center cursor-pointer hover:border-indigo-400 transition-colors"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    class="hidden"
                    aria-label="File Upload"
                />
                <div class="flex flex-col items-center gap-1">
                    <Icons.Image class="w-6 h-6 text-gray-500" />
                    <span
                        class={`text-sm font-medium ${
                            props.value ? 'text-gray-900' : 'text-gray-500'
                        }`}
                    >
                        {selectedFile()
                            ? selectedFile()!.name
                            : 'Upload a file'}
                    </span>
                    <Show when={props.value}>
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                                props.onChange(null);
                            }}
                            class="text-xs text-red-500 hover:underline"
                        >
                            (Remove)
                        </span>
                    </Show>
                </div>
            </div>
        </div>
    );
};

// --- 3. Main Post Job Form Component ---
export const PostJobForm: Component<{
    isOpen: Accessor<boolean>;
    closeModal: Setter<boolean>;
}> = (props) => {
    const [formData, setFormData] = createSignal<JobPost>({
        title: '',
        category: '',
        subcategory: '',
        description: '',
        location: '',
        timeline: '',
        budget: '',
        jobType: 'One-time job',
        attachment: null,
    });

    const updateField = (field: keyof JobPost, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveDraft = (e: Event) => {
        e.preventDefault();
        console.log('Saving Draft:', formData());
        props.closeModal(!props.isOpen());
        // Add API call logic here
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        console.log('Submitting Job:', formData());
        props.closeModal(!props.isOpen());
        // Add API call logic here
    };

    // Dummy options for the dropdowns
    const categoryOptions = [
        'Plumbing',
        'Electrical',
        'Carpentry',
        'HVAC',
        'Painting',
    ];
    const subCategoryOptions = [
        'Plumbing',
        'Electrical',
        'Carpentry',
        'HVAC',
        'Painting',
    ];
    const timelineOptions = [
        'Urgent (Next 24 Hours)',
        'Within a Week',
        'Flexible',
    ];
    const jobTypeOptions = ['One-time job', 'Ongoing Project'];

    return (
        // Main Container Styling (Responsive and centered)
        <Portal>
            <Show when={props.isOpen()}>
                <div
                    class="flex justify-center p-4 pt-100 h-screen overflow-y-auto"
                    classList={{
                        'modal-overlay': true,
                        active: props.isOpen(),
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        class="w-full max-w-2xl p-8 sm:p-10 lg:p-12 bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col gap-8"
                    >
                        {/* Header */}
                        <div class="flex flex-col gap-1">
                            <h2 class="text-2xl font-semibold text-gray-900">
                                Post a Job
                            </h2>
                            <p class="text-base text-gray-600">
                                Fill in the details to connect with the right
                                artisan.
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div class="flex flex-col gap-5">
                            <TextInput
                                label="Job Title"
                                value={formData().title}
                                placeholder="e.g., Fix leaking kitchen sink"
                                onChange={(v) => updateField('title', v)}
                            />

                            <SelectInput
                                label="Category"
                                value={formData().category}
                                placeholder="Select service type"
                                options={categoryOptions}
                                onChange={(v) => updateField('category', v)}
                            />

                            <SelectInput
                                label="Subcategory"
                                value={formData().category}
                                placeholder="Select service subcategory"
                                options={subCategoryOptions}
                                onChange={(v) => updateField('subcategory', v)}
                            />

                            <TextArea
                                label="Description"
                                value={formData().description}
                                placeholder="Describe the job in detail..."
                                isTextArea
                                onChange={(v) => updateField('description', v)}
                            />

                            <TextInput
                                label="Location"
                                value={formData().location}
                                placeholder="Enter address or area"
                                onChange={(v) => updateField('location', v)}
                            />

                            <SelectInput
                                label="Timeline"
                                value={formData().timeline}
                                placeholder="Select urgency"
                                options={timelineOptions}
                                onChange={(v) => updateField('timeline', v)}
                            />

                            <TextInput
                                label="Budget"
                                value={formData().budget}
                                placeholder="Enter budget (N)"
                                onChange={(v) => updateField('budget', v)}
                            />

                            <SelectInput
                                label="Job Type"
                                value={formData().jobType}
                                placeholder="One-time job"
                                options={jobTypeOptions}
                                onChange={(v) => updateField('jobType', v)}
                            />

                            <FileUploadInput
                                label="Attachment"
                                value={formData().attachment}
                                optional
                                onChange={(f) => updateField('attachment', f)}
                            />
                        </div>

                        {/* Form Actions (Buttons) */}
                        <div class="flex justify-between items-center pt-2">
                            {/* Save as Draft Button */}
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                class="px-4 py-3 border border-[#1376A1] text-[#1376A1] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Save as Draft
                            </button>

                            {/* Post Job Button */}
                            <button
                                type="submit"
                                class="px-4 py-3 bg-[#1376A1] text-white font-semibold rounded-lg hover:bg-[#0f5e85] transition-colors"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </Show>
        </Portal>
    );
};
