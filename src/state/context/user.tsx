import { createSignal } from 'solid-js';
import { UserModel } from '../../models/auth';
import { CallHistoryItem } from '../app.types';

export const [authUser, setAuthUser] = createSignal<UserModel>();
export const [userID, setUserID] = createSignal<string>('');
export const [callHistory, setCallHistory] = createSignal<CallHistoryItem[]>(
    []
);
