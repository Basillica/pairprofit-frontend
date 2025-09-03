import { createSignal } from 'solid-js';
import { ActiveCall } from '../app.types';
import { UserModel } from '../../models/auth';

export const [socket, setSocket] = createSignal<WebSocket | null>(null);
export const [isAppLoading, setIsAppLoading] = createSignal<boolean>(false);
export const [activeCall, setActiveCall] = createSignal<ActiveCall | null>(
    null
);
export const [selectedUserToCall, setSelectedUserToCall] =
    createSignal<UserModel | null>(null);
export const [openLogout, setOpenLogout] = createSignal<boolean>(false);
export const [remoteUserId, setRemoteUserId] = createSignal<string>('');
