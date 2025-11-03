import { createSignal } from 'solid-js';

export type BreadItem = {
    handler: () => void;
    text: string;
    default: boolean;
};
export const [breadCrumbs, setBreadCrumbs] = createSignal<BreadItem[]>([]);
export const [isConnected, setIsConnected] = createSignal<boolean>(false);
export const [updateNotifWidget, setNotifWidget] = createSignal<boolean>(false);
export const [syncMode, setSyncMode] = createSignal<boolean>(false);
