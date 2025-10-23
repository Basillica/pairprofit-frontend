import { For } from 'solid-js';

export const settingsNav = [
    {
        title: 'Account',
        links: [
            { label: 'Profile Information', id: 'profile' },
            { label: 'Payment Method', id: 'payment' },
            { label: 'Security', id: 'security' },
        ],
    },
    {
        title: 'Preferences',
        links: [
            { label: 'Language & Region', id: 'language' },
            { label: 'Notifications', id: 'notifications' },
        ],
    },
    {
        title: 'Support & Legal',
        links: [
            { label: 'Help Center', id: 'help' },
            { label: 'Terms & Conditions', id: 'terms' },
        ],
    },
];

// 2. Navigation Link Component (Used for both Sidebar and Mobile Tabs)
export const SidebarLink = (props: {
    label: string;
    id: string;
    active: string;
    onClick: (id: string) => void;
    isMobile?: boolean;
    classList?: any;
}) => (
    <button
        onClick={() => props.onClick(props.id)}
        class={`text-left text-lg leading-7 transition-all w-full md:w-auto p-2.5 whitespace-nowrap  cursor-pointer
            ${
                props.active === props.id
                    ? 'text-[#1376A1] border-b-2 border-[#1376A1]' // Active state
                    : 'text-gray-700 text-sm border-b-2 border-transparent hover:text-gray-900' // Inactive state
            }
        `}
    >
        {props.label}
    </button>
    // // Desktop Sidebar Specific (md: prefix) - adds left border for visual hierarchy
    //         md:border-l-4 md:py-2 md:pl-4 md:pr-0 ${
    //             props.active === props.id
    //                 ? 'md:border-blue-700'
    //                 : 'md:border-transparent'
    //         }
);

export const CreditCardIcon = () => (
    <div class="relative w-6 h-5">
        <svg
            width="29"
            height="22"
            viewBox="0 0 29 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.273 21.89v-1.456c0-.558-.348-.922-.945-.922-.298 0-.622.097-.845.413-.174-.267-.423-.413-.796-.413a.81.81 0 0 0-.696.34v-.291h-.522v2.33h.522v-1.287c0-.412.224-.606.572-.606s.522.218.522.606v1.287h.522v-1.287c0-.412.249-.606.572-.606.348 0 .522.218.522.606v1.287zm7.733-2.33h-.845v-.703h-.522v.704h-.473v.46h.473v1.069c0 .534.223.85.82.85.224 0 .473-.074.647-.17l-.15-.438a.83.83 0 0 1-.447.122c-.249 0-.348-.146-.348-.389v-1.043h.845zm4.426-.048a.7.7 0 0 0-.621.34v-.291h-.523v2.33h.523v-1.31c0-.39.174-.608.497-.608.1 0 .224.025.323.049l.15-.485c-.1-.025-.25-.025-.349-.025m-6.689.243c-.248-.17-.596-.243-.97-.243-.596 0-.994.292-.994.753 0 .388.298.606.82.68l.25.024c.273.048.422.12.422.242 0 .17-.199.291-.547.291s-.622-.121-.796-.242l-.248.388c.273.194.646.291 1.019.291.696 0 1.094-.315 1.094-.752 0-.413-.323-.631-.82-.704l-.25-.024c-.223-.024-.397-.073-.397-.218 0-.17.174-.267.448-.267.298 0 .596.12.746.194zm13.875-.243a.7.7 0 0 0-.621.34v-.291h-.523v2.33h.523v-1.31c0-.39.174-.607.497-.607.1 0 .224.024.323.048l.15-.485c-.1-.025-.25-.025-.349-.025m-6.664 1.214c0 .704.498 1.213 1.269 1.213.348 0 .596-.073.845-.267l-.249-.412a1.02 1.02 0 0 1-.621.218c-.423 0-.721-.291-.721-.752 0-.437.298-.728.72-.752.225 0 .423.072.622.218l.249-.413c-.249-.194-.497-.267-.845-.267-.771 0-1.269.51-1.269 1.214m4.824 0V19.56h-.522v.291c-.174-.218-.422-.34-.746-.34-.671 0-1.193.51-1.193 1.214s.522 1.213 1.193 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.914 0c0-.413.273-.752.72-.752.423 0 .722.315.722.752 0 .412-.299.752-.721.752-.448-.024-.721-.34-.721-.752m-6.241-1.214c-.697 0-1.194.486-1.194 1.214s.497 1.213 1.218 1.213c.348 0 .697-.097.97-.315l-.249-.364a1.2 1.2 0 0 1-.696.242c-.323 0-.646-.145-.721-.558h1.765v-.194c.026-.752-.422-1.238-1.093-1.238m0 .437c.322 0 .547.194.596.558h-1.243c.05-.315.273-.558.646-.558m12.954.777v-2.087h-.522v1.213c-.174-.218-.423-.34-.746-.34-.671 0-1.193.51-1.193 1.214s.522 1.213 1.193 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.914 0c0-.413.273-.752.72-.752.424 0 .722.315.722.752 0 .412-.299.752-.721.752-.448-.024-.721-.34-.721-.752m-17.456 0V19.56h-.522v.291c-.174-.218-.423-.34-.746-.34-.672 0-1.194.51-1.194 1.214s.522 1.213 1.194 1.213c.348 0 .597-.121.746-.34v.292h.522zm-1.94 0c0-.413.274-.752.722-.752.422 0 .72.315.72.752 0 .412-.298.752-.72.752-.448-.024-.722-.34-.722-.752"
                fill="#000"
            />
            <path d="M10.57 1.869h7.832v13.736h-7.833z" fill="#FF5F00" />
            <path
                d="M11.067 8.737c0-2.791 1.342-5.267 3.406-6.868A9.04 9.04 0 0 0 8.953 0C4.005 0 .002 3.907.002 8.737s4.003 8.737 8.951 8.737a9.04 9.04 0 0 0 5.52-1.869 8.65 8.65 0 0 1-3.406-6.868"
                fill="#EB001B"
            />
            <path
                d="M28.97 8.737c0 4.83-4.004 8.737-8.952 8.737a9.04 9.04 0 0 1-5.52-1.869c2.089-1.602 3.407-4.077 3.407-6.868s-1.343-5.267-3.407-6.868A9.04 9.04 0 0 1 20.018 0c4.948 0 8.952 3.932 8.952 8.737"
                fill="#F79E1B"
            />
        </svg>
    </div>
);

// 1. Reusable Text/Number Input Field
export const InputField = (props: {
    label: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
    type?: string;
    icon?: any;
    isHalfWidth?: boolean;
}) => (
    <div
        class={`flex flex-col gap-2 ${
            props.isHalfWidth ? 'w-full' : 'flex-grow min-w-0'
        }`}
    >
        {/* Label: [font-size: 16px; font-weight: 500] */}
        <label class="text-base font-medium text-gray-800">{props.label}</label>

        {/* Input Field: Stylized as requested */}
        <div class="h-11 w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow flex items-center gap-3">
            {props.icon}
            <input
                type={props.type || 'text'}
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                placeholder={props.placeholder}
                class="w-full bg-transparent outline-none"
            />
        </div>
    </div>
);

// 2. Reusable Select Dropdown Field
export const SelectField = (props: {
    label: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
    options: string[];
    isHalfWidth?: boolean;
}) => (
    <div
        class={`flex flex-col gap-2 ${
            props.isHalfWidth ? 'w-full' : 'flex-grow min-w-0'
        }`}
    >
        {/* Label: [font-size: 16px; font-weight: 500] */}
        <label class="text-base font-medium text-gray-800">{props.label}</label>

        {/* Custom Select Box */}
        <div class="relative">
            <select
                value={props.value}
                onInput={(e) => props.onChange(e.currentTarget.value)}
                class="h-11 w-full p-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
            >
                <option
                    value=""
                    disabled
                    selected={!props.value}
                    class="text-gray-500"
                >
                    {props.placeholder}
                </option>
                <For each={props.options}>
                    {(option) => <option value={option}>{option}</option>}
                </For>
            </select>
            {/* Custom Caret Icon: [width: 10px; height: 5px; outline: 1px #697586 solid] */}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-4 h-4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    </div>
);
