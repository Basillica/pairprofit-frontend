// export interface ActiveCall {
//     id: string;
//     peer: string;
//     service: string;
//     startTime: Date;
//     duration: number;
// }

// export interface CallHistoryItem {
//     id: number; // Unique ID for keying in <For> component
//     peer: string;
//     service: string;
//     duration: number; // in seconds
//     date: string; // YYYY-MM-DD
//     time: string; // HH:MM
//     status: 'completed' | 'missed' | 'failed';
// }

// // Nested Payload Interfaces (These are similar to your old interfaces but without the top-level 'type')
// export interface P2PMessagePayload {
//     sender_id: string;
//     receiver_id: string;
// }

// export interface OfferMessagePayload extends P2PMessagePayload {
//     subtype: 'offer';
//     sdp: string;
// }

// export interface AnswerMessagePayload extends P2PMessagePayload {
//     subtype: 'answer';
//     sdp: string;
// }

// export interface CandidateMessagePayload extends P2PMessagePayload {
//     subtype: 'candidate';
//     candidate: string;
//     sdp_mid?: string;
//     sdp_mline_index?: number;
// }

// export interface CallRequestMessagePayload {
//     subtype: 'call_request';
//     caller_id: string;
//     callee_id: string;
// }

// export interface CallAcceptedMessagePayload {
//     subtype: 'call_accepted';
//     accepter_id: string;
//     caller_id: string;
// }

// export interface HangUpMessagePayload extends P2PMessagePayload {
//     subtype: 'hang_up';
// }

// export interface AuthMessagePayload {
//     subtype: 'register';
//     user_id: string;
// }

// export interface ChatMessagePayload {
//     subtype: 'chat_message';
//     sender_id: string;
//     receiver_id?: string;
//     receiver_name?: string;
//     group_id?: string;
//     message: string;
//     message_content: string; // 'file' | 'text'
//     is_media: boolean;
//     timestamp: string;
// }

// export interface ChatMessageStatusPayload {
//     subtype: 'chat_message_status';
//     status: string;
//     id: string;
// }

// // Top-Level Message Interfaces
// export interface PeerToPeerMessage {
//     type: 'peer_to_peer';
//     payload:
//         | OfferMessagePayload
//         | AnswerMessagePayload
//         | CandidateMessagePayload
//         | CallRequestMessagePayload
//         | CallAcceptedMessagePayload
//         | HangUpMessagePayload;
// }

// export interface AuthenticationMessage {
//     type: 'authentication';
//     payload: AuthMessagePayload;
// }

// export interface ChatSignalingMessage {
//     type: 'chat';
//     payload: ChatMessagePayload | ChatMessageStatusPayload;
// }

// export interface ErrorMessage {
//     type: 'error';
//     message: string;
// }

// export interface NotificationMessagePayload {
//     subtype: string; // The specific type of notification (e.g., 'email', 'chat', etc.)
//     user_id: string;
//     type_name: string;
//     title: string;
//     message: string;
//     is_read: boolean;
//     link?: string;
// }

// export interface InAppNotificationMessage {
//     type: 'in_app_notification';
//     payload: NotificationMessagePayload;
// }

// // New Union type for all possible signaling messages
// export type SignalingMessage =
//     | PeerToPeerMessage
//     | AuthenticationMessage
//     | ChatSignalingMessage
//     | InAppNotificationMessage
//     | ErrorMessage;
