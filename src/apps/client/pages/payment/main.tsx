import { createSignal, For, type Component, Show } from 'solid-js';
import { AddBillingMethodForm } from '../../modals/BillingMethodForm';

// --- Mock Data Types ---
type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

interface Transaction {
    description: string;
    date: string;
    amount: number;
    status: TransactionStatus;
}

const PRIMARY_CARD = {
    type: 'Mastercard',
    lastFour: '09/27',
    currency: 'USD',
};

const TRANSACTION_HISTORY: Transaction[] = [
    {
        description: 'Job promotion',
        date: '31st August, 2025',
        amount: 100,
        status: 'Completed',
    },
    {
        description: 'Plumbing service payment',
        date: '22nd July, 2025',
        amount: 120,
        status: 'Pending',
    },
    {
        description: 'Carpentry hire',
        date: '30th June, 2025',
        amount: 200,
        status: 'Failed',
    },
];

// --- Utility Components ---

// 1. Mastercard Icon (replicated from original styles)
const MastercardIcon: Component = () => (
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
);

// 2. Transaction Status Badge
const StatusBadge: Component<{ status: TransactionStatus }> = (props) => {
    const styles = {
        Completed: 'bg-green-100 text-[#34A853]', // Green
        Pending: 'bg-yellow-100 text-[#FBBC05]', // Yellow
        Failed: 'bg-red-100 text-[#EA4335]', // Red
    };

    return (
        <div
            class={`h-7 px-3 py-1 ${
                styles[props.status]
            } rounded-full flex justify-center items-center text-sm font-medium whitespace-nowrap`}
        >
            {props.status}
        </div>
    );
};

// --- Modals (Requested Integrations) ---

// 3. Transaction Error Modal
const TransactionErrorModal: Component<{
    onTryAgain: () => void;
    onCancel: () => void;
}> = (props) => (
    <div class="p-6 sm:p-8 bg-white rounded-2xl flex flex-col items-center gap-8 shadow-2xl max-w-sm mx-auto">
        <div class="flex flex-col items-center gap-8 w-full">
            {/* Icon Area (Red Error Circle) */}
            <div class="w-20 h-20 relative bg-[#EA4335]/14 rounded-full overflow-hidden flex items-center justify-center">
                {/* Simple approximation of the error icon inside the circle */}
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
                        rx="40"
                        fill="#EA4335"
                        fill-opacity="0.14"
                    />
                    <path
                        d="M51.55 28.4683C51.3804 28.2983 51.1789 28.1635 50.9571 28.0715C50.7353 27.9795 50.4976 27.9321 50.2575 27.9321C50.0174 27.9321 49.7796 27.9795 49.5578 28.0715C49.3361 28.1635 49.1346 28.2983 48.965 28.4683L40 37.4149L31.035 28.4499C30.8652 28.2802 30.6637 28.1455 30.442 28.0537C30.2202 27.9618 29.9825 27.9146 29.7425 27.9146C29.5024 27.9146 29.2648 27.9618 29.043 28.0537C28.8212 28.1455 28.6197 28.2802 28.45 28.4499C28.2802 28.6197 28.1456 28.8212 28.0537 29.0429C27.9619 29.2647 27.9146 29.5024 27.9146 29.7424C27.9146 29.9825 27.9619 30.2202 28.0537 30.4419C28.1456 30.6637 28.2802 30.8652 28.45 31.0349L37.415 39.9999L28.45 48.9649C28.2802 49.1347 28.1456 49.3362 28.0537 49.5579C27.9619 49.7797 27.9146 50.0174 27.9146 50.2574C27.9146 50.4975 27.9619 50.7351 28.0537 50.9569C28.1456 51.1787 28.2802 51.3802 28.45 51.5499C28.6197 51.7197 28.8212 51.8543 29.043 51.9462C29.2648 52.038 29.5024 52.0853 29.7425 52.0853C29.9825 52.0853 30.2202 52.038 30.442 51.9462C30.6637 51.8543 30.8652 51.7197 31.035 51.5499L40 42.5849L48.965 51.5499C49.1347 51.7197 49.3362 51.8543 49.558 51.9462C49.7798 52.038 50.0174 52.0853 50.2575 52.0853C50.4975 52.0853 50.7352 52.038 50.957 51.9462C51.1787 51.8543 51.3802 51.7197 51.55 51.5499C51.7197 51.3802 51.8544 51.1787 51.9462 50.9569C52.0381 50.7351 52.0854 50.4975 52.0854 50.2574C52.0854 50.0174 52.0381 49.7797 51.9462 49.5579C51.8544 49.3362 51.7197 49.1347 51.55 48.9649L42.585 39.9999L51.55 31.0349C52.2466 30.3383 52.2466 29.1649 51.55 28.4683Z"
                        fill="#EA4335"
                    />
                </svg>
            </div>

            {/* Text Content */}
            <div class="flex flex-col items-center gap-3">
                <h3 class="text-xl sm:text-2xl font-medium text-gray-800 text-center leading-normal">
                    Transaction Error!
                </h3>
                <p class="text-sm text-gray-700 text-center leading-relaxed max-w-[336px]">
                    Oops! Something went wrong; please try again. If the problem
                    persists kindly contact our customer support for further
                    assistance.
                </p>
            </div>
        </div>

        {/* Buttons */}
        <div class="flex w-full gap-4">
            <button
                onClick={props.onTryAgain}
                class="flex-1 py-3 bg-[#1376A1] text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
            >
                Try again
            </button>
            <button
                onClick={props.onCancel}
                class="flex-1 py-3 border border-[#1376A1] text-[#1376A1] font-semibold rounded-lg hover:bg-blue-50 transition"
            >
                Cancel
            </button>
        </div>
    </div>
);

// 4. Remove Card Confirmation Modal
const RemoveCardConfirmationModal: Component<{
    onRemove: () => void;
    onCancel: () => void;
}> = (props) => (
    <div class="p-6 sm:p-8 bg-white rounded-2xl flex flex-col items-center gap-8 shadow-2xl max-w-sm mx-auto">
        <div class="flex flex-col items-center gap-8 w-full">
            {/* Icon Area (Red Error Circle) */}
            <div class="w-20 h-20 relative bg-[#EA4335]/14 rounded-full overflow-hidden flex items-center justify-center">
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
                        rx="40"
                        fill="#EA4335"
                        fill-opacity="0.14"
                    />
                    <path
                        d="M51.55 28.4683C51.3804 28.2983 51.1789 28.1635 50.9571 28.0715C50.7353 27.9795 50.4976 27.9321 50.2575 27.9321C50.0174 27.9321 49.7796 27.9795 49.5578 28.0715C49.3361 28.1635 49.1346 28.2983 48.965 28.4683L40 37.4149L31.035 28.4499C30.8652 28.2802 30.6637 28.1455 30.442 28.0537C30.2202 27.9618 29.9825 27.9146 29.7425 27.9146C29.5024 27.9146 29.2648 27.9618 29.043 28.0537C28.8212 28.1455 28.6197 28.2802 28.45 28.4499C28.2802 28.6197 28.1456 28.8212 28.0537 29.0429C27.9619 29.2647 27.9146 29.5024 27.9146 29.7424C27.9146 29.9825 27.9619 30.2202 28.0537 30.4419C28.1456 30.6637 28.2802 30.8652 28.45 31.0349L37.415 39.9999L28.45 48.9649C28.2802 49.1347 28.1456 49.3362 28.0537 49.5579C27.9619 49.7797 27.9146 50.0174 27.9146 50.2574C27.9146 50.4975 27.9619 50.7351 28.0537 50.9569C28.1456 51.1787 28.2802 51.3802 28.45 51.5499C28.6197 51.7197 28.8212 51.8543 29.043 51.9462C29.2648 52.038 29.5024 52.0853 29.7425 52.0853C29.9825 52.0853 30.2202 52.038 30.442 51.9462C30.6637 51.8543 30.8652 51.7197 31.035 51.5499L40 42.5849L48.965 51.5499C49.1347 51.7197 49.3362 51.8543 49.558 51.9462C49.7798 52.038 50.0174 52.0853 50.2575 52.0853C50.4975 52.0853 50.7352 52.038 50.957 51.9462C51.1787 51.8543 51.3802 51.7197 51.55 51.5499C51.7197 51.3802 51.8544 51.1787 51.9462 50.9569C52.0381 50.7351 52.0854 50.4975 52.0854 50.2574C52.0854 50.0174 52.0381 49.7797 51.9462 49.5579C51.8544 49.3362 51.7197 49.1347 51.55 48.9649L42.585 39.9999L51.55 31.0349C52.2466 30.3383 52.2466 29.1649 51.55 28.4683Z"
                        fill="#EA4335"
                    />
                </svg>
            </div>

            {/* Text Content */}
            <div class="flex flex-col items-center gap-3">
                <h3 class="text-xl sm:text-2xl font-medium text-gray-800 text-center leading-normal">
                    Remove card details?
                </h3>
                <p class="text-sm text-gray-700 text-center leading-relaxed max-w-[336px]">
                    Are you sure you want to remove this card from your account?
                    You won’t be able to use it for future payments unless you
                    add it again.
                </p>
            </div>
        </div>

        {/* Buttons */}
        <div class="flex w-full gap-4">
            <button
                onClick={props.onCancel}
                class="flex-1 py-3 bg-[#E3E8EF] text-[#9AA4B2] font-semibold rounded-lg cursor-not-allowed transition"
            >
                Cancel
            </button>
            <button
                onClick={props.onRemove}
                class="flex-1 py-3 bg-[#EA4335] text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
                Remove card
            </button>
        </div>
    </div>
);

// --- Main Section Components ---

// 5. Billing Methods Card
const BillingMethodsCard: Component<{
    addBillingMethod: () => void;
}> = (props) => (
    <div class="w-full p-5 sm:p-8 bg-white rounded-2xl flex flex-col gap-8 sm:gap-10 shadow-lg">
        {/* Header and Add Button */}
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-semibold text-gray-900 leading-tight">
                    Manage billing methods
                </h2>
                <p class="text-base text-gray-800 leading-relaxed">
                    Add, update, or remove your methods
                </p>
            </div>

            {/* Add New Button */}
            <button
                class="py-3 px-4 border border-[#1376A1] text-[#1376A1] font-semibold text-base rounded-lg hover:bg-blue-50 transition flex-shrink-0"
                onClick={props.addBillingMethod}
            >
                Add a New Billing Method
            </button>
        </div>

        {/* Primary Method Section */}
        <div class="flex flex-col gap-8 w-full">
            {/* Section Title */}
            <div class="pb-2 border-b border-gray-300 flex flex-col gap-2">
                <h3 class="text-lg font-semibold text-gray-900">Primary</h3>
                <p class="text-base text-gray-800 leading-relaxed">
                    Your primary billing method is used for all recurring
                    payments.
                </p>
            </div>

            {/* Primary Card Details */}
            <div class="flex flex-col gap-5 w-full items-end">
                {/* Card Info Row */}
                <div class="flex justify-between items-center w-full">
                    <div class="flex items-center gap-4">
                        <MastercardIcon />
                        <span class="text-base font-medium text-gray-900">
                            {PRIMARY_CARD.type} ending in{' '}
                            {PRIMARY_CARD.lastFour}
                        </span>
                    </div>
                    <span class="text-base text-gray-800">
                        {PRIMARY_CARD.currency}
                    </span>
                </div>

                {/* Action Buttons Row */}
                <div class="flex items-center">
                    <button class="py-2 px-5 text-[#34A853] font-medium text-base border-r border-gray-300 hover:bg-gray-50 transition">
                        Edit
                    </button>
                    <button class="py-2 px-5 text-[#EA4335] font-medium text-base hover:bg-red-50 transition">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// 6. Transaction History Table
const TransactionHistoryTable: Component = () => {
    const HEADER_CLASSES =
        'text-left text-sm font-semibold text-gray-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap';
    const ROW_CLASSES =
        'text-sm text-gray-700 font-normal px-6 py-3 whitespace-nowrap';

    return (
        <div class="w-full bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div class="p-5 sm:px-6 sm:py-4 flex justify-between items-center border-b border-gray-100">
                <h2 class="text-xl font-semibold text-gray-900">
                    Transaction History
                </h2>
            </div>

            {/* Table Structure */}
            <div class="w-full overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr class="bg-white">
                            <th scope="col" class={`${HEADER_CLASSES} w-1/4`}>
                                Description
                            </th>
                            <th scope="col" class={`${HEADER_CLASSES} w-1/4`}>
                                Date
                            </th>
                            <th scope="col" class={`${HEADER_CLASSES} w-1/4`}>
                                Amount
                            </th>
                            <th scope="col" class={`${HEADER_CLASSES} w-1/4`}>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <For each={TRANSACTION_HISTORY}>
                            {(transaction) => (
                                <tr class="hover:bg-gray-50">
                                    <td class={ROW_CLASSES}>
                                        {transaction.description}
                                    </td>
                                    <td class={ROW_CLASSES}>
                                        {transaction.date}
                                    </td>
                                    <td class={ROW_CLASSES}>
                                        ${transaction.amount}
                                    </td>
                                    <td
                                        class={`${ROW_CLASSES} flex items-center h-full`}
                                    >
                                        <StatusBadge
                                            status={transaction.status}
                                        />
                                    </td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---
export const ClientPaymentPage: Component = () => {
    // Mock state for showing the two requested modals
    const [showErrorModal, setShowErrorModal] = createSignal(false);
    const [showRemoveModal, setShowRemoveModal] = createSignal(false);
    const [addBilingMethod, setBillingMethod] = createSignal(false);

    const addBillingMethod = () => {
        setBillingMethod(true);
    };

    return (
        // Outer container: Responsive to the viewport width
        <main class="p-6">
            {/* Main Title */}
            <h1 class="text-xl sm:text-2xl font-medium text-gray-900 leading-tight pb-5">
                Payments
            </h1>

            <AddBillingMethodForm
                isOpen={addBilingMethod}
                closeModal={setBillingMethod}
            />

            {/* Content Area */}
            <div class="flex flex-col gap-10 w-full">
                <BillingMethodsCard addBillingMethod={addBillingMethod} />
                <TransactionHistoryTable />
            </div>

            {/* --- Debug/Demonstration Buttons for Modals --- */}
            <div class="w-full p-4 border border-dashed border-gray-400 rounded-lg flex gap-4 mt-6">
                <button
                    class="bg-red-500 text-white p-2 rounded-lg"
                    onClick={() => setShowErrorModal(true)}
                >
                    Show Error Modal (Demo)
                </button>
                <button
                    class="bg-red-500 text-white p-2 rounded-lg"
                    onClick={() => setShowRemoveModal(true)}
                >
                    Show Remove Card Modal (Demo)
                </button>
            </div>

            {/* --- Modal Rendering --- */}
            {/* You would typically use a portal for modals */}
            <Show when={showErrorModal()}>
                <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <TransactionErrorModal
                        onTryAgain={() => {
                            console.log('Try Again!');
                            setShowErrorModal(false);
                        }}
                        onCancel={() => setShowErrorModal(false)}
                    />
                </div>
            </Show>

            <Show when={showRemoveModal()}>
                <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <RemoveCardConfirmationModal
                        onRemove={() => {
                            console.log('Card Removed!');
                            setShowRemoveModal(false);
                        }}
                        onCancel={() => setShowRemoveModal(false)}
                    />
                </div>
            </Show>
        </main>
    );
};
