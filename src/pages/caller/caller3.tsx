import { createSignal, createEffect, onCleanup, For, Show } from 'solid-js';

interface User {
    id: string;
    name: string;
    service: string;
}

interface ActiveCall {
    id: string;
    peer: string;
    service: string;
    startTime: Date;
    duration: number;
}

interface CallHistoryItem {
    id: number; // Unique ID for keying in <For> component
    peer: string;
    service: string;
    duration: number; // in seconds
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    status: 'completed' | 'missed' | 'failed';
}

export const CallerPageV3 = () => {
    // --- Dummy Data ---
    const users: User[] = [
        { id: 'user1', name: 'John Smith', service: 'Graphic Design Project' },
        { id: 'user2', name: 'Alice Brown', service: 'Marketing Strategy' },
        { id: 'user3', name: 'Sarah Davis', service: 'Content Writing' },
        {
            id: 'user4',
            name: 'Michael Green',
            service: 'Web Development Consultation',
        },
    ];

    const [callHistory, setCallHistory] = createSignal<CallHistoryItem[]>([]);
    const [activeCall, setActiveCall] = createSignal<ActiveCall | null>(null);
    const [recipientSearchInput, setRecipientSearchInput] =
        createSignal<string>('');
    const [searchResults, setSearchResults] = createSignal<User[]>(users);
    const [selectedUser, setSelectedUser] = createSignal<User | null>(null); // Stores the user object chosen for call
    const [callDurationFormatted, setCallDurationFormatted] =
        createSignal<string>('00:00:00');

    // --- Effects ---
    let durationInterval: NodeJS.Timeout | undefined; // Use number for setInterval return type
    createEffect(() => {
        const currentActiveCall = activeCall();
        if (currentActiveCall) {
            const startTime = currentActiveCall.startTime.getTime();
            durationInterval = setInterval(() => {
                const now = new Date().getTime();
                const diff = Math.floor((now - startTime) / 1000);
                const hours = Math.floor(diff / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;
                setCallDurationFormatted(
                    `${String(hours).padStart(2, '0')}:${String(
                        minutes
                    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
                // Update duration in seconds on the activeCall object for history
                setActiveCall((prev) =>
                    prev ? { ...prev, duration: diff } : null
                );
            }, 1000);
        } else {
            clearInterval(durationInterval);
            setCallDurationFormatted('00:00:00'); // Reset duration when no active call
        }

        // Cleanup function for the effect
        onCleanup(() => clearInterval(durationInterval));
    });

    // Initialize call history with dummy data on component mount
    // Using an empty dependency array for createEffect makes it run once on mount
    createEffect(() => {
        addCallToHistory({
            id: Date.now() + Math.random(), // Unique ID for initial items
            peer: 'Jane Doe',
            service: 'Frontend Development',
            duration: 900, // 15 minutes
            date: '2025-07-10',
            time: '10:30',
            status: 'completed',
        });
        addCallToHistory({
            id: Date.now() + Math.random() + 1,
            peer: 'Alice Brown',
            service: 'Marketing Strategy',
            duration: 0,
            date: '2025-07-09',
            time: '15:15',
            status: 'missed',
        });
        addCallToHistory({
            id: Date.now() + Math.random() + 2,
            peer: 'Sarah Davis',
            service: 'Content Writing',
            duration: 1800, // 30 minutes
            date: '2025-07-08',
            time: '11:00',
            status: 'completed',
        });
    }, []); // Empty array makes it run only once on mount

    // --- Event Handlers and Logic ---

    const handleSearchInput = (e: Event) => {
        const inputElement = e.target as HTMLInputElement;
        const query = inputElement.value;
        setRecipientSearchInput(query);
        setSelectedUser(null); // Clear selected user when input changes

        if (query.length > 0) {
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.service.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    const selectUserForCall = (user: User) => {
        setRecipientSearchInput(user.name);
        setSelectedUser(user);
        setSearchResults([]); // Clear search results after selection
    };

    const startCall = () => {
        if (!selectedUser()) {
            alert('Please select a user to call from the search results.');
            return;
        }

        if (activeCall()) {
            alert(
                'You are already in an active call. Please end it before starting a new one.'
            );
            return;
        }

        console.log(
            `Initiating call with ${selectedUser()?.name} (ID: ${
                selectedUser()?.id
            })...`
        );
        alert(`Calling ${selectedUser()?.name}... (Simulated WebRTC Call)`);

        // Asserting selectedUser() is not null with !
        setActiveCall({
            id: 'call_' + Date.now(),
            peer: selectedUser()!.name,
            service: selectedUser()!.service,
            startTime: new Date(),
            duration: 0, // Will be updated by effect
        });

        // In a real app, you'd trigger WebRTC signaling here
        // e.g., send an offer to your backend, which then relays to the other user.
    };

    const endActiveCall = () => {
        const currentActiveCall = activeCall();
        if (!currentActiveCall) return;

        const callStatus: CallHistoryItem['status'] =
            Math.random() > 0.1 ? 'completed' : 'failed'; // Simulate success/failure

        addCallToHistory({
            id: Date.now(), // Unique ID for new history item
            peer: currentActiveCall.peer,
            service: currentActiveCall.service,
            duration: currentActiveCall.duration, // in seconds
            date: currentActiveCall.startTime.toISOString().split('T')[0],
            time: currentActiveCall.startTime
                .toTimeString()
                .split(' ')[0]
                .substring(0, 5),
            status: callStatus,
        });

        console.log(
            `Call with ${currentActiveCall.peer} ended. Duration: ${currentActiveCall.duration} seconds. Status: ${callStatus}`
        );
        alert(`Call with ${currentActiveCall.peer} ended.`);

        setActiveCall(null); // Clear active call
        setRecipientSearchInput(''); // Clear search input
        setSelectedUser(null); // Clear selected user
    };

    const addCallToHistory = (call: CallHistoryItem) => {
        setCallHistory((prevHistory) => [
            { ...call, id: Date.now() + Math.random() },
            ...prevHistory,
        ]);
    };

    return (
        <div class="min-h-screen flex flex-col">
            {/* Main Content Area */}
            <main class="flex-grow container mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Left Panel: Current Call Status / New Call Initiation */}
                <div class="md:col-span-1 bg-white rounded-lg shadow-md p-4 md:p-6">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Current Calls & New Call
                    </h2>

                    <div class="mb-6 border-b pb-4">
                        <h3 class="text-lg font-medium text-gray-600 mb-2">
                            Active Call
                        </h3>
                        <Show
                            when={activeCall()}
                            fallback={
                                <p class="text-gray-500 text-sm">
                                    No active calls at the moment.
                                </p>
                            }
                        >
                            {(
                                call // 'call' here is implicitly typed as ActiveCall due to 'when' prop
                            ) => (
                                <div class="text-gray-500 text-sm">
                                    <p class="font-bold">
                                        Calling: {call().peer}
                                    </p>
                                    <p>Service: {call().service}</p>
                                    <p>Duration: {callDurationFormatted()}</p>
                                    <div class="mt-2 flex space-x-2">
                                        <button
                                            onClick={endActiveCall}
                                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            End Call
                                        </button>
                                        <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                            Mute
                                        </button>
                                        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                            Video Off
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Show>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium text-gray-600 mb-4">
                            Initiate New Call
                        </h3>
                        <div class="mb-4">
                            <label
                                for="recipientSearch"
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Search User to Call:
                            </label>
                            <input
                                type="text"
                                id="recipientSearch"
                                placeholder="Enter username or service ID"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onInput={handleSearchInput}
                                value={recipientSearchInput()}
                            />
                            <div
                                id="searchResults"
                                class="mt-2 text-sm text-gray-600"
                            >
                                <For each={searchResults()}>
                                    {(
                                        user // 'user' here is typed as User
                                    ) => (
                                        <div
                                            class="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                            onClick={() =>
                                                selectUserForCall(user)
                                            }
                                        >
                                            {user.name} ({user.service})
                                        </div>
                                    )}
                                </For>
                                <Show
                                    when={
                                        recipientSearchInput().length > 0 &&
                                        searchResults().length === 0
                                    }
                                >
                                    <p class="text-gray-500">No users found.</p>
                                </Show>
                            </div>
                        </div>
                        <button
                            onClick={startCall}
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Start Video/Audio Call
                        </button>
                    </div>
                </div>

                {/* Middle Panel: Call History */}
                <div class="md:col-span-2 bg-white rounded-lg shadow-md p-4 md:p-6 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">
                        Call History
                    </h2>

                    <div id="callHistoryList" class="space-y-4">
                        {/* Using `key` prop for efficient list updates with For component */}
                        <For
                            each={callHistory()}
                            fallback={<p>No call history yet.</p>}
                        >
                            {(
                                call // 'call' here is typed as CallHistoryItem
                            ) => (
                                <div
                                    classList={{
                                        'flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 border border-gray-200 rounded-md':
                                            true,
                                        'bg-red-50':
                                            call.status === 'failed' ||
                                            call.status === 'missed',
                                    }}
                                >
                                    <div class="flex-shrink-0">
                                        <Show
                                            when={call.status === 'completed'}
                                            fallback={
                                                <svg
                                                    class="h-8 w-8 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            }
                                        >
                                            <svg
                                                class="h-8 w-8 text-green-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </Show>
                                    </div>
                                    <div class="flex-grow">
                                        <p class="text-gray-800 font-medium">
                                            {call.status === 'missed'
                                                ? 'Missed Call from'
                                                : 'Call with'}{' '}
                                            <span class="font-bold">
                                                {call.peer}
                                            </span>
                                        </p>
                                        <p class="text-sm text-gray-600">
                                            Service: {call.service}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            {call.duration
                                                ? `Duration: ${Math.floor(
                                                      call.duration / 60
                                                  )} min | `
                                                : ''}
                                            Date: {call.date} {call.time}
                                        </p>
                                    </div>
                                    <div class="flex-shrink-0 mt-2 sm:mt-0">
                                        <button class="text-blue-500 hover:text-blue-700 text-sm">
                                            {call.status === 'missed'
                                                ? 'Call Back'
                                                : 'View Details'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </main>
        </div>
    );
};
