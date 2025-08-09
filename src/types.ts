// --- Type Definitions for Signaling Messages (Must match Rust Backend) ---
interface BaseSignalingMessage {
    sender_id: string;
    receiver_id: string;
}

export interface OfferMessage extends BaseSignalingMessage {
    type: 'offer';
    sdp: string; // Session Description Protocol offer
}

export interface AnswerMessage extends BaseSignalingMessage {
    type: 'answer';
    sdp: string; // Session Description Protocol answer
}

export interface CandidateMessage extends BaseSignalingMessage {
    type: 'candidate';
    candidate: string; // ICE Candidate in string format
    sdp_mid?: string;
    sdp_mline_index?: number;
}

export interface RegisterMessage {
    type: 'register';
    user_id: string;
}

export interface CallRequestMessage {
    type: 'call_request';
    caller_id: string;
    callee_id: string;
}

export interface CallAcceptedMessage {
    type: 'call_accepted';
    accepter_id: string;
    caller_id: string;
}

export interface HangUpMessage extends BaseSignalingMessage {
    type: 'hang_up';
}

export interface ChatMessage {
    type: "chat_message";
    sender_id: string;
    receiver_id?: string;
    group_id?: string;
    message: string;
    message_content: 'file' | 'text';
    timestamp: string;
}

export interface ErrorMessage {
    type: 'error';
    message: string;
}

// Union type for all possible signaling messages
export type SignalingMessage =
    | OfferMessage
    | AnswerMessage
    | CandidateMessage
    | RegisterMessage
    | CallRequestMessage
    | CallAcceptedMessage
    | HangUpMessage
    | ErrorMessage
    | ChatMessage;

export interface User {
    id: string;
    name: string;
    service: string;
}

export interface ActiveCall {
    id: string;
    peer: string;
    service: string;
    startTime: Date;
    duration: number;
}

export interface CallHistoryItem {
    id: number; // Unique ID for keying in <For> component
    peer: string;
    service: string;
    duration: number; // in seconds
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    status: 'completed' | 'missed' | 'failed';
}