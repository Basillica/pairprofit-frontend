// Helper Icons (Based on your previous components)
const Icons = {
    // Custom icon for the Artisan Profile Title (based on the original graphic)
    artisan: (
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 1.459a5.542 5.542 0 1 0 0 11.083 5.542 5.542 0 0 0 0-11.083M10.21 7a3.792 3.792 0 1 1 7.583 0 3.792 3.792 0 0 1-7.583 0M14 14.292c-2.698 0-5.185.614-7.028 1.65-1.815 1.021-3.18 2.569-3.18 4.475v.119c-.001 1.355-.002 3.057 1.49 4.272.734.598 1.762 1.023 3.15 1.303 1.39.283 3.205.43 5.568.43 2.364 0 4.177-.147 5.57-.43 1.388-.28 2.415-.706 3.15-1.303 1.492-1.215 1.49-2.916 1.489-4.272v-.12c0-1.905-1.365-3.453-3.18-4.475-1.843-1.036-4.329-1.65-7.029-1.65m-8.458 6.125c0-.993.726-2.071 2.288-2.95 1.535-.863 3.715-1.425 6.172-1.425 2.454 0 4.634.562 6.169 1.425 1.563.879 2.288 1.957 2.288 2.95 0 1.526-.047 2.384-.845 3.033-.432.352-1.155.697-2.392.946-1.233.25-2.919.396-5.222.396s-3.99-.146-5.222-.396c-1.236-.25-1.96-.594-2.391-.945-.798-.65-.845-1.508-.845-3.034"
                fill="#4B5565"
            />
        </svg>
    ),
    // Green Check for ID Verified
    check: (
        <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m12.367 16.133-2.509-2.508a1.1 1.1 0 0 0-.816-.32q-.495 0-.817.32-.32.32-.32.817 0 .495.32.816l3.325 3.325q.35.35.817.35t.816-.35l6.592-6.591q.32-.32.32-.817 0-.495-.32-.817a1.1 1.1 0 0 0-.817-.32q-.495 0-.816.32zM5.833 25q-.961 0-1.647-.685a2.25 2.25 0 0 1-.686-1.648V6.333q0-.961.686-1.647A2.25 2.25 0 0 1 5.833 4h16.334q.961 0 1.648.686.686.685.685 1.647v16.334a2.25 2.25 0 0 1-.685 1.648 2.24 2.24 0 0 1-1.648.685z"
                fill="#34A853"
            />
        </svg>
    ),
    // Star for Rating (Filled Yellow, based on the original graphic)
    star: (
        <svg viewBox="0 0 24 24" fill="#FDD835" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    // Simple Chevron Up/Collapse Icon
    chevronUp: (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#364152"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    ),
};

export const ArtisanProfileView = (props: { onBack: () => void }) => {
    // Note: The original HTML represents content inside a sidebar card.
    // This component assumes it is placed within a full-height scrollable container.

    return (
        // Inner Card: [width: 352px; height: 962px] converted to w-full, h-full, p-6
        <div class="w-full h-full flex flex-col bg-white border border-gray-200 rounded-lg p-6 shadow-lg overflow-y-auto">
            {/* --- 1. Header --- */}
            <div class="flex justify-between items-center pb-6 flex-shrink-0">
                <div class="flex items-center gap-3">
                    {/* Icon: [width: 28px; height: 28px] -> w-7 h-7 */}
                    <div class="w-7 h-7 text-gray-700">{Icons.artisan}</div>
                    {/* Title: [font-size: 16px; font-weight: 500] */}
                    <div class="text-base font-medium text-gray-900">
                        Artisan profile
                    </div>
                </div>
                {/* Collapse Button: [width: 18px; height: 18px] -> w-5 h-5 */}
                <button
                    class="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={props.onBack}
                >
                    <div class="w-5 h-5">{Icons.chevronUp}</div>
                </button>
            </div>

            {/* --- 2. Profile Summary --- */}
            <div class="flex flex-col items-center gap-4 border-b border-gray-100 pb-8 mb-8">
                {/* Profile Image: [width: 120px; height: 120px] -> w-30 h-30 */}
                <img
                    class="w-[120px] h-[120px] rounded-full object-cover"
                    src={`https://picsum.photos/200?random=${Math.random()}`}
                    alt="Artisan Avatar"
                />
                <div class="flex flex-col items-center gap-2">
                    {/* Name: Not explicitly in the HTML but implied, adding for clarity */}
                    <div class="text-2xl font-semibold text-gray-900">
                        Johnathan Contractor
                    </div>

                    {/* Role & Rating */}
                    <div class="flex items-center gap-2 text-gray-600 text-base font-medium">
                        <div>Plumber</div>
                        <div class="w-1 h-1 rounded-full bg-gray-400"></div>{' '}
                        {/* Divider Dot */}
                        <div class="flex items-center gap-1">
                            {/* Star Icon: w-4 h-4 */}
                            <div class="w-4 h-4">{Icons.star}</div>
                            {/* Rating Text: [font-size: 14px; font-weight: 500] */}
                            <div class="text-sm font-medium">
                                4.9 (
                                <span class="text-blue-700">50 reviews</span>)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 3. Content Sections --- */}
            <div class="flex flex-col gap-8 flex-grow">
                {/* Section: Details */}
                <div class="flex flex-col gap-2">
                    {/* Title: [font-size: 24px; font-weight: 500] -> text-2xl font-medium */}
                    <h3 class="text-2xl font-medium text-gray-900">Details</h3>
                    <div class="flex flex-col gap-1">
                        {/* Detail Items: [font-size: 18px; font-weight: 500] -> text-lg font-medium */}
                        <p class="text-lg font-medium text-gray-700">
                            5+ years experience
                        </p>
                        <p class="text-lg font-medium text-gray-700">
                            Location: Lagos, Nigeria
                        </p>
                        <p class="text-lg font-medium text-gray-700">
                            Languages: English, Spanish, German
                        </p>

                        {/* ID Verified Row */}
                        <div class="flex items-center gap-3 mt-1">
                            {/* Check Icon: [width: 28px; height: 28px] -> w-7 h-7 */}
                            <div class="w-7 h-7 text-green-600 flex items-center justify-center">
                                {Icons.check}
                            </div>
                            <div class="text-lg font-medium text-gray-700">
                                ID Verified
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Services Offered */}
                <div class="flex flex-col gap-2">
                    <h3 class="text-2xl font-medium text-gray-900">
                        Services Offered
                    </h3>
                    <p class="text-lg font-medium text-gray-700">
                        Pipe installation, leak repairs, kitchen & bathroom
                        renovations.
                    </p>
                </div>

                {/* Section: Availability */}
                <div class="flex flex-col gap-2">
                    <h3 class="text-2xl font-medium text-gray-900">
                        Availability
                    </h3>
                    <p class="text-lg font-medium text-gray-700">
                        Mon - Sat, 9AM - 6PM
                    </p>
                    {/* Urgent Jobs: [color: #EA4335] -> text-red-600 */}
                    <p class="text-lg font-medium text-red-600">
                        Available for urgent jobs
                    </p>
                </div>
            </div>

            {/* --- 4. Action Buttons --- */}
            <div class="flex justify-start items-center gap-6 pt-6 border-t border-gray-100 flex-shrink-0">
                {/* Primary Button: Hire Now */}
                <button class="w-[148px] p-3 bg-[#1376A1] rounded-lg transition-colors cursor-pointer">
                    <div class="text-center text-white text-base font-semibold">
                        Hire Now
                    </div>
                </button>

                {/* Secondary Button: View Profile */}
                <button class="w-[148px] p-3 border border-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                    <div class="text-center text-[#1376A1] text-base font-semibold">
                        View Profile
                    </div>
                </button>
            </div>
        </div>
    );
};
