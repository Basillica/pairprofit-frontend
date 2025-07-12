import {
    createContext,
    useContext,
    createSignal,
    createEffect,
    JSX,
    Accessor,
    Setter,
} from 'solid-js';
import { UserModel } from './models/auth';

interface NotificationType {
    showAppNotification: (
        type: 'success' | 'warning' | 'error',
        message: string
    ) => void;
    notificationType: Accessor<'success' | 'warning' | 'error' | null>;
    setNotificationType: Setter<'success' | 'warning' | 'error' | null>;
    notificationMessage: Accessor<string | null>;
    setNotificationMessage: Setter<string | null>;
}

interface UserType {
    authUser: Accessor<UserModel | undefined>;
    setAuthUser: Setter<UserModel | undefined>;
}
interface AppContextType {
    isConnected: Accessor<boolean>; // More semantic than just 'socket' presence
    sendMessage: (data: string) => void;
    socketMessage: Accessor<MessageEvent<string>>;
    updateNotifWidget: Accessor<boolean>;
    setNotifWidget: Setter<boolean>;
    syncMode: Accessor<boolean>;
    setSyncMode: Setter<boolean>;
    notification: NotificationType;
    userType: UserType;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = (props: {
    url: string;
    query: Accessor<string>; // Query is a signal
    children: JSX.Element;
}) => {
    const [socket, setSocket] = createSignal<WebSocket | null>(null);
    const [isConnected, setIsConnected] = createSignal<boolean>(false);
    const [authUser, setAuthUser] = createSignal<UserModel>();
    const [notificationType, setNotificationType] = createSignal<
        'success' | 'warning' | 'error' | null
    >(null);
    const [notificationMessage, setNotificationMessage] = createSignal<
        string | null
    >(null);
    const [socketMessage, setSocketMessage] = createSignal<
        MessageEvent<string>
    >(
        new MessageEvent('') // Initial value - be mindful in consuming components
    );
    const [updateNotifWidget, setNotifWidget] = createSignal<boolean>(false);
    const [syncMode, setSyncMode] = createSignal(false);

    let retryCount = 0;
    const maxRetries = 4;
    const retryInterval = 5000; // 5 seconds

    const connectToWS = () => {
        // Prevent reconnecting if already connected or if query is empty
        if (socket() && socket()?.readyState === WebSocket.OPEN) {
            console.log('Client is already connected.');
            return;
        }
        if (props.query() === '') {
            console.log('Query is empty, not connecting to WebSocket.');
            return;
        }

        if (retryCount >= maxRetries) {
            console.warn(
                `Max reconnection attempts (${maxRetries}) reached. Not attempting further connections.`
            );
            setIsConnected(false);
            setSocket(null); // Ensure socket is null if retries exhausted
            return;
        }

        console.log(
            `Attempting to connect to WebSocket (attempt ${
                retryCount + 1
            }/${maxRetries})...`
        );
        // Increment retryCount *before* attempting connection
        retryCount++;

        const ws = new WebSocket(`${props.url}&${props.query()}`);
        setSocket(ws);
        setIsConnected(false); // Set to false initially, will be true on 'open'

        ws.onopen = () => {
            console.log('WebSocket connected!');
            setIsConnected(true);
            retryCount = 0; // Reset retry count on successful connection
        };

        ws.onmessage = (event: MessageEvent<string>) => {
            try {
                const ev = JSON.parse(event.data);
                console.log('Received WS message:', ev);
                setSocketMessage(event); // Store the raw message event
                // If you want to expose parsed data:
                // setParsedMessage(ev);
            } catch (e) {
                console.error(
                    'Failed to parse WebSocket message:',
                    e,
                    event.data
                );
            }
        };

        ws.onclose = (event: CloseEvent) => {
            console.log(
                `WebSocket closed. Reason: ${
                    event.reason || 'No reason provided'
                }. Code: ${event.code}. Will attempt reconnection in ${
                    retryInterval / 1000
                } seconds.`,
                event
            );
            setIsConnected(false); // Update connection status
            setSocket(null); // Clear the socket instance
            // Only attempt reconnect if not explicitly closed by us (e.g., query change)
            // and if max retries not reached
            if (retryCount < maxRetries) {
                setTimeout(() => connectToWS(), retryInterval);
            } else {
                console.warn(
                    'Max reconnection attempts reached, not trying again automatically.'
                );
            }
        };

        ws.onerror = (error: Event) => {
            console.error('WebSocket encountered error:', error);
            // errors often lead to a close event, so the reconnection logic should be in onclose
            // Explicitly close the socket if an error occurs to trigger onclose
            if (
                ws.readyState === WebSocket.OPEN ||
                ws.readyState === WebSocket.CONNECTING
            ) {
                ws.close();
            }
        };
    };

    const showAppNotification = (
        type: 'success' | 'warning' | 'error',
        message: string
    ) => {
        setNotificationType(type);
        setNotificationMessage(message);
    };

    // Effect to manage WebSocket connection based on props.query
    createEffect(() => {
        const currentQuery = props.query();
        if (currentQuery !== '') {
            // If there's an existing open socket and the query changes, close it first
            if (socket() && socket()?.readyState === WebSocket.OPEN) {
                console.log('Query changed, closing existing WebSocket...');
                socket()?.close(1000, 'Query changed'); // Clean close
                // The onclose handler will then trigger a new connection attempt
            } else {
                // If no socket or not open, try to connect immediately
                connectToWS();
            }
        } else {
            // If query becomes empty, close any active socket
            if (socket() && socket()?.readyState === WebSocket.OPEN) {
                console.log('Query became empty, closing WebSocket.');
                socket()?.close(1000, 'Query empty');
            }
            setSocket(null);
            setIsConnected(false);
            retryCount = 0; // Reset retries if query becomes empty
        }

        // Cleanup function for when the effect re-runs or component unmounts
        return () => {
            if (socket() && socket()?.readyState === WebSocket.OPEN) {
                console.log('Effect cleanup: Closing WebSocket.');
                socket()?.close(1000, 'Component unmounted or effect re-ran');
            }
            setSocket(null);
            setIsConnected(false);
            retryCount = 0; // Reset retries on cleanup
        };
    });

    const sendMessage = (data: string) => {
        if (socket()?.readyState === WebSocket.OPEN) {
            socket()!.send(data);
        } else {
            console.warn('WebSocket is not open. Message not sent:', data);
        }
    };

    return (
        <AppContext.Provider
            value={{
                isConnected, // Expose connection status
                sendMessage,
                socketMessage,
                updateNotifWidget,
                setNotifWidget,
                syncMode,
                setSyncMode,
                notification: {
                    showAppNotification,
                    notificationMessage,
                    setNotificationMessage,
                    notificationType,
                    setNotificationType,
                },
                userType: {
                    authUser,
                    setAuthUser,
                },
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error(
            'useAppContext must be used within a AppContextProvider'
        );
    }
    return context;
};
