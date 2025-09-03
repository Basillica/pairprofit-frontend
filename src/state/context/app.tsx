import { createSignal } from 'solid-js';

export const [isConnected, setIsConnected] = createSignal<boolean>(false);
export const [updateNotifWidget, setNotifWidget] = createSignal<boolean>(false);
export const [syncMode, setSyncMode] = createSignal<boolean>(false);
