// src/App.tsx
import { createSignal, createEffect, For, onMount } from 'solid-js';
import './styles.css';

// Define LogEntry type for better type safety
interface LogEntry {
    id: number;
    timestamp: Date;
    level:
        | 'INFO'
        | 'WARN'
        | 'ERROR'
        | 'DEBUG'
        | 'SECURITY'
        | 'API'
        | 'DATA_MODIFICATION'
        | string;
    type: string;
    user?: string;
    message: string;
    details?: {
        oldValue?: Record<string, any>;
        newValue?: Record<string, any>;
        deletedValue?: Record<string, any>;
    };
}

// --- Dummy Log Data (Simulated) ---
// In a real application, this would come from an API call to your backend.
const allLogs: LogEntry[] = [
    {
        id: 1,
        timestamp: new Date(2025, 5, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'alice.smith',
        message:
            'User alice.smith logged in successfully from IP 192.168.1.100',
    },
    {
        id: 2,
        timestamp: new Date(2025, 5, 1, 10, 5, 15),
        level: 'DEBUG',
        type: 'API',
        user: 'system',
        message: 'API call to /api/users/123 - Data fetched.',
    },
    {
        id: 3,
        timestamp: new Date(2025, 5, 1, 10, 10, 30),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'bob.johnson',
        message: 'Updated user profile for ID 456',
        details: {
            oldValue: {
                name: 'Bob Johnson',
                email: 'bob.j@example.com',
                status: 'active',
                role: 'user',
            },
            newValue: {
                name: 'Robert Johnson',
                email: 'robert.j@example.com',
                status: 'active',
                role: 'admin',
            },
        },
    },
    {
        id: 4,
        timestamp: new Date(2025, 5, 2, 11, 20, 0),
        level: 'WARN',
        type: 'SYSTEM',
        message:
            'Database connection pool reaching limit. Current connections: 95/100',
    },
    {
        id: 5,
        timestamp: new Date(2025, 5, 3, 14, 0, 0),
        level: 'ERROR',
        type: 'AUTH',
        user: 'alice.smith',
        message: 'Failed login attempt for user alice.smith. Invalid password.',
    },
    {
        id: 6,
        timestamp: new Date(2025, 5, 4, 9, 30, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'charlie.brown',
        message: 'User charlie.brown logged in successfully.',
    },
    {
        id: 7,
        timestamp: new Date(2025, 5, 5, 16, 45, 0),
        level: 'DEBUG',
        type: 'API',
        user: 'charlie.brown',
        message:
            'User charlie.brown accessed sensitive data endpoint /api/finance/report',
    },
    {
        id: 8,
        timestamp: new Date(2025, 5, 6, 8, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'diana.prince',
        message: 'Created new product entry: ProductX',
        details: {
            newValue: {
                productId: 'PX001',
                name: 'ProductX',
                price: 99.99,
                category: 'Electronics',
                stock: 100,
            },
        },
    },
    {
        id: 9,
        timestamp: new Date(2025, 6, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'eve.adams',
        message: 'User eve.adams logged in successfully from IP 10.0.0.5',
    },
    {
        id: 10,
        timestamp: new Date(2025, 6, 2, 10, 15, 0),
        level: 'ERROR',
        type: 'SYSTEM',
        message: 'Disk space critical on server-01. Remaining: 5GB',
    },
    {
        id: 11,
        timestamp: new Date(2025, 6, 3, 11, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'frank.zappa',
        message: 'Deleted old user account: UserID 789',
        details: {
            deletedValue: {
                id: 789,
                name: 'Old User',
                status: 'inactive',
                creationDate: '2020-01-01',
                lastLogin: '2023-01-01',
            },
        },
    },
    {
        id: 12,
        timestamp: new Date(2025, 6, 4, 13, 0, 0),
        level: 'WARN',
        type: 'API',
        message:
            'Third-party API request timed out after 10s: /external/service',
    },
    {
        id: 13,
        timestamp: new Date(2025, 7, 1, 9, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'grace.hopper',
        message: 'User grace.hopper logged in successfully.',
    },
    {
        id: 14,
        timestamp: new Date(2025, 7, 2, 10, 0, 0),
        level: 'DEBUG',
        type: 'API',
        message: 'Detailed debug info for request ID XYZ',
    },
    {
        id: 15,
        timestamp: new Date(2025, 7, 3, 11, 0, 0),
        level: 'SECURITY',
        type: 'AUTH',
        user: 'mallory.x',
        message: 'Brute-force attempt detected from IP 203.0.113.45',
    },
    {
        id: 16,
        timestamp: new Date(2025, 7, 4, 14, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'ivan.ivanov',
        message: 'Added new customer record: Customer A',
        details: {
            newValue: {
                customerId: 'CUST-A',
                companyName: 'Acme Corp',
                contact: 'John Doe',
                status: 'New',
            },
        },
    },
    {
        id: 17,
        timestamp: new Date(2025, 8, 1, 12, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'judy.jets',
        message: 'User judy.jets logged in.',
    },
    {
        id: 18,
        timestamp: new Date(2025, 8, 2, 13, 0, 0),
        level: 'ERROR',
        type: 'SYSTEM',
        message: 'Critical service "Payments" failed to start.',
    },
    {
        id: 19,
        timestamp: new Date(2025, 8, 3, 15, 0, 0),
        level: 'DEBUG',
        type: 'API',
        message: 'Payload for API /users/create: {name: "NewUser"}',
    },
    {
        id: 20,
        timestamp: new Date(2025, 9, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'karen.jones',
        message: 'User karen.jones logged in.',
    },
    {
        id: 21,
        timestamp: new Date(2025, 9, 2, 11, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'laura.cruz',
        message: 'Modified product quantity for ProductZ',
        details: {
            oldValue: {
                productId: 'PZ001',
                quantity: 50,
                location: 'Warehouse A',
            },
            newValue: {
                productId: 'PZ001',
                quantity: 30,
                location: 'Warehouse A',
            },
        },
    },
    {
        id: 22,
        timestamp: new Date(2025, 9, 3, 14, 0, 0),
        level: 'WARN',
        type: 'SYSTEM',
        message: 'Scheduled backup failed for database "main_db".',
    },
    {
        id: 23,
        timestamp: new Date(2025, 10, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'mike.tyson',
        message: 'User mike.tyson logged in successfully.',
    },
    {
        id: 24,
        timestamp: new Date(2025, 10, 2, 11, 0, 0),
        level: 'ERROR',
        type: 'API',
        message: 'External service returned 500: Payment Gateway unresponsive.',
    },
    {
        id: 25,
        timestamp: new Date(2025, 10, 3, 12, 0, 0),
        level: 'SECURITY',
        type: 'AUTH',
        user: 'system',
        message: 'Failed password change attempt for admin account.',
    },
    {
        id: 26,
        timestamp: new Date(2025, 11, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'nancy.drew',
        message: 'User nancy.drew logged in.',
    },
    {
        id: 27,
        timestamp: new Date(2025, 11, 2, 11, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'oliver.twist',
        message: 'Updated inventory count for item #12345.',
        details: {
            oldValue: { itemId: '12345', stock: 150 },
            newValue: { itemId: '12345', stock: 120 },
        },
    },
    {
        id: 28,
        timestamp: new Date(2024, 6, 15, 9, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'old.user',
        message: 'Old user logged in from a year ago.',
    },
    {
        id: 29,
        timestamp: new Date(2024, 6, 20, 14, 30, 0),
        level: 'ERROR',
        type: 'SYSTEM',
        message: 'Archived process failed due to file permissions.',
    },
    {
        id: 30,
        timestamp: new Date(2025, 0, 5, 8, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'january.user',
        message: 'Modified configuration setting X.',
        details: {
            oldValue: { config: 'old_value_for_X' },
            newValue: { config: 'new_value_for_X' },
        },
    },
    {
        id: 31,
        timestamp: new Date(2025, 1, 10, 17, 0, 0),
        level: 'DEBUG',
        type: 'API',
        message: 'Trace for new feature deployment.',
    },
    {
        id: 32,
        timestamp: new Date(2025, 2, 1, 10, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'march.user',
        message: 'User march.user logged in.',
    },
    {
        id: 33,
        timestamp: new Date(2025, 3, 15, 11, 0, 0),
        level: 'ERROR',
        type: 'AUTH',
        message:
            'Multiple failed login attempts detected from IP 198.51.100.1.',
    },
    {
        id: 34,
        timestamp: new Date(2025, 4, 20, 13, 0, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'april.user',
        message: 'Processed bulk data update for reports.',
        details: {
            newValue: { recordsProcessed: 1500, status: 'completed' },
        },
    },
    {
        id: 35,
        timestamp: new Date(2025, 5, 25, 16, 0, 0),
        level: 'WARN',
        type: 'SYSTEM',
        message: 'High CPU usage detected on server "web-02".',
    },
    {
        id: 36,
        timestamp: new Date(2025, 6, 1, 9, 30, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'july.user',
        message: 'User july.user logged in.',
    },
    {
        id: 37,
        timestamp: new Date(2025, 6, 7, 10, 45, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'admin.user',
        message: 'Admin modified critical system settings.',
        details: {
            oldValue: { settingA: true, settingB: 'old' },
            newValue: { settingA: false, settingB: 'new' },
        },
    },
    {
        id: 38,
        timestamp: new Date(2025, 6, 7, 11, 0, 0),
        level: 'SECURITY',
        type: 'AUTH',
        user: 'system',
        message: 'Two-factor authentication bypass attempt detected.',
    },
    {
        id: 39,
        timestamp: new Date(2025, 6, 7, 11, 15, 0),
        level: 'ERROR',
        type: 'API',
        message: 'Payment gateway connection refused.',
    },
    {
        id: 40,
        timestamp: new Date(2025, 6, 7, 12, 0, 0),
        level: 'INFO',
        type: 'LOGIN',
        user: 'current.user',
        message: 'User current.user logged in just now.',
    },
    {
        id: 41,
        timestamp: new Date(2025, 6, 7, 12, 5, 0),
        level: 'DEBUG',
        type: 'SYSTEM',
        message: 'Cache rebuild initiated.',
    },
    {
        id: 42,
        timestamp: new Date(2025, 6, 7, 12, 10, 0),
        level: 'INFO',
        type: 'DATA_MODIFICATION',
        user: 'current.user',
        message: 'User current.user modified their profile picture.',
        details: {
            oldValue: { imageUrl: 'old_pic.jpg', thumbUrl: 'old_thumb.jpg' },
            newValue: { imageUrl: 'new_pic.jpg', thumbUrl: 'new_thumb.jpg' },
        },
    },
    {
        id: 43,
        timestamp: new Date(2025, 6, 7, 12, 15, 0),
        level: 'WARN',
        type: 'API',
        message: 'External image service responded with a large file (20MB).',
    },
    {
        id: 44,
        timestamp: new Date(2025, 6, 7, 12, 20, 0),
        level: 'SECURITY',
        type: 'LOGIN',
        user: 'suspicious.user',
        message: 'Login from new suspicious IP detected: 8.8.8.8',
    },
    {
        id: 45,
        timestamp: new Date(2025, 6, 7, 12, 25, 0),
        level: 'ERROR',
        type: 'SYSTEM',
        message: 'File system corruption detected in /var/log.',
    },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by newest first

// Helper to format Date objects
const formatTimestamp = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return date.toLocaleString('en-US', options);
};

// Helper to get Tailwind color classes based on log level
const getLogLevelColor = (level: LogEntry['level']) => {
    switch (level.toUpperCase()) {
        case 'INFO':
            return 'text-blue-400 bg-blue-900/20 border-blue-700';
        case 'WARN':
            return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
        case 'ERROR':
            return 'text-red-400 bg-red-900/20 border-red-700';
        case 'DEBUG':
            return 'text-purple-400 bg-purple-900/20 border-purple-700';
        case 'SECURITY':
            return 'text-teal-400 bg-teal-900/20 border-teal-700';
        case 'API':
            return 'text-orange-400 bg-orange-900/20 border-orange-700';
        case 'DATA_MODIFICATION':
            return 'text-fuchsia-400 bg-fuchsia-900/20 border-fuchsia-700';
        default:
            return 'text-gray-400 bg-gray-700/20 border-gray-600';
    }
};

export const LoggerPage = () => {
    // SolidJS Signals for reactive state
    const [startDate, setStartDate] = createSignal<Date | null>(null);
    const [endDate, setEndDate] = createSignal<Date | null>(null);
    const [searchTerm, setSearchTerm] = createSignal('');
    const [selectedTypes, setSelectedTypes] = createSignal<string[]>([
        'INFO',
        'WARN',
        'ERROR',
        'DEBUG',
        'SECURITY',
        'API',
        'DATA_MODIFICATION',
    ]);
    const [showModal, setShowModal] = createSignal(false);
    const [modalDetails, setModalDetails] = createSignal<
        LogEntry['details'] | null
    >(null);
    const [filteredLogs, setfilteredLogs] = createSignal<LogEntry[]>([]);

    // Computed signal for filtered logs
    onMount(() => {
        let logs = allLogs;
        // 1. Filter by Date Range
        if (startDate() && endDate()) {
            logs = logs.filter((log) => {
                return (
                    log.timestamp >= startDate()! && log.timestamp <= endDate()!
                );
            });
        }

        // 2. Filter by Search Term
        if (searchTerm()) {
            const lowerCaseSearchTerm = searchTerm().toLowerCase();
            logs = logs.filter(
                (log) =>
                    log.message.toLowerCase().includes(lowerCaseSearchTerm) ||
                    log.level.toLowerCase().includes(lowerCaseSearchTerm) ||
                    log.type.toLowerCase().includes(lowerCaseSearchTerm) ||
                    (log.user &&
                        log.user.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        // 3. Filter by Log Type
        if (selectedTypes().length > 0) {
            logs = logs.filter((log) => selectedTypes().includes(log.type));
        }

        setfilteredLogs(logs);
    });

    // Initial load: Set default filter to "Last Month"
    createEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 1);
        setStartDate(start);
        setEndDate(end);
    });

    // Handlers for filter actions
    const handleDateRange = (months: number) => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - months);
        setStartDate(start);
        setEndDate(end);
    };

    const handleApplyCustomDate = (e: Event) => {
        // const target = e.target as HTMLButtonElement;
        console.log(e);
        const startInput = document.getElementById(
            'start-date'
        ) as HTMLInputElement;
        const endInput = document.getElementById(
            'end-date'
        ) as HTMLInputElement;

        const start = startInput.value ? new Date(startInput.value) : null;
        const end = endInput.value ? new Date(endInput.value) : null;

        if (start && end) {
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            setStartDate(start);
            setEndDate(end);
        } else if (!start && !end) {
            setStartDate(null);
            setEndDate(null);
        } else {
            alert('Please select both start and end dates, or neither.');
        }
    };

    const handleTypeChange = (e: Event) => {
        const checkbox = e.target as HTMLInputElement;
        if (checkbox.checked) {
            setSelectedTypes([...selectedTypes(), checkbox.value]);
        } else {
            setSelectedTypes(
                selectedTypes().filter((type) => type !== checkbox.value)
            );
        }
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setStartDate(null);
        setEndDate(null);
        setSelectedTypes([
            'INFO',
            'WARN',
            'ERROR',
            'DEBUG',
            'SECURITY',
            'API',
            'DATA_MODIFICATION',
        ]);
        (document.getElementById('search-input') as HTMLInputElement).value =
            '';
        (document.getElementById('start-date') as HTMLInputElement).value = '';
        (document.getElementById('end-date') as HTMLInputElement).value = '';
        document.querySelectorAll('.log-type-checkbox').forEach((cb) => {
            (cb as HTMLInputElement).checked = true;
        });
        // Re-apply initial "Last Month" filter behavior
        handleDateRange(1);
    };

    const openModal = (details: LogEntry['details']) => {
        setModalDetails(details);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalDetails(null);
    };

    return (
        <div
            class="bg-gray-900 text-gray-100 font-sans antialiased flex flex-col h-screen"
            style={'width: 100%'}
        >
            {/* Header */}
            <header class="bg-gray-800 p-4 shadow-lg z-10">
                <h1 class="text-3xl font-extrabold text-white text-center tracking-wide">
                    AppLog Explorer
                </h1>
                <p class="text-gray-400 text-center text-sm mt-1">
                    Intuitive visualization and analysis of application debug
                    logs.
                </p>
            </header>

            {/* Main Content Area */}
            <main class="flex flex-1 overflow-hidden p-4">
                {/* Sidebar for Filters */}
                <aside class="w-72 bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col space-y-6 mr-4 overflow-y-auto custom-scrollbar">
                    <h2 class="text-xl font-bold text-white mb-4">Filters</h2>

                    {/* Date Range Filter */}
                    <div>
                        <label
                            for="date-range"
                            class="block text-gray-300 text-sm font-semibold mb-2"
                        >
                            Date Range:
                        </label>
                        <div class="flex flex-col space-y-2">
                            <button
                                onClick={() => handleDateRange(1)}
                                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                            >
                                Last Month
                            </button>
                            <button
                                onClick={() => handleDateRange(12)}
                                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                            >
                                Last Year
                            </button>
                        </div>
                        <div class="mt-4">
                            <label
                                for="start-date"
                                class="block text-gray-300 text-sm font-semibold mb-1"
                            >
                                From:
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                class="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                                value={
                                    startDate()?.toISOString().split('T')[0] ||
                                    ''
                                }
                                onInput={(e) =>
                                    setStartDate(
                                        e.currentTarget.value
                                            ? new Date(e.currentTarget.value)
                                            : null
                                    )
                                }
                            />
                        </div>
                        <div class="mt-2">
                            <label
                                for="end-date"
                                class="block text-gray-300 text-sm font-semibold mb-1"
                            >
                                To:
                            </label>
                            <input
                                type="date"
                                id="end-date"
                                class="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white"
                                value={
                                    endDate()?.toISOString().split('T')[0] || ''
                                }
                                onInput={(e) =>
                                    setEndDate(
                                        e.currentTarget.value
                                            ? new Date(e.currentTarget.value)
                                            : null
                                    )
                                }
                            />
                        </div>
                        <button
                            onClick={handleApplyCustomDate}
                            class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                        >
                            Apply Date Filter
                        </button>
                    </div>

                    <div class="border-t border-gray-700 pt-6"></div>

                    {/* Keyword Search */}
                    <div>
                        <label
                            for="search-input"
                            class="block text-gray-300 text-sm font-semibold mb-2"
                        >
                            Search Keyword:
                        </label>
                        <input
                            type="text"
                            id="search-input"
                            placeholder="e.g., login, error, user ID"
                            class="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
                            onInput={(e) =>
                                setSearchTerm(e.currentTarget.value.trim())
                            }
                            value={searchTerm()}
                        />
                    </div>

                    <div class="border-t border-gray-700 pt-6"></div>

                    {/* Log Type Filters */}
                    <div>
                        <label class="block text-gray-300 text-sm font-semibold mb-2">
                            Log Types:
                        </label>
                        <div class="space-y-2">
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    value="INFO"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes('INFO')}
                                />
                                <span class="ml-2">Info</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                                    value="WARN"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes('WARN')}
                                />
                                <span class="ml-2">Warning</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                                    value="ERROR"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes('ERROR')}
                                />
                                <span class="ml-2">Error</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                                    value="DEBUG"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes('DEBUG')}
                                />
                                <span class="ml-2">Debug</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500"
                                    value="SECURITY"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes(
                                        'SECURITY'
                                    )}
                                />
                                <span class="ml-2">Security</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                                    value="API"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes('API')}
                                />
                                <span class="ml-2">API Call</span>
                            </label>
                            <label class="flex items-center text-gray-200">
                                <input
                                    type="checkbox"
                                    class="log-type-checkbox form-checkbox h-4 w-4 text-fuchsia-500 bg-gray-700 border-gray-600 rounded focus:ring-fuchsia-500"
                                    value="DATA_MODIFICATION"
                                    onChange={handleTypeChange}
                                    checked={selectedTypes().includes(
                                        'DATA_MODIFICATION'
                                    )}
                                />
                                <span class="ml-2">Data Modification</span>
                            </label>
                        </div>
                    </div>

                    <div class="border-t border-gray-700 pt-6"></div>

                    {/* Reset Filters Button */}
                    <button
                        onClick={handleResetFilters}
                        class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-auto"
                    >
                        Reset Filters
                    </button>
                </aside>

                {/* Log Display Area */}
                <section class="flex-1 bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col">
                    <h2 class="text-xl font-bold text-white mb-4">
                        Log Entries
                    </h2>
                    <div
                        id="log-entries-container"
                        class="flex-1 overflow-y-auto custom-scrollbar space-y-3 p-2 bg-gray-900 rounded-md"
                    >
                        <For each={filteredLogs()}>
                            {(log) => {
                                const levelColors = getLogLevelColor(log.level);
                                return (
                                    <div
                                        class={`p-4 rounded-lg border shadow-md transition-all duration-150 hover:bg-gray-800 ${levelColors}`}
                                    >
                                        <div class="flex justify-between items-start text-sm mb-1">
                                            <span class="font-mono text-gray-400">
                                                {formatTimestamp(log.timestamp)}
                                            </span>
                                            <div class="flex space-x-2 items-center">
                                                <span
                                                    class={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors
                                                        .split(' ')[0]
                                                        .replace(
                                                            '400',
                                                            '200'
                                                        )} ${levelColors
                                                        .split(' ')[1]
                                                        .replace(
                                                            '900/20',
                                                            '700'
                                                        )}`}
                                                >
                                                    {log.level}
                                                </span>
                                                <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-700 text-gray-300">
                                                    {log.type}
                                                </span>
                                                {log.type ===
                                                    'DATA_MODIFICATION' &&
                                                    log.details && (
                                                        <button
                                                            onClick={() =>
                                                                openModal(
                                                                    log.details
                                                                )
                                                            }
                                                            class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-1 px-3 rounded-md ml-3 transition-all duration-200"
                                                        >
                                                            View Details
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                        <p class="text-base font-medium text-gray-200">
                                            {log.message}
                                        </p>
                                        {log.user && (
                                            <p class="text-xs text-gray-400 mt-1">
                                                User:{' '}
                                                <span class="font-mono">
                                                    {log.user}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                );
                            }}
                        </For>
                        {filteredLogs().length === 0 && (
                            <p class="text-center text-gray-500 italic mt-8">
                                No logs found matching your criteria.
                            </p>
                        )}
                    </div>
                </section>
            </main>

            {/* Details Modal */}
            <div
                classList={{ 'modal-overlay': true, active: showModal() }}
                onClick={(e) =>
                    (e.target as HTMLElement).classList.contains(
                        'modal-overlay'
                    ) && closeModal()
                }
            >
                <div class="modal-content relative">
                    <button
                        onClick={closeModal}
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
                    >
                        &times;
                    </button>
                    <h3 class="text-2xl font-bold text-white mb-4">
                        Log Details
                    </h3>

                    <div class="text-gray-300">
                        {modalDetails() &&
                            modalDetails()!.oldValue &&
                            modalDetails()!.newValue && (
                                <>
                                    <p class="font-semibold text-lg text-gray-200 mb-2">
                                        Before:
                                    </p>
                                    <pre class="bg-gray-700 p-3 rounded-md text-sm overflow-x-auto custom-scrollbar">
                                        {JSON.stringify(
                                            modalDetails()!.oldValue,
                                            null,
                                            2
                                        )}
                                    </pre>
                                    <p class="font-semibold text-lg text-gray-200 mt-4 mb-2">
                                        After:
                                    </p>
                                    <pre class="bg-gray-700 p-3 rounded-md text-sm overflow-x-auto custom-scrollbar">
                                        {JSON.stringify(
                                            modalDetails()!.newValue,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </>
                            )}
                        {modalDetails() && modalDetails()!.deletedValue && (
                            <>
                                <p class="font-semibold text-lg text-red-300 mb-2">
                                    Deleted Value:
                                </p>
                                <pre class="bg-gray-700 p-3 rounded-md text-sm overflow-x-auto custom-scrollbar">
                                    {JSON.stringify(
                                        modalDetails()!.deletedValue,
                                        null,
                                        2
                                    )}
                                </pre>
                            </>
                        )}
                        {modalDetails() &&
                            !modalDetails()!.oldValue &&
                            modalDetails()!.newValue && ( // For creation events (only newValue)
                                <>
                                    <p class="font-semibold text-lg text-green-300 mb-2">
                                        Created Value:
                                    </p>
                                    <pre class="bg-gray-700 p-3 rounded-md text-sm overflow-x-auto custom-scrollbar">
                                        {JSON.stringify(
                                            modalDetails()!.newValue,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </>
                            )}
                        {!modalDetails() ||
                            (!modalDetails()!.oldValue &&
                                !modalDetails()!.newValue &&
                                !modalDetails()!.deletedValue && (
                                    <p class="text-gray-400">
                                        No specific modification details
                                        available.
                                    </p>
                                ))}
                    </div>

                    <button
                        onClick={closeModal}
                        class="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
