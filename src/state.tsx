import {
    createContext,
    useContext,
    createSignal,
    createEffect,
    JSX,
    Accessor,
    Setter,
    onCleanup,
} from 'solid-js';
import { UserModel } from './models/auth';
import {
    AnswerMessage,
    CallAcceptedMessage,
    CallRequestMessage,
    CandidateMessage,
    HangUpMessage,
    OfferMessage,
    RegisterMessage,
    SignalingMessage,
    ActiveCall,
    CallHistoryItem,
    ChatMessage,
} from './types';

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
    userID: Accessor<string>;
    setUserID: Setter<string>;
    callHistory: Accessor<CallHistoryItem[]>;
    setCallHistory: Setter<CallHistoryItem[]>;
    addCallToHistory: (call: CallHistoryItem) => void;
}

interface InAppConnection {
    socket: Accessor<WebSocket | null>;
    registerUser: () => void;
    startCall: () => Promise<void>;
    activeCall: Accessor<ActiveCall | null>;
    setActiveCall: Setter<ActiveCall | null>;
    selectedUserToCall: Accessor<UserModel | null>;
    setSelectedUserToCall: Setter<UserModel | null>;
    setRemoteUserId: Setter<string>;
    endActiveCall: () => void;
}

interface AppContextType {
    isConnected: Accessor<boolean>; // More semantic than just 'socket' presence
    sendMessage: (chatMessage: ChatMessage) => void;
    updateNotifWidget: Accessor<boolean>;
    setNotifWidget: Setter<boolean>;
    syncMode: Accessor<boolean>;
    setSyncMode: Setter<boolean>;
    notification: NotificationType;
    userType: UserType;
    inAppConnection: InAppConnection;
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
    const [selectedUserToCall, setSelectedUserToCall] =
        createSignal<UserModel | null>(null);
    const [activeCall, setActiveCall] = createSignal<ActiveCall | null>(null);
    const [notificationType, setNotificationType] = createSignal<
        'success' | 'warning' | 'error' | null
    >(null);
    const [callHistory, setCallHistory] = createSignal<CallHistoryItem[]>([]);
    const [notificationMessage, setNotificationMessage] = createSignal<
        string | null
    >(null);
    const [updateNotifWidget, setNotifWidget] = createSignal<boolean>(false);
    const [syncMode, setSyncMode] = createSignal(false);
    // --- Call setup ---
    const [localStream, setLocalStream] = createSignal<MediaStream | null>(
        null
    );
    const [_, setRemoteStream] = createSignal<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] =
        createSignal<RTCPeerConnection | null>(null);
    const [userID, setUserID] = createSignal('');
    const [remoteUserId, setRemoteUserId] = createSignal<string>('');
    const [callStatus, setCallStatus] = createSignal<
        'idle' | 'calling' | 'incoming' | 'connected'
    >('idle');
    // Define STUN/TURN servers
    const STUN_SERVERS: RTCConfiguration['iceServers'] = [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
        // { urls: 'turn:bytewelle.turn.com:3478', username: 'testuser', credential: 'testpassword' },
    ];

    let retryCount = 0;
    const maxRetries = 4;
    const retryInterval = 5000; // 5 seconds
    let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const connectToWS = () => {
        // Prevent reconnecting if already connected or if query is empty
        if (props.url === '' || !authUser()) {
            console.log('Query is empty, not connecting to WebSocket.');
            return;
        }

        if (socket() || socket()?.readyState === WebSocket.OPEN) {
            console.log('Client is already connected.');
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
        const ws = new WebSocket(`${props.url}/public/ws/${authUser()!.id}`);
        setSocket(ws);
        setIsConnected(false); // Set to false initially, will be true on 'open'

        ws.onopen = () => {
            console.log('WebSocket connected!');
            setIsConnected(true);
            retryCount = 0; // Reset retry count on successful connection
        };

        ws.onmessage = (event: MessageEvent<string>) =>
            handleSignalingMessage(event);

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

            // Clear any pending reconnection timeout if a successful connection occurs
            if (reconnectTimeoutId) {
                clearTimeout(reconnectTimeoutId);
                reconnectTimeoutId = null;
            }

            // --- ADD THIS: Send a Register message ---
            const currentAuthUser = authUser(); // Get the current user ID
            if (currentAuthUser && currentAuthUser.id) {
                const registerMessage = JSON.stringify({
                    type: 'register',
                    user_id: currentAuthUser.id,
                });
                ws.send(registerMessage);
                console.log(
                    `WS: Sent 'register' message for user ID: ${currentAuthUser.id}`
                );
            } else {
                console.warn(
                    'WS: User ID not available for registration, connection might be limited.'
                );
                // Consider closing the connection if registration is mandatory
                ws.close(1003, 'User ID missing for registration');
            }

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
    // createEffect(() => {
    //     // const currentQuery = props.query();
    //     if (props.url !== '' && authUser()) {
    //         // set current user ID
    //         setUserID(authUser()?.id!);
    //         // If there's an existing open socket and the query changes, close it first
    //         if (socket() && socket()?.readyState === WebSocket.OPEN) {
    //             console.log('Query changed, closing existing WebSocket...');
    //             socket()?.close(1000, 'Query changed'); // Clean close
    //             // The onclose handler will then trigger a new connection attempt
    //         } else {
    //             // If no socket or not open, try to connect immediately
    //             connectToWS();
    //         }
    //     } else {
    //         // If query becomes empty, close any active socket
    //         if (socket() && socket()?.readyState === WebSocket.OPEN) {
    //             console.log('Query became empty, closing WebSocket.');
    //             socket()?.close(1000, 'Query empty');
    //         }
    //         setSocket(null);
    //         setIsConnected(false);
    //         retryCount = 0; // Reset retries if query becomes empty
    //     }

    //     // Cleanup function for when the effect re-runs or component unmounts
    //     return () => {
    //         if (socket() && socket()?.readyState === WebSocket.OPEN) {
    //             console.log('Effect cleanup: Closing WebSocket.');
    //             socket()?.close(1000, 'Component unmounted or effect re-ran');
    //         }
    //         setSocket(null);
    //         setIsConnected(false);
    //         retryCount = 0; // Reset retries on cleanup
    //     };
    // });

    createEffect(() => {
        const currentUrl = props.url;
        const currentAuthUser = authUser();
        const currentSocket = socket(); // Get the current socket instance from the signal

        const desiredToConnect = currentUrl !== '' && currentAuthUser !== null;
        const currentUserId = currentAuthUser?.id;

        console.log(
            `WS Effect: Desired to connect: ${desiredToConnect}, Current URL: ${currentUrl}, Current User ID: ${currentUserId}`
        );

        if (desiredToConnect) {
            const expectedWsUrl = `${
                currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl
            }/ws/${currentUserId}`;

            if (currentSocket) {
                // Socket exists. Check its state and URL.
                if (currentSocket.readyState === WebSocket.OPEN) {
                    // If open, check if it's the correct connection (user ID or URL changed)
                    if (currentSocket.url !== expectedWsUrl) {
                        console.log(
                            'WS Effect: User ID or URL changed, closing existing WebSocket to reconnect.'
                        );
                        currentSocket.close(1000, 'User ID or URL changed'); // Clean close
                        // The onclose handler will then trigger connectToWS via timeout
                    } else {
                        console.log(
                            'WS Effect: Socket is already open and valid for current user/URL.'
                        );
                        // No action needed if already connected to the correct endpoint
                    }
                } else if (currentSocket.readyState === WebSocket.CONNECTING) {
                    console.log(
                        'WS Effect: Socket is currently connecting. Will let it resolve.'
                    );
                    // Do nothing, let the existing attempt complete or fail
                } else if (
                    currentSocket.readyState === WebSocket.CLOSING ||
                    currentSocket.readyState === WebSocket.CLOSED
                ) {
                    console.log(
                        'WS Effect: Socket is closed or closing. Initiating new connection.'
                    );
                    connectToWS(); // Try to connect if explicitly closed or was never connected
                }
            } else {
                // No socket instance exists, try to connect
                console.log(
                    'WS Effect: No existing socket, initiating new connection.'
                );
                connectToWS();
            }
        } else {
            // If connection is no longer desired (e.g., props.url empty, user logged out)
            if (
                currentSocket &&
                currentSocket.readyState !== WebSocket.CLOSED
            ) {
                console.log(
                    'WS Effect: Connection no longer desired, closing WebSocket.'
                );
                currentSocket.close(1000, 'Connection no longer desired');
            }
            // Ensure all related state is reset
            setSocket(null);
            setIsConnected(false);
            retryCount = 0; // Reset retries if connection becomes undesirable
            // Clear any pending reconnects if no longer desired
            if (reconnectTimeoutId) {
                clearTimeout(reconnectTimeoutId);
                reconnectTimeoutId = null;
            }
        }

        // --- Cleanup function for when the effect re-runs or component unmounts ---
        return () => {
            console.log('WS Effect Cleanup: Running...');
            const cleanupSocket = socket(); // Get current socket for cleanup

            // Only close if it's not already closed or closing (to avoid errors)
            if (
                cleanupSocket &&
                cleanupSocket.readyState !== WebSocket.CLOSED &&
                cleanupSocket.readyState !== WebSocket.CLOSING
            ) {
                console.log(
                    'WS Effect Cleanup: Closing active WebSocket due to component unmount or effect re-run.'
                );
                cleanupSocket.close(
                    1000,
                    'Component unmounted or effect re-ran'
                );
            }
            // It's generally safe to reset signals/state here, as the new effect run will re-establish if needed.
            setSocket(null);
            setIsConnected(false);
            retryCount = 0; // Always reset retries on cleanup, as it might be a clean start
            // Crucially, clear any pending reconnection timeouts so they don't fire after cleanup
            if (reconnectTimeoutId) {
                console.log(
                    'WS Effect Cleanup: Clearing pending reconnection timeout.'
                );
                clearTimeout(reconnectTimeoutId);
                reconnectTimeoutId = null;
            }
        };
    });

    const sendMessage = (chatMessage: ChatMessage) => {
        if (socket()?.readyState === WebSocket.OPEN) {
            socket()!.send(JSON.stringify(chatMessage));
            showAppNotification('success', 'message successfully delivered');
        } else {
            showAppNotification(
                'error',
                'webSocket is not open. Message not sent'
            );
        }
    };

    // 2. Register user with signaling server
    const registerUser = () => {
        const currentWs = socket();
        const currentUserId = authUser()?.id;
        if (currentWs && currentUserId) {
            const message: RegisterMessage = {
                type: 'register',
                user_id: currentUserId,
            };
            currentWs.send(JSON.stringify(message));
        }
    };

    // 3. Handle incoming signaling messages
    const handleSignalingMessage = async (event: MessageEvent) => {
        try {
            const msg: SignalingMessage = JSON.parse(event.data);
            console.log('Received signaling message:', msg);

            switch (msg.type) {
                case 'call_request':
                    if (callStatus() === 'idle') {
                        setRemoteUserId(msg.caller_id);
                        setCallStatus('incoming');
                        showAppNotification(
                            'success',
                            `Incoming call from ${msg.caller_id}!`
                        );
                    } else {
                        console.log('Busy, rejecting call from', msg.caller_id);
                        // You might send a "busy" message back to the caller here
                    }
                    break;
                case 'call_accepted':
                    // The callee accepted the call, now create offer and send
                    await createOffer();
                    setCallStatus('connected'); // Immediately set to connected on caller's side
                    break;
                case 'offer':
                    // Ensure peerConnection is initialized if not already (e.g., if we are the callee)
                    let currentPc = peerConnection();
                    if (!currentPc) {
                        if (callStatus() === 'incoming') {
                            await acceptCall(); // This will create the PC and set local stream
                            currentPc = peerConnection(); // Get the newly created PC
                        } else {
                            console.error(
                                'Received offer in unexpected state, peerConnection not initialized:',
                                callStatus()
                            );
                            return;
                        }
                    }

                    if (currentPc) {
                        await currentPc.setRemoteDescription(
                            new RTCSessionDescription({
                                type: 'offer',
                                sdp: msg.sdp,
                            })
                        );
                        await createAnswer();
                        setCallStatus('connected');
                    }
                    break;
                case 'answer':
                    const pcAfterAnswer = peerConnection();
                    if (pcAfterAnswer) {
                        await pcAfterAnswer.setRemoteDescription(
                            new RTCSessionDescription({
                                type: 'answer',
                                sdp: msg.sdp,
                            })
                        );
                        setCallStatus('connected');
                    }
                    break;
                case 'candidate':
                    const pcAfterCandidate = peerConnection();
                    if (pcAfterCandidate && msg.candidate) {
                        try {
                            // Reconstruct RTCIceCandidateInit from the received data
                            await pcAfterCandidate.addIceCandidate(
                                new RTCIceCandidate({
                                    candidate: msg.candidate,
                                    sdpMid: msg.sdp_mid,
                                    sdpMLineIndex: msg.sdp_mline_index,
                                })
                            );
                        } catch (e) {
                            console.error(
                                'Error adding received ICE candidate:',
                                e
                            );
                        }
                    }
                    break;
                case 'hang_up':
                    handleHangUpReceived();
                    break;
                case 'error':
                    console.error('Server error:', msg.message);
                    showAppNotification(
                        'error',
                        `Server Error: ${msg.message}`
                    );
                    activeCallFailed();
                    break;
                default:
                    console.warn(
                        'Unknown signaling message type:',
                        (msg as any).type
                    );
            }
        } catch (e) {
            console.error(
                'Error parsing or handling signaling message:',
                e,
                event.data
            );
        }
    };

    const endActiveCall = () => {
        setActiveCall(null);
        setSelectedUserToCall(null);
    };

    const activeCallFailed = () => {
        const currentActiveCall = activeCall();
        if (!currentActiveCall) return;

        const callStatus: CallHistoryItem['status'] = 'failed'; // Simulate success/failure

        addCallToHistory({
            id: Date.now(),
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

        setActiveCall(null);
        setSelectedUserToCall(null);
    };

    const addCallToHistory = (call: CallHistoryItem) => {
        setCallHistory((prevHistory) => [
            { ...call, id: Date.now() + Math.random() },
            ...prevHistory,
        ]);
    };

    // 4. Get local audio stream
    const getLocalAudio = async (): Promise<MediaStream | null> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            setLocalStream(stream);
            return stream;
        } catch (err) {
            showAppNotification(
                'error',
                'Could not access microphone. Please ensure it is connected and allowed.'
            );
            return null;
        }
    };

    // 5. Initialize RTCPeerConnection
    const initPeerConnection = (stream: MediaStream): RTCPeerConnection => {
        const pc = new RTCPeerConnection({
            iceServers: STUN_SERVERS,
        });

        // Add local audio track
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        // Handle incoming remote streams (for audio this will be one track)
        pc.ontrack = (event: RTCTrackEvent) => {
            console.log('Remote track received:', event.streams[0]);
            setRemoteStream(event.streams[0]);
            // Attach to an audio element for playback
            const remoteAudioEl = document.getElementById(
                'remoteAudio'
            ) as HTMLAudioElement;
            if (remoteAudioEl) remoteAudioEl.srcObject = event.streams[0];
        };

        // Gather ICE candidates and send them to the signaling server
        pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                const currentWs = socket();
                const currentUserId = userID();
                const currentRemoteUserId = remoteUserId();
                if (currentWs && currentUserId && currentRemoteUserId) {
                    const message: CandidateMessage = {
                        type: 'candidate',
                        sender_id: currentUserId,
                        receiver_id: currentRemoteUserId,
                        candidate: event.candidate.candidate,
                        sdp_mid: event.candidate.sdpMid || undefined, // undefined if null
                        sdp_mline_index:
                            event.candidate.sdpMLineIndex || undefined,
                    };
                    currentWs.send(JSON.stringify(message));
                }
            }
        };

        // Log ICE connection state changes for debugging
        pc.oniceconnectionstatechange = () => {
            console.log('ICE connection state changed:', pc.iceConnectionState);
            if (
                pc.iceConnectionState === 'disconnected' ||
                pc.iceConnectionState === 'failed'
            ) {
                console.log('Call disconnected due to ICE failure.');
                // Consider more robust error handling / re-connection attempts here
                hangUp(); // Attempt to clean up
            }
        };

        setPeerConnection(pc);
        return pc;
    };

    // 6. Caller: Create Offer
    const createOffer = async () => {
        const pc = peerConnection();
        const currentWs = socket();
        const currentUserId = userID();
        const currentRemoteUserId = remoteUserId();

        if (!pc || !currentWs || !currentUserId || !currentRemoteUserId) {
            console.error(
                'PeerConnection, WebSocket, or user IDs not initialized for offer'
            );
            return;
        }
        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            const message: OfferMessage = {
                type: 'offer',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
                sdp: offer.sdp || '', // SDP should not be null for an offer
            };
            currentWs.send(JSON.stringify(message));
        } catch (err) {
            console.error('Error creating offer:', err);
        }
    };

    // 7. Callee: Create Answer
    const createAnswer = async () => {
        const pc = peerConnection();
        const currentWs = socket();
        const currentUserId = userID();
        const currentRemoteUserId = remoteUserId();

        if (!pc || !currentWs || !currentUserId || !currentRemoteUserId) {
            console.error(
                'PeerConnection, WebSocket, or user IDs not initialized for answer'
            );
            return;
        }
        try {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            const message: AnswerMessage = {
                type: 'answer',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
                sdp: answer.sdp || '', // SDP should not be null for an answer
            };
            currentWs.send(JSON.stringify(message));
        } catch (err) {
            console.error('Error creating answer:', err);
        }
    };

    // 8. Initiate a call
    const startCall = async () => {
        const currentRemoteUserId = remoteUserId();
        const currentUserId = userID();
        if (!currentRemoteUserId || currentRemoteUserId === currentUserId) {
            showAppNotification(
                'error',
                'Please enter a valid remote user ID to call'
            );
            return;
        }

        if (!selectedUserToCall()) {
            return;
        }

        if (activeCall()) {
            return;
        }

        // Asserting selectedUser() is not null with !
        setActiveCall({
            id: 'call_' + Date.now(),
            peer: selectedUserToCall()!.username,
            service: selectedUserToCall()!.role, // TODO:
            startTime: new Date(),
            duration: 0, // Will be updated by effect
        });
        ///////////
        setCallStatus('calling');
        const stream = await getLocalAudio();
        if (stream) {
            initPeerConnection(stream);
            const currentWs = socket();
            if (currentWs) {
                const message: CallRequestMessage = {
                    type: 'call_request',
                    caller_id: currentUserId,
                    callee_id: currentRemoteUserId,
                };
                currentWs.send(JSON.stringify(message));
            }
        }
    };

    // 9. Accept an incoming call
    const acceptCall = async () => {
        if (callStatus() !== 'incoming') return;
        setCallStatus('connected');
        const stream = await getLocalAudio();
        if (stream) {
            initPeerConnection(stream);
            const currentWs = socket();
            const currentUserId = userID();
            const currentRemoteUserId = remoteUserId();
            if (currentWs && currentUserId && currentRemoteUserId) {
                const message: CallAcceptedMessage = {
                    type: 'call_accepted',
                    accepter_id: currentUserId,
                    caller_id: currentRemoteUserId,
                };
                currentWs.send(JSON.stringify(message));
            }
        }
    };

    // 10. Hang up the call
    const hangUp = () => {
        const currentPc = peerConnection();
        if (currentPc) {
            currentPc.getSenders().forEach((sender) => {
                if (sender.track) sender.track.stop(); // Stop media tracks associated with senders
            });
            currentPc.close(); // Close the RTCPeerConnection
            setPeerConnection(null);
        }
        const currentLocalStream = localStream();
        if (currentLocalStream) {
            currentLocalStream.getTracks().forEach((track) => track.stop()); // Stop local media tracks
            setLocalStream(null);
        }
        setRemoteStream(null); // Clear remote stream
        setCallStatus('idle'); // Reset call status

        // Notify the other peer (if there was one)
        const currentWs = socket();
        const currentUserId = userID();
        const currentRemoteUserId = remoteUserId();
        if (
            currentWs &&
            currentUserId &&
            currentRemoteUserId &&
            callStatus() === 'connected'
        ) {
            const message: HangUpMessage = {
                type: 'hang_up',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
            };
            currentWs.send(JSON.stringify(message));
        }
        setRemoteUserId(''); // Clear remote user ID
        console.log('Call ended.');
    };

    const handleHangUpReceived = () => {
        const currentPc = peerConnection();
        if (currentPc) {
            currentPc.getSenders().forEach((sender) => {
                if (sender.track) sender.track.stop();
            });
            currentPc.close();
            setPeerConnection(null);
        }
        const currentLocalStream = localStream();
        if (currentLocalStream) {
            currentLocalStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }
        setRemoteStream(null);
        setCallStatus('idle');
        setRemoteUserId('');
        showAppNotification('warning', 'The other party has hung up.');
    };

    // Ensure streams and connections are stopped when component unmounts
    onCleanup(() => {
        if (localStream()) {
            localStream()!
                .getTracks()
                .forEach((track) => track.stop());
        }
        if (peerConnection()) {
            peerConnection()!.close();
        }
        if (socket()) {
            socket()!.close();
        }
    });

    return (
        <AppContext.Provider
            value={{
                isConnected, // Expose connection status
                sendMessage,
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
                    userID,
                    setUserID,
                    callHistory,
                    setCallHistory,
                    addCallToHistory,
                },
                inAppConnection: {
                    socket,
                    registerUser,
                    startCall,
                    activeCall,
                    setActiveCall,
                    selectedUserToCall,
                    setSelectedUserToCall,
                    setRemoteUserId,
                    endActiveCall,
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
