import { createSignal, onMount, onCleanup } from 'solid-js';

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

export const CallerPageV2 = () => {
    const [localStream, setLocalStream] = createSignal<MediaStream | null>(
        null
    );
    const [remoteStream, setRemoteStream] = createSignal<MediaStream | null>(
        null
    );
    const [peerConnection, setPeerConnection] =
        createSignal<RTCPeerConnection | null>(null);
    const [ws, setWs] = createSignal<WebSocket | null>(null);
    const [userId, setUserId] = createSignal<string>('');
    const [remoteUserId, setRemoteUserId] = createSignal<string>('');
    const [callStatus, setCallStatus] = createSignal<
        'idle' | 'calling' | 'incoming' | 'connected'
    >('idle');
    // NEW: State to store the user's selected call type
    const [selectedCallType, setSelectedCallType] = createSignal<
        'audio' | 'video'
    >('video'); // Default to video call

    const [queuedIceCandidates, setQueuedIceCandidates] = createSignal<
        RTCIceCandidate[]
    >([]);

    const STUN_SERVERS: RTCConfiguration['iceServers'] = [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
        // Add your TURN server here if you have one configured
        // { urls: 'turn:your-turn-server.com:3478', username: 'testuser', credential: 'testpassword' },
    ];

    // --- WebSocket Initialization ---
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

    // --- Signaling Server Communication ---
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

    const handleSignalingMessage = async (event: MessageEvent) => {
        try {
            const msg: SignalingMessage = JSON.parse(event.data);
            console.log('Received signaling message:', msg);

            let currentPc = peerConnection();

            switch (msg.type) {
                case 'call_request':
                    if (callStatus() === 'idle') {
                        setRemoteUserId(msg.caller_id);
                        setCallStatus('incoming');
                        alert(`Incoming call from ${msg.caller_id}!`);
                        // IMPORTANT: For incoming calls, the callee decides if they want video.
                        // The `acceptCall` function will use `selectedCallType()`.
                        // If you wanted the incoming call to force a media type, the 'call_request'
                        // message would need to include that info from the caller.
                    } else {
                        console.log('Busy, rejecting call from', msg.caller_id);
                        // In a real app, send a "busy" message back
                    }
                    break;

                case 'call_accepted':
                    console.log('Call accepted by callee, creating offer.');
                    await createOffer();
                    break;

                case 'offer':
                    if (!currentPc) {
                        console.log(
                            'Received offer, initializing PC for callee.'
                        );
                        // Callee receives offer. Get local media based on their preference.
                        const stream = await getLocalMedia(
                            selectedCallType() === 'video'
                        );
                        if (!stream) {
                            console.error(
                                'Failed to get local media for incoming call.'
                            );
                            return;
                        }
                        const newPc = initPeerConnection(stream);
                        setPeerConnection(newPc);
                        currentPc = newPc;
                    }

                    if (
                        currentPc &&
                        currentPc.signalingState !== 'have-local-pranswer' &&
                        currentPc.signalingState !== 'have-local-offer'
                    ) {
                        console.log(
                            'Setting remote description (offer) and creating answer.'
                        );
                        await currentPc.setRemoteDescription(
                            new RTCSessionDescription({
                                type: 'offer',
                                sdp: msg.sdp,
                            })
                        );
                        await createAnswer();
                        setCallStatus('connected');
                        processQueuedCandidates(currentPc);
                    } else {
                        console.warn(
                            'Ignoring offer due to current signaling state:',
                            currentPc?.signalingState
                        );
                    }
                    break;

                case 'answer':
                    if (
                        currentPc &&
                        currentPc.signalingState === 'have-local-offer'
                    ) {
                        console.log('Setting remote description (answer).');
                        await currentPc.setRemoteDescription(
                            new RTCSessionDescription({
                                type: 'answer',
                                sdp: msg.sdp,
                            })
                        );
                        setCallStatus('connected');
                        processQueuedCandidates(currentPc);
                    } else {
                        console.warn(
                            'Ignoring answer due to current signaling state:',
                            currentPc?.signalingState
                        );
                    }
                    break;

                case 'candidate':
                    if (currentPc) {
                        try {
                            const candidate = new RTCIceCandidate({
                                candidate: msg.candidate,
                                sdpMid: msg.sdp_mid,
                                sdpMLineIndex: msg.sdp_mline_index,
                            });
                            if (currentPc.remoteDescription) {
                                await currentPc.addIceCandidate(candidate);
                            } else {
                                console.warn(
                                    'Queuing ICE candidate: Remote description not yet set.'
                                );
                                setQueuedIceCandidates((prev) => [
                                    ...prev,
                                    candidate,
                                ]);
                            }
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

    const processQueuedCandidates = async (pc: RTCPeerConnection) => {
        const candidates = queuedIceCandidates();
        setQueuedIceCandidates([]);
        for (const candidate of candidates) {
            try {
                await pc.addIceCandidate(candidate);
                console.log('Added queued ICE candidate.');
            } catch (e) {
                console.error('Error adding queued ICE candidate:', e);
            }
        }
    };

    // --- WebRTC Core Functions ---

    // MODIFIED: getLocalMedia now accepts a boolean 'withVideo'
    const getLocalMedia = async (
        withVideo: boolean
    ): Promise<MediaStream | null> => {
        try {
            const constraints: MediaStreamConstraints = {
                audio: true, // Always request audio
                video: withVideo
                    ? {
                          // Conditionally request video based on 'withVideo'
                          width: { ideal: 1280 },
                          height: { ideal: 720 },
                          frameRate: { ideal: 30 },
                      }
                    : false, // If not 'withVideo', set video constraint to false
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
            setLocalStream(stream);

            const localVideoEl = document.getElementById(
                'localVideo'
            ) as HTMLVideoElement;
            if (localVideoEl) {
                localVideoEl.srcObject = stream;
            }
            return stream;
        } catch (err) {
            console.error('Error getting user media:', err);
            alert(
                `Could not access microphone ${
                    withVideo ? 'and/or camera' : ''
                }. Please ensure they are connected and allowed.`
            );
            return null;
        }
    };

    const initPeerConnection = (stream: MediaStream): RTCPeerConnection => {
        const pc = new RTCPeerConnection({
            iceServers: STUN_SERVERS,
        });

        // Add all tracks from the local stream (audio and potentially video)
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (event: RTCTrackEvent) => {
            console.log('Remote track received:', event.track.kind);
            // This is crucial: handle multiple tracks (audio, video) from the same stream
            // If you already have a remote stream, add new tracks to it. Otherwise, create a new one.
            setRemoteStream((currentRemoteStream) => {
                if (currentRemoteStream) {
                    currentRemoteStream.addTrack(event.track);
                    return currentRemoteStream;
                } else {
                    const newRemoteStream = new MediaStream();
                    newRemoteStream.addTrack(event.track);
                    return newRemoteStream;
                }
            });

            // Attach the current remote stream to the appropriate HTML elements
            // These will automatically play audio in <audio> and video in <video>
            const remoteAudioEl = document.getElementById(
                'remoteAudio'
            ) as HTMLAudioElement;
            const remoteVideoEl = document.getElementById(
                'remoteVideo'
            ) as HTMLVideoElement;

            if (remoteAudioEl && remoteStream())
                remoteAudioEl.srcObject = remoteStream();
            if (remoteVideoEl && remoteStream())
                remoteVideoEl.srcObject = remoteStream();
        };

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
                        sdp_mid: event.candidate.sdpMid || undefined,
                        sdp_mline_index:
                            event.candidate.sdpMLineIndex || undefined,
                    };
                    currentWs.send(JSON.stringify(message));
                    console.log(
                        'Sent ICE candidate:',
                        event.candidate.candidate
                    );
                }
            }
        };

        pc.onnegotiationneeded = async () => {
            console.log('onnegotiationneeded fired. Creating offer...');
            await createOffer();
        };

        pc.oniceconnectionstatechange = () => {
            console.log('ICE connection state changed:', pc.iceConnectionState);
            if (
                pc.iceConnectionState === 'disconnected' ||
                pc.iceConnectionState === 'failed'
            ) {
                console.log('Call disconnected due to ICE failure.');
                hangUp();
            } else if (pc.iceConnectionState === 'connected') {
                console.log('ICE connection established!');
            }
        };

        setPeerConnection(pc);
        return pc;
    };

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
            console.log('Attempting to create SDP offer...');
            // MODIFIED: Set offerToReceiveVideo based on selectedCallType
            const offer = await pc.createOffer(
                selectedCallType() === 'video'
                    ? { offerToReceiveAudio: true, offerToReceiveVideo: true }
                    : { offerToReceiveAudio: true, offerToReceiveVideo: false }
            );

            await pc.setLocalDescription(offer);
            const message: OfferMessage = {
                type: 'offer',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
                sdp: offer.sdp || '',
            };
            currentWs.send(JSON.stringify(message));
            console.log('Sent SDP offer:', offer.sdp);
        } catch (err) {
            console.error('Error creating offer:', err);
        }
    };

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
            console.log('Attempting to create SDP answer...');
            // MODIFIED: Set offerToReceiveVideo based on selectedCallType
            const answer = await pc.createAnswer(
                selectedCallType() === 'video'
                    ? { offerToReceiveAudio: true, offerToReceiveVideo: true }
                    : { offerToReceiveAudio: true, offerToReceiveVideo: false }
            );
            await pc.setLocalDescription(answer);
            const message: AnswerMessage = {
                type: 'answer',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
                sdp: answer.sdp || '',
            };
            currentWs.send(JSON.stringify(message));
            console.log('Sent SDP answer:', answer.sdp);
        } catch (err) {
            console.error('Error creating answer:', err);
        }
    };

    // MODIFIED: startCall now passes selectedCallType to getLocalMedia
    const startCall = async () => {
        const currentRemoteUserId = remoteUserId();
        const currentUserId = userId();

        if (!currentRemoteUserId || currentRemoteUserId === currentUserId) {
            alert('Please enter a valid remote user ID to call.');
            return;
        }
        setCallStatus('calling');
        // Pass whether video is requested based on selectedCallType
        const stream = await getLocalMedia(selectedCallType() === 'video');
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
                console.log('Sent call request.');
            }
        } else {
            setCallStatus('idle');
        }
    };

    // MODIFIED: acceptCall now passes selectedCallType to getLocalMedia
    const acceptCall = async () => {
        if (callStatus() !== 'incoming') return;
        console.log('Accepting call, getting local media.');
        // Pass whether video is requested based on selectedCallType for the callee
        const stream = await getLocalMedia(selectedCallType() === 'video');
        if (stream) {
            const newPc = initPeerConnection(stream);
            setPeerConnection(newPc);
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
                console.log('Sent call accepted message.');
            }
        } else {
            setCallStatus('idle');
        }
    };

    // --- Call Management & Cleanup (No major changes, just ensuring visual cleanup) ---
    const hangUp = () => {
        console.log('Initiating hang up...');
        const currentPc = peerConnection();
        if (currentPc) {
            currentPc.getSenders().forEach((sender) => {
                if (sender.track) sender.track.stop();
            });
            currentPc.close();
            setPeerConnection(null);
            setQueuedIceCandidates([]);
        }
        const currentLocalStream = localStream();
        if (currentLocalStream) {
            currentLocalStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
            const localVideoEl = document.getElementById(
                'localVideo'
            ) as HTMLVideoElement;
            if (localVideoEl) localVideoEl.srcObject = null;
        }
        const remoteAudioEl = document.getElementById(
            'remoteAudio'
        ) as HTMLAudioElement;
        if (remoteAudioEl) remoteAudioEl.srcObject = null;
        const remoteVideoEl = document.getElementById(
            'remoteVideo'
        ) as HTMLVideoElement;
        if (remoteVideoEl) remoteVideoEl.srcObject = null;

        setRemoteStream(null);
        setCallStatus('idle');

        const currentWs = ws();
        const currentUserId = userId();
        const currentRemoteUserId = remoteUserId();
        if (currentWs && currentUserId && currentRemoteUserId) {
            const message: HangUpMessage = {
                type: 'hang_up',
                sender_id: currentUserId,
                receiver_id: currentRemoteUserId,
            };
            currentWs.send(JSON.stringify(message));
            console.log('Sent hang up message.');
        }
        setRemoteUserId('');
        console.log('Call ended locally.');
    };

    const handleHangUpReceived = () => {
        console.log('Hang up received from remote peer.');
        const currentPc = peerConnection();
        if (currentPc) {
            currentPc.getSenders().forEach((sender) => {
                if (sender.track) sender.track.stop();
            });
            currentPc.close();
            setPeerConnection(null);
            setQueuedIceCandidates([]);
        }
        const currentLocalStream = localStream();
        if (currentLocalStream) {
            currentLocalStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
            const localVideoEl = document.getElementById(
                'localVideo'
            ) as HTMLVideoElement;
            if (localVideoEl) localVideoEl.srcObject = null;
        }
        const remoteAudioEl = document.getElementById(
            'remoteAudio'
        ) as HTMLAudioElement;
        if (remoteAudioEl) remoteAudioEl.srcObject = null;
        const remoteVideoEl = document.getElementById(
            'remoteVideo'
        ) as HTMLVideoElement;
        if (remoteVideoEl) remoteVideoEl.srcObject = null;

        setRemoteStream(null);
        setCallStatus('idle');
        setRemoteUserId('');
        alert('The other party has hung up.');
        console.log('Call ended by remote peer.');
    };

    onCleanup(() => {
        console.log('Component unmounting, cleaning up resources.');
        hangUp();
        if (ws() && ws()?.readyState === WebSocket.OPEN) {
            ws()!.close();
        }
    });

    return (
        <div style="font-family: sans-serif; padding: 20px;">
            <h1>Rust + SolidJS WebRTC Call</h1>

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
                    {/* NEW: Radio buttons for call type selection */}
                    <div style="margin-top: 10px;">
                        <label>
                            <input
                                type="radio"
                                name="callType"
                                value="video"
                                checked={selectedCallType() === 'video'}
                                onInput={() => setSelectedCallType('video')}
                            />{' '}
                            Video Call
                        </label>
                        <label style="margin-left: 20px;">
                            <input
                                type="radio"
                                name="callType"
                                value="audio"
                                checked={selectedCallType() === 'audio'}
                                onInput={() => setSelectedCallType('audio')}
                            />{' '}
                            Audio Call
                        </label>
                    </div>
                    <button
                        onClick={startCall}
                        disabled={!remoteUserId()}
                        style="margin-top: 10px;"
                    >
                        Start Call
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

            {/* --- Video Elements for Local and Remote Streams --- */}
            {/* RENDER CONDITION: Show video elements if local stream has video, remote stream has video,
                OR if the user has selected 'video' call type (even if streams aren't active yet) */}
            {(localStream()!?.getVideoTracks().length > 0 ||
                remoteStream()!?.getVideoTracks().length > 0 ||
                selectedCallType() === 'video') && (
                <div style="display: flex; gap: 20px; margin-top: 20px;">
                    <div style="flex: 1;">
                        <h2>Local Video</h2>
                        <video
                            id="localVideo"
                            autoplay
                            muted
                            playsinline
                            style="width: 100%; max-width: 400px; border: 1px solid #ccc; background-color: #eee;"
                        ></video>
                    </div>
                    <div style="flex: 1;">
                        <h2>Remote Video</h2>
                        <video
                            id="remoteVideo"
                            autoplay
                            playsinline
                            style="width: 100%; max-width: 400px; border: 1px solid #ccc; background-color: #eee;"
                        ></video>
                    </div>
                </div>
            )}

            {/* Hidden audio element for remote audio playback */}
            <audio id="remoteAudio" autoplay style="display: none;"></audio>
        </div>
    );
};
