// src/App.tsx
import { createSignal, onMount, onCleanup } from 'solid-js';

// --- Type Definitions for Signaling Messages (Must match Rust Backend) ---
interface BaseSignalingMessage {
    sender_id: string;
    receiver_id: string;
}

interface OfferMessage extends BaseSignalingMessage {
    type: 'offer';
    sdp: string; // Session Description Protocol offer
}

interface AnswerMessage extends BaseSignalingMessage {
    type: 'answer';
    sdp: string; // Session Description Protocol answer
}

interface CandidateMessage extends BaseSignalingMessage {
    type: 'candidate';
    candidate: string; // ICE Candidate in string format
    sdp_mid?: string;
    sdp_mline_index?: number;
}

interface RegisterMessage {
    type: 'register';
    user_id: string;
}

interface CallRequestMessage {
    type: 'call_request';
    caller_id: string;
    callee_id: string;
}

interface CallAcceptedMessage {
    type: 'call_accepted';
    accepter_id: string;
    caller_id: string;
}

interface HangUpMessage extends BaseSignalingMessage {
    type: 'hang_up';
}

interface ErrorMessage {
    type: 'error';
    message: string;
}

// Union type for all possible signaling messages
type SignalingMessage =
    | OfferMessage
    | AnswerMessage
    | CandidateMessage
    | RegisterMessage
    | CallRequestMessage
    | CallAcceptedMessage
    | HangUpMessage
    | ErrorMessage;

export const CallerPage = () => {
    // Use `null` or appropriate default values with `createSignal` for better type inference
    const [localStream, setLocalStream] = createSignal<MediaStream | null>(
        null
    );
    const [_, setRemoteStream] = createSignal<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] =
        createSignal<RTCPeerConnection | null>(null);
    const [ws, setWs] = createSignal<WebSocket | null>(null);
    const [userId, setUserId] = createSignal<string>('');
    const [remoteUserId, setRemoteUserId] = createSignal<string>('');
    const [callStatus, setCallStatus] = createSignal<
        'idle' | 'calling' | 'incoming' | 'connected'
    >('idle');

    // Define STUN/TURN servers
    const STUN_SERVERS: RTCConfiguration['iceServers'] = [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
        // Add your TURN server here if you have one configured
        // { urls: 'turn:your-turn-server.com:3478', username: 'testuser', credential: 'testpassword' },
    ];

    // 1. Initialize WebSocket connection on mount
    onMount(() => {
        const newWs = new WebSocket(
            'wss://pairprofitv2-backend.onrender.com/public/ws'
        );
        newWs.onopen = () => {
            console.log('WebSocket connected');
            setWs(newWs);
        };
        newWs.onmessage = handleSignalingMessage;
        newWs.onclose = () => {
            console.log('WebSocket disconnected');
            setWs(null);
        };
        newWs.onerror = (error) => console.error('WebSocket error:', error);
    });

    // 2. Register user with signaling server
    const registerUser = () => {
        const currentWs = ws();
        const currentUserId = userId();
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
                        alert(`Incoming call from ${msg.caller_id}!`);
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
                    alert(`Server Error: ${msg.message}`);
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
            console.error('Error getting user media:', err);
            alert(
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
                const currentWs = ws();
                const currentUserId = userId();
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
        const currentWs = ws();
        const currentUserId = userId();
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
        const currentWs = ws();
        const currentUserId = userId();
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
        const currentUserId = userId();

        if (!currentRemoteUserId || currentRemoteUserId === currentUserId) {
            alert('Please enter a valid remote user ID to call.');
            return;
        }
        setCallStatus('calling');
        const stream = await getLocalAudio();
        if (stream) {
            initPeerConnection(stream);
            const currentWs = ws();
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
            const currentWs = ws();
            const currentUserId = userId();
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
        const currentWs = ws();
        const currentUserId = userId();
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
        alert('The other party has hung up.');
        console.log('Call ended by remote peer.');
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
        if (ws()) {
            ws()!.close();
        }
    });

    return (
        <div style="font-family: sans-serif; padding: 20px;">
            <h1>Rust + SolidJS WebRTC Voice Call</h1>

            <div>
                <label for="userId">Your User ID:</label>
                <input
                    id="userId"
                    type="text"
                    value={userId()}
                    onInput={(e) => setUserId(e.currentTarget.value)}
                    placeholder="Enter your ID"
                />
                <button
                    onClick={registerUser}
                    disabled={!userId() || ws()?.readyState !== WebSocket.OPEN}
                >
                    Register
                </button>
            </div>

            <p>
                Your ID: <strong>{userId() || 'Not registered'}</strong>
            </p>
            <p>
                Call Status: <strong>{callStatus()}</strong>
            </p>

            {callStatus() === 'idle' && userId() && (
                <div>
                    <label for="remoteUserId">Call User ID:</label>
                    <input
                        id="remoteUserId"
                        type="text"
                        value={remoteUserId()}
                        onInput={(e) => setRemoteUserId(e.currentTarget.value)}
                        placeholder="Enter remote user ID"
                    />
                    <button onClick={startCall} disabled={!remoteUserId()}>
                        Call
                    </button>
                </div>
            )}

            {callStatus() === 'incoming' && (
                <div>
                    <p>
                        Incoming call from: <strong>{remoteUserId()}</strong>
                    </p>
                    <button onClick={acceptCall}>Accept Call</button>
                    <button onClick={hangUp}>Decline Call</button>
                </div>
            )}

            {callStatus() === 'connected' && (
                <div>
                    <p>
                        Connected with: <strong>{remoteUserId()}</strong>
                    </p>
                    <button onClick={hangUp}>Hang Up</button>
                </div>
            )}

            {/* Hidden audio elements for playback */}
            <audio id="remoteAudio" autoplay></audio>
            {/* <audio id="localAudio" controls muted></audio> // Optional: for monitoring your own audio */}
        </div>
    );
};
