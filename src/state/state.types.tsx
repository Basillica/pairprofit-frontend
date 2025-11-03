import { Accessor, JSX, Setter } from 'solid-js';
import { UserModel } from '../models/auth';
import { CallHistoryItem, ActiveCall, ChatMessagePayload } from './app.types';
import { NotificationModel } from '../models/notification';

export interface NotificationType {
    showAppNotification: (
        type: 'success' | 'warning' | 'error',
        message: string
    ) => void;
    notificationType: Accessor<'success' | 'warning' | 'error' | null>;
    setNotificationType: Setter<'success' | 'warning' | 'error' | null>;
    notificationMessage: Accessor<string | null>;
    setNotificationMessage: Setter<string | null>;
    notificationList: Accessor<NotificationModel[]>;
    setNotificationList: Setter<NotificationModel[]>;
}

export interface UserType {
    authUser: Accessor<UserModel | undefined>;
    setAuthUser: Setter<UserModel | undefined>;
    userID: Accessor<string>;
    setUserID: Setter<string>;
    callHistory: Accessor<CallHistoryItem[]>;
    setCallHistory: Setter<CallHistoryItem[]>;
    addCallToHistory: (call: CallHistoryItem) => void;
}

export interface InAppConnection {
    socket: Accessor<WebSocket | null>;
    isAppLoading: Accessor<boolean>;
    setIsAppLoading: Setter<boolean>;
    registerUser: (token: string) => void;
    getConnectedClients: () => void;
    getClientOnlineStatus: (client_ids: string[]) => void;
    connectedClients: Accessor<string[]>;
    setConnectedClients: Setter<string[]>;
    startCall: () => Promise<void>;
    activeCall: Accessor<ActiveCall | null>;
    setActiveCall: Setter<ActiveCall | null>;
    selectedUserToCall: Accessor<UserModel | null>;
    setSelectedUserToCall: Setter<UserModel | null>;
    setRemoteUserId: Setter<string>;
    endActiveCall: () => void;
    acceptCall: () => Promise<void>;
    hangUp: () => void;
    openLogout: Accessor<boolean>;
    setOpenLogout: Setter<boolean>;
}

export interface PublicAtrributes {
    currentContent: Accessor<JSX.Element>;
    setCurrentContent: Setter<JSX.Element>;
}

export type BreadItem = {
    handler: () => void;
    text: string;
    default: boolean;
};

export interface BreadCrumbType {
    breadCrumbs: Accessor<BreadItem[]>;
    setBreadCrumbs: Setter<BreadItem[]>;
}

export interface AppContextType {
    isConnected: Accessor<boolean>; // More semantic than just 'socket' presence
    sendChatMessage: (chatMessage: ChatMessagePayload) => void;
    updateNotifWidget: Accessor<boolean>;
    setNotifWidget: Setter<boolean>;
    syncMode: Accessor<boolean>;
    setSyncMode: Setter<boolean>;
    notification: NotificationType;
    userType: UserType;
    inAppConnection: InAppConnection;
    public: PublicAtrributes;
    breadCrumb: BreadCrumbType;
}
