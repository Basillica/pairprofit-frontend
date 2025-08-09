import { UserModel } from "../../models/auth";

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
    | ErrorMessage;

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

/**
 * Generates a random UUID (Version 4).
 * This is a simplified version and not cryptographically strong, but sufficient for mock data.
 */
function generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generates a random string of a given length, useful for passwords.
 */
function generateRandomString(length: number, characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'): string {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Picks a random element from an array.
 */
function pickRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Picks a specified number of unique random elements from an array.
 */
function pickRandomElements<T>(arr: T[], min: number, max: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return shuffled.slice(0, count);
}

/**
 * Generates a random integer within a range.
 */
function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an array of UserModel objects.
 *
 * @param count The number of UserModel objects to generate.
 * @returns An array of UserModel objects.
 */
export function generateUsers(count: number): UserModel[] {
    if (count < 0) {
        throw new Error("Count must be a non-negative number.");
    }

    const users: UserModel[] = [];

    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const domains = ['example.com', 'test.org', 'mail.net', 'company.io'];
    const statuses = ['active', 'inactive', 'pending', 'suspended'];
    const platforms = ['web', 'mobile', 'api'];
    const scopes = ['public', 'private', 'admin'];
    const roles = ['user', 'editor', 'admin', 'guest'];
    const allPermissions = ['read', 'write', 'delete', 'manage_users', 'view_reports', 'configure_settings'];

    for (let i = 0; i < count; i++) {
        const firstName = pickRandomElement(firstNames);
        const lastName = pickRandomElement(lastNames);
        const usernameBase = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(10, 99)}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1, 999)}@${pickRandomElement(domains)}`;
        const password = generateRandomString(10); // A password of length 10
        const id = generateUuid();

        // Generate realistic-ish dates
        const now = new Date();
        const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
        const createdAt = new Date(twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime()));
        const updatedAt = new Date(createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime()));


        users.push({
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: usernameBase,
            password: password,
            profile_uri: `https://avatars.dicebear.com/api/human/${id}.svg`, // A simple, external avatar service for variety
            status: pickRandomElement(statuses),
            platform: pickRandomElement(platforms),
            scope: pickRandomElement(scopes),
            role: pickRandomElement(roles),
            permissions: pickRandomElements(allPermissions, 1, 3), // 1 to 3 random permissions
            created_at: createdAt.toISOString(),
            updated_at: updatedAt.toISOString(),
            id: id,
        });
    }

    return users;
}