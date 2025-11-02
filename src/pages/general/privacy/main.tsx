// import { Component, For, createSignal, onMount } from 'solid-js';

// const PRIVACY_CONTENT_DATA = [
//     {
//         id: 'info-collect',
//         title: 'Information We Collect',
//         number: '1.0',
//         content:
//             'Personal information, Usage Information, and Location data explained.',
//         subsections: [
//             {
//                 id: 'personal-info',
//                 title: 'Personal information',
//                 content:
//                     'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
//             },
//             {
//                 id: 'usage-info',
//                 title: 'Usage Information',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//             },
//             {
//                 id: 'location-data',
//                 title: 'Location data',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
//             },
//         ],
//     },
//     {
//         id: 'how-we-use',
//         title: 'How we use your information',
//         number: '2.0',
//         content:
//             'Details on Service delivery, Communication, and Safety & Security.',
//         subsections: [
//             {
//                 id: 'service-delivery',
//                 title: 'Service delivery',
//                 content:
//                     'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
//             },
//             {
//                 id: 'communication',
//                 title: 'Communication',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
//             },
//             {
//                 id: 'safety-security',
//                 title: 'Safety & Security',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
//             },
//         ],
//     },
//     {
//         id: 'data-sharing',
//         title: 'Data Sharing',
//         number: '3.0',
//         content:
//             'Sharing with Artisans, Service Seekers, and Legal Requirements.',
//         subsections: [
//             {
//                 id: 'with-artisans',
//                 title: 'With Artisans',
//                 content:
//                     'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
//             },
//             {
//                 id: 'service-seekers',
//                 title: 'Service Seekers',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
//             },
//             {
//                 id: 'legal-requirements',
//                 title: 'Legal Requirements',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
//             },
//         ],
//     },
//     {
//         id: 'data-security',
//         title: 'Data Security',
//         number: '4.0',
//         content:
//             'Protection Measures, Access Controls, and Breach Notifications.',
//         subsections: [
//             {
//                 id: 'protection-measures',
//                 title: 'Protection Measures',
//                 content:
//                     'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
//             },
//             {
//                 id: 'access-controls',
//                 title: 'Access Controls',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
//             },
//             {
//                 id: 'breach-notifications',
//                 title: 'Breach Notifications',
//                 content:
//                     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
//             },
//         ],
//     },
//     {
//         id: 'privacy-rights',
//         title: 'Your Privacy Rights',
//         number: '5.0',
//         content: 'Details on your rights.',
//         subsections: [],
//     },
//     {
//         id: 'data-disclosure',
//         title: 'Data Disclosure',
//         number: '6.0',
//         content: 'When and how data is disclosed.',
//         subsections: [],
//     },
//     {
//         id: 'policy-updates',
//         title: 'Policy Updates',
//         number: '7.0',
//         content: 'Information on policy changes.',
//         subsections: [],
//     },
// ];

// const PDFIcon: Component = () => (
//     <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//         <rect
//             x="4.75"
//             y="4.75"
//             width="14.5"
//             height="14.5"
//             rx="1.25"
//             stroke="white"
//             stroke-width="1.5"
//         />
//         <path
//             d="M9 13H15"
//             stroke="white"
//             stroke-width="1.5"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//         />
//         <path
//             d="M9 10H15"
//             stroke="white"
//             stroke-width="1.5"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//         />
//     </svg>
// );

// // --- New Download Logic ---

// /**
//  * Converts the JSON-like data into a structured Markdown string.
//  */
// const generateMarkdownContent = (data: typeof PRIVACY_CONTENT_DATA) => {
//     let content = '# PairProfit Customer Agreement\n\n';
//     content +=
//         'Your privacy is important to us. This policy explains how we collect, use and protect your personal information\n\n';
//     content += '---\n\n';

//     data.forEach((mainItem) => {
//         // Main Section Title
//         content += `## ${mainItem.number} ${mainItem.title}\n\n`;
//         content += `${mainItem.content}\n\n`;

//         if (mainItem.subsections && mainItem.subsections.length > 0) {
//             mainItem.subsections.forEach((subItem) => {
//                 // Subsection Title
//                 content += `### ${subItem.title}\n\n`;
//                 content += `${subItem.content}\n\n`;
//             });
//         }
//         content += '---\n\n';
//     });

//     return content;
// };

// /**
//  * Triggers a client-side download of the generated Markdown file.
//  */
// const handleDownload = () => {
//     const markdownContent = generateMarkdownContent(PRIVACY_CONTENT_DATA);

//     // Create a Blob with the Markdown content
//     const blob = new Blob([markdownContent], {
//         type: 'text/markdown;charset=utf-8',
//     });

//     // Create a temporary link element to trigger the download
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'PairProfit_Privacy_Policy.md'; // Filename

//     // Append to body, trigger download, and clean up
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
// };

// // --- Main Layout Component ---

// export const PrivacyPolicyLayout: Component = () => {
//     // State to track the currently highlighted section ID (click-driven)
//     const [activeSectionId, setActiveSectionId] = createSignal(
//         PRIVACY_CONTENT_DATA[0].id
//     );

//     /**
//      * Finds the first content ID within a main section (or returns the main section ID)
//      */
//     const getScrollTargetId = (id: string) => {
//         const mainSection = PRIVACY_CONTENT_DATA.find((s) => s.id === id);
//         if (
//             mainSection &&
//             mainSection.subsections &&
//             mainSection.subsections.length > 0
//         ) {
//             return mainSection.subsections[0].id;
//         }
//         return id;
//     };

//     /**
//      * Handles navigation (smooth scroll and state update) from the sidebar links.
//      */
//     const handleNavigation = (id: string) => {
//         const targetId = getScrollTargetId(id);
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             setActiveSectionId(targetId);
//             history.pushState(null, '', `#${targetId}`);

//             const headerHeight = 100;
//             const elementPosition =
//                 targetElement.getBoundingClientRect().top + window.scrollY;

//             window.scrollTo({
//                 top: elementPosition - headerHeight,
//                 behavior: 'smooth',
//             });
//         }
//     };

//     // Wrapper for sidebar link clicks
//     const handleClick = (e: Event | MouseEvent, id: string) => {
//         e.preventDefault();
//         handleNavigation(id);
//     };

//     // On mount, check URL hash and set initial highlight if available
//     onMount(() => {
//         const initialHash = window.location.hash.slice(1);
//         if (initialHash) {
//             const allContentIds = PRIVACY_CONTENT_DATA.flatMap((main) => [
//                 main.id,
//                 ...main.subsections.map((sub) => sub.id),
//             ]);
//             if (allContentIds.includes(initialHash)) {
//                 setActiveSectionId(initialHash);
//             }
//         }
//     });

//     // --- Render ---

//     return (
//         <div class="w-full flex justify-center py-12 bg-white">
//             <div class="w-full max-w-7xl px-4 md:px-8 flex flex-col items-start gap-6">
//                 {/* --- Header & Title Block --- */}
//                 <div class="w-full p-4 flex flex-col justify-center items-start gap-8">
//                     <div class="w-full flex flex-col justify-start items-start gap-4">
//                         {/* Title */}
//                         <h1 class="text-[#0D121C] text-[32px] font-semibold leading-[51.2px]">
//                             PairProfit Customer Agreement
//                         </h1>

//                         {/* Description */}
//                         <p class="text-[#4B5565] text-lg font-medium leading-7">
//                             Your privacy is important to us. This policy
//                             explains how we collect, use and protect your
//                             personal information
//                         </p>
//                     </div>

//                     {/* Download Button: Now calls the download handler */}
//                     <div class="flex flex-col justify-start items-center gap-3">
//                         <button
//                             onClick={handleDownload}
//                             class="inline-flex h-[52px] px-6 py-3 bg-[#1376A1] rounded-lg justify-center items-center gap-2 transition-colors hover:bg-[#106591] cursor-pointer"
//                         >
//                             <PDFIcon />
//                             <div class="text-white text-base font-semibold leading-6">
//                                 Download Document (.md)
//                             </div>
//                         </button>
//                     </div>
//                 </div>

//                 {/* --- Content Body (TOC + Main) --- */}
//                 <div class="w-full flex justify-start items-start gap-12">
//                     {/* Left Column: Table of Contents (Sticky) */}
//                     <nav class="w-full lg:w-[363px] flex-shrink-0 sticky top-6 self-start hidden lg:block pr-4 border-r border-[#E3E8EF]">
//                         <div class="flex flex-col justify-start items-start gap-4">
//                             <For each={PRIVACY_CONTENT_DATA}>
//                                 {(section) => (
//                                     <div class="w-full flex flex-col justify-start items-start">
//                                         {/* Main Section Title (TOC) */}
//                                         <a
//                                             href={`#${getScrollTargetId(
//                                                 section.id
//                                             )}`}
//                                             onClick={(e) =>
//                                                 handleClick(e, section.id)
//                                             }
//                                             class="w-full p-3 transition-colors duration-150 rounded-lg"
//                                             classList={{
//                                                 'bg-[#D0E4EC] border-l-[3px] border-black':
//                                                     section.id ===
//                                                         activeSectionId() ||
//                                                     section.subsections.some(
//                                                         (sub) =>
//                                                             sub.id ===
//                                                             activeSectionId()
//                                                     ),
//                                                 'border-l-[3px] border-transparent hover:bg-[#F0F4F8]':
//                                                     section.id !==
//                                                         activeSectionId() &&
//                                                     !section.subsections.some(
//                                                         (sub) =>
//                                                             sub.id ===
//                                                             activeSectionId()
//                                                     ),
//                                             }}
//                                         >
//                                             <div class="text-xl font-semibold text-[#0D121C] leading-8">
//                                                 {section.title}
//                                             </div>
//                                         </a>

//                                         {/* Sub-sections (TOC) */}
//                                         <For each={section.subsections}>
//                                             {(sub) => (
//                                                 <a
//                                                     href={`#${sub.id}`}
//                                                     onClick={(e) =>
//                                                         handleClick(e, sub.id)
//                                                     }
//                                                     class="w-full pl-8 pr-3 py-3 transition-colors duration-150 rounded-lg text-lg leading-7 font-medium"
//                                                     classList={{
//                                                         'text-[#1376A1] bg-[#F0F4F8] hover:bg-[#F0F4F8]/80':
//                                                             sub.id ===
//                                                             activeSectionId(),
//                                                         'text-[#364152] hover:bg-transparent hover:text-[#1376A1]':
//                                                             sub.id !==
//                                                             activeSectionId(),
//                                                     }}
//                                                 >
//                                                     {sub.title}
//                                                 </a>
//                                             )}
//                                         </For>
//                                     </div>
//                                 )}
//                             </For>
//                         </div>
//                     </nav>

//                     {/* Right Column: Main Content */}
//                     <div class="flex-1 flex flex-col justify-center items-start w-full">
//                         <For each={PRIVACY_CONTENT_DATA}>
//                             {(mainItem) => (
//                                 <>
//                                     {/* Main Section Container (Uses the first sub-section's ID for scroll targeting if it has content) */}
//                                     <section
//                                         id={getScrollTargetId(mainItem.id)}
//                                         class="w-full p-8 flex flex-col justify-center items-start gap-8 border-l-[3px] border-transparent transition-all duration-100 cursor-pointer"
//                                         classList={{
//                                             // Highlight only if the main section or any of its children are active
//                                             'bg-[rgba(208,228,236,0.15)] border-[#1376A1]':
//                                                 mainItem.id ===
//                                                     activeSectionId() ||
//                                                 mainItem.subsections.some(
//                                                     (sub) =>
//                                                         sub.id ===
//                                                         activeSectionId()
//                                                 ),
//                                             'bg-transparent':
//                                                 mainItem.id !==
//                                                     activeSectionId() &&
//                                                 !mainItem.subsections.some(
//                                                     (sub) =>
//                                                         sub.id ===
//                                                         activeSectionId()
//                                                 ),
//                                         }}
//                                         onClick={() =>
//                                             setActiveSectionId(
//                                                 getScrollTargetId(mainItem.id)
//                                             )
//                                         }
//                                     >
//                                         <div class="w-full flex flex-col justify-start items-start gap-4">
//                                             {/* Section Heading */}
//                                             <div class="flex justify-center items-center gap-3 rounded-lg">
//                                                 <div class="text-xl font-medium text-[#0F322E] leading-8">
//                                                     {mainItem.number}
//                                                 </div>
//                                                 <h2 class="text-2xl font-medium text-[#0F322E] leading-9">
//                                                     {mainItem.title}
//                                                 </h2>
//                                             </div>

//                                             {/* Top-Level Content Paragraph */}
//                                             <p class="text-lg font-medium text-[#4B5565] leading-7">
//                                                 {mainItem.content}
//                                             </p>

//                                             {/* Subsections */}
//                                             <For each={mainItem.subsections}>
//                                                 {(subItem) => (
//                                                     <div
//                                                         id={subItem.id}
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setActiveSectionId(
//                                                                 subItem.id
//                                                             );
//                                                         }}
//                                                         class="w-full p-4 flex flex-col justify-start items-start gap-4 border-l-[3px] border-transparent transition-all duration-100 cursor-pointer"
//                                                         classList={{
//                                                             'bg-[rgba(208,228,236,0.25)] border-[#1376A1]':
//                                                                 subItem.id ===
//                                                                 activeSectionId(),
//                                                             'bg-transparent':
//                                                                 subItem.id !==
//                                                                 activeSectionId(),
//                                                         }}
//                                                     >
//                                                         <h3 class="text-xl font-medium text-[#121926] leading-8">
//                                                             {subItem.title}
//                                                         </h3>
//                                                         <p class="text-lg font-medium text-[#4B5565] leading-7">
//                                                             {subItem.content}
//                                                         </p>
//                                                     </div>
//                                                 )}
//                                             </For>
//                                         </div>
//                                     </section>
//                                 </>
//                             )}
//                         </For>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

import { Component, For, createSignal, onMount } from 'solid-js';

// NOTE: For this solution to work, you must include the html2pdf.js library in your project.
// If using a <script> tag: <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
// If using npm/yarn: import html2pdf from 'html2pdf.js'; (after installing)
// For this example, we will assume 'html2pdf' is globally available or imported.
declare const html2pdf: any;

// --- Data Structures for Privacy Policy ---

const PRIVACY_CONTENT_DATA = [
    {
        id: 'info-collect',
        title: 'Information We Collect',
        number: '1.0',
        content:
            'Personal information, Usage Information, and Location data explained.',
        subsections: [
            {
                id: 'personal-info',
                title: 'Personal information',
                content:
                    'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
            },
            {
                id: 'usage-info',
                title: 'Usage Information',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 'location-data',
                title: 'Location data',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
        ],
    },
    {
        id: 'how-we-use',
        title: 'How we use your information',
        number: '2.0',
        content:
            'Details on Service delivery, Communication, and Safety & Security.',
        subsections: [
            {
                id: 'service-delivery',
                title: 'Service delivery',
                content:
                    'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
            },
            {
                id: 'communication',
                title: 'Communication',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
            },
            {
                id: 'safety-security',
                title: 'Safety & Security',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
        ],
    },
    {
        id: 'data-sharing',
        title: 'Data Sharing',
        number: '3.0',
        content:
            'Sharing with Artisans, Service Seekers, and Legal Requirements.',
        subsections: [
            {
                id: 'with-artisans',
                title: 'With Artisans',
                content:
                    'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
            },
            {
                id: 'service-seekers',
                title: 'Service Seekers',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
            },
            {
                id: 'legal-requirements',
                title: 'Legal Requirements',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
        ],
    },
    {
        id: 'data-security',
        title: 'Data Security',
        number: '4.0',
        content:
            'Protection Measures, Access Controls, and Breach Notifications.',
        subsections: [
            {
                id: 'protection-measures',
                title: 'Protection Measures',
                content:
                    'To access certain features of the Platform, you must create an account. You are responsible for maintaining the security and confidentiality of your account credentials.',
            },
            {
                id: 'access-controls',
                title: 'Access Controls',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse',
            },
            {
                id: 'breach-notifications',
                title: 'Breach Notifications',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            },
        ],
    },
    {
        id: 'privacy-rights',
        title: 'Your Privacy Rights',
        number: '5.0',
        content: 'Details on your rights.',
        subsections: [],
    },
    {
        id: 'data-disclosure',
        title: 'Data Disclosure',
        number: '6.0',
        content: 'When and how data is disclosed.',
        subsections: [],
    },
    {
        id: 'policy-updates',
        title: 'Policy Updates',
        number: '7.0',
        content: 'Information on policy changes.',
        subsections: [],
    },
];

const PDFIcon: Component = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="4.75"
            y="4.75"
            width="14.5"
            height="14.5"
            rx="1.25"
            stroke="white"
            stroke-width="1.5"
        />
        <path
            d="M9 13H15"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M9 10H15"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

// --- Main Layout Component ---

export const PrivacyPolicyLayout: Component = () => {
    // State to track the currently highlighted section ID (click-driven)
    const [activeSectionId, setActiveSectionId] = createSignal(
        PRIVACY_CONTENT_DATA[0].id
    );
    const [currentTime, setCurrentTime] = createSignal<string>(
        new Date().toLocaleString()
    );

    const handleDownloadPDF = () => {
        // 1. Get the main content element by ID
        const element = document.getElementById('pdf-content-area');
        if (!element) {
            console.error('Content area not found for PDF generation.');
            alert('The content area for PDF generation was not found.');
            return;
        }

        // 2. Configuration for html2pdf.js
        const options = {
            margin: 10,
            filename: 'PairProfit_Privacy_Policy.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                logging: true,
                dpi: 192,
                letterRendering: true,
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
        setCurrentTime(new Date().toLocaleString());
        // 3. Generate and save the PDF
        if (typeof html2pdf !== 'undefined') {
            html2pdf().from(element).set(options).save();
        } else {
            alert(
                "PDF generation library (html2pdf.js) is not loaded. Please ensure it's imported."
            );
            console.error('html2pdf library is not defined.');
        }
    };
    // ... (utility functions like getScrollTargetId, handleNavigation, handleClick, onMount remain the same)

    const getScrollTargetId = (id: string) => {
        const mainSection = PRIVACY_CONTENT_DATA.find((s) => s.id === id);
        if (
            mainSection &&
            mainSection.subsections &&
            mainSection.subsections.length > 0
        ) {
            return mainSection.subsections[0].id;
        }
        return id;
    };

    const handleNavigation = (id: string) => {
        const targetId = getScrollTargetId(id);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            setActiveSectionId(targetId);
            history.pushState(null, '', `#${targetId}`);

            const headerHeight = 100;
            const elementPosition =
                targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: 'smooth',
            });
        }
    };

    const handleClick = (e: Event | MouseEvent, id: string) => {
        e.preventDefault();
        handleNavigation(id);
    };

    onMount(() => {
        const initialHash = window.location.hash.slice(1);
        if (initialHash) {
            const allContentIds = PRIVACY_CONTENT_DATA.flatMap((main) => [
                main.id,
                ...main.subsections.map((sub) => sub.id),
            ]);
            if (allContentIds.includes(initialHash)) {
                setActiveSectionId(initialHash);
            }
        }
    });

    return (
        <div class="w-full flex justify-center py-12 bg-white">
            <div class="w-full max-w-7xl px-4 md:px-8 flex flex-col items-start gap-6">
                {/* --- Header & Title Block (Excluded from PDF) --- */}
                <div class="w-full p-4 flex flex-col justify-center items-start gap-8">
                    <div class="w-full flex flex-col justify-start items-start gap-4">
                        {/* Title */}
                        <h1 class="text-[#0D121C] text-[32px] font-semibold leading-[51.2px]">
                            PairProfit Customer Agreement
                        </h1>

                        {/* Description */}
                        <p class="text-[#4B5565] text-lg font-medium leading-7">
                            Your privacy is important to us. This policy
                            explains how we collect, use and protect your
                            personal information
                        </p>
                    </div>

                    {/* Download Button: Now calls the PDF download handler */}
                    <div class="flex flex-col justify-start items-center gap-3">
                        <button
                            onClick={handleDownloadPDF}
                            class="inline-flex h-[52px] px-6 py-3 bg-[#1376A1] rounded-lg justify-center items-center gap-2 transition-colors hover:bg-[#106591] cursor-pointer"
                        >
                            <PDFIcon />
                            <div class="text-white text-base font-semibold leading-6">
                                Download Document (PDF)
                            </div>
                        </button>
                    </div>
                </div>

                {/* --- Content Body (TOC + Main) --- */}
                <div class="w-full flex justify-start items-start gap-12">
                    {/* Left Column: Table of Contents (Hidden on desktop, so NOT included in PDF) */}
                    <nav class="w-full lg:w-[363px] flex-shrink-0 sticky top-6 self-start hidden lg:block pr-4 border-r border-[#E3E8EF]">
                        <div class="flex flex-col justify-start items-start gap-4">
                            {/* ... (TOC rendering remains the same) */}
                            <For each={PRIVACY_CONTENT_DATA}>
                                {(section) => (
                                    <div class="w-full flex flex-col justify-start items-start">
                                        <a
                                            href={`#${getScrollTargetId(
                                                section.id
                                            )}`}
                                            onClick={(e) =>
                                                handleClick(e, section.id)
                                            }
                                            class="w-full p-3 transition-colors duration-150 rounded-lg"
                                            classList={{
                                                'bg-[#D0E4EC] border-l-[3px] border-black':
                                                    section.id ===
                                                        activeSectionId() ||
                                                    section.subsections.some(
                                                        (sub) =>
                                                            sub.id ===
                                                            activeSectionId()
                                                    ),
                                                'border-l-[3px] border-transparent hover:bg-[#F0F4F8]':
                                                    section.id !==
                                                        activeSectionId() &&
                                                    !section.subsections.some(
                                                        (sub) =>
                                                            sub.id ===
                                                            activeSectionId()
                                                    ),
                                            }}
                                        >
                                            <div class="text-xl font-semibold text-[#0D121C] leading-8">
                                                {section.title}
                                            </div>
                                        </a>
                                        <For each={section.subsections}>
                                            {(sub) => (
                                                <a
                                                    href={`#${sub.id}`}
                                                    onClick={(e) =>
                                                        handleClick(e, sub.id)
                                                    }
                                                    class="w-full pl-8 pr-3 py-3 transition-colors duration-150 rounded-lg text-lg leading-7 font-medium"
                                                    classList={{
                                                        'text-[#1376A1] bg-[#F0F4F8] hover:bg-[#F0F4F8]/80':
                                                            sub.id ===
                                                            activeSectionId(),
                                                        'text-[#364152] hover:bg-transparent hover:text-[#1376A1]':
                                                            sub.id !==
                                                            activeSectionId(),
                                                    }}
                                                >
                                                    {sub.title}
                                                </a>
                                            )}
                                        </For>
                                    </div>
                                )}
                            </For>
                        </div>
                    </nav>

                    {/* Right Column: Main Content (Targeted for PDF Generation) */}
                    <div
                        id="pdf-content-area"
                        class="flex-1 flex flex-col justify-center items-start w-full"
                    >
                        {/* Title and Intro for PDF Context */}
                        <div class="w-full pb-8">
                            <h1 class="text-[#0D121C] text-[32px] font-semibold leading-[51.2px] mb-2">
                                PairProfit Customer Agreement
                            </h1>
                            <p class="text-[#4B5565] text-lg font-medium leading-7">
                                Last Updated: {currentTime()}
                            </p>
                        </div>

                        <For each={PRIVACY_CONTENT_DATA}>
                            {(mainItem) => (
                                <>
                                    <section
                                        id={getScrollTargetId(mainItem.id)}
                                        class="w-full p-8 flex flex-col justify-center items-start gap-8 border-l-[3px] border-transparent transition-all duration-100 cursor-pointer"
                                        classList={{
                                            // The highlight classes are intentionaly removed for PDF generation accuracy,
                                            // but are kept for active state in the live view.
                                            'bg-[rgba(208,228,236,0.15)] border-[#1376A1]':
                                                mainItem.id ===
                                                    activeSectionId() ||
                                                mainItem.subsections.some(
                                                    (sub) =>
                                                        sub.id ===
                                                        activeSectionId()
                                                ),
                                            'bg-transparent':
                                                mainItem.id !==
                                                    activeSectionId() &&
                                                !mainItem.subsections.some(
                                                    (sub) =>
                                                        sub.id ===
                                                        activeSectionId()
                                                ),
                                        }}
                                        onClick={() =>
                                            setActiveSectionId(
                                                getScrollTargetId(mainItem.id)
                                            )
                                        }
                                    >
                                        <div class="w-full flex flex-col justify-start items-start gap-4">
                                            {/* Section Heading */}
                                            <div class="flex justify-center items-center gap-3 rounded-lg">
                                                <div class="text-xl font-medium text-[#0F322E] leading-8">
                                                    {mainItem.number}
                                                </div>
                                                <h2 class="text-2xl font-medium text-[#0F322E] leading-9">
                                                    {mainItem.title}
                                                </h2>
                                            </div>

                                            {/* Top-Level Content Paragraph */}
                                            <p class="text-lg font-medium text-[#4B5565] leading-7">
                                                {mainItem.content}
                                            </p>

                                            {/* Subsections */}
                                            <For each={mainItem.subsections}>
                                                {(subItem) => (
                                                    <div
                                                        id={subItem.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveSectionId(
                                                                subItem.id
                                                            );
                                                        }}
                                                        class="w-full p-4 flex flex-col justify-start items-start gap-4 border-l-[3px] border-transparent transition-all duration-100 cursor-pointer"
                                                        classList={{
                                                            'bg-[rgba(208,228,236,0.25)] border-[#1376A1]':
                                                                subItem.id ===
                                                                activeSectionId(),
                                                            'bg-transparent':
                                                                subItem.id !==
                                                                activeSectionId(),
                                                        }}
                                                    >
                                                        <h3 class="text-xl font-medium text-[#121926] leading-8">
                                                            {subItem.title}
                                                        </h3>
                                                        <p class="text-lg font-medium text-[#4B5565] leading-7">
                                                            {subItem.content}
                                                        </p>
                                                    </div>
                                                )}
                                            </For>
                                        </div>
                                    </section>
                                </>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    );
};
