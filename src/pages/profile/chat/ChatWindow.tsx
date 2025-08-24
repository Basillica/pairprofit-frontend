import { createSignal, createEffect, For } from 'solid-js';
import chat_module from './chat.module.css';
import {
    ChatWindowProps,
    Message,
    ImageMessage,
    TextMessage,
    SelectedFile,
} from './types';
import {
    formatRelativeTime,
    formatMessageTime,
    getStatusColor,
    getStatusIcon,
} from './functions';
import ChatInputArea from './MessageArea';

const ChatWindow = (props: ChatWindowProps) => {
    const [messageInput, setMessageInput] = createSignal('');
    const [selectedFiles, setSelectedFiles] = createSignal<SelectedFile[]>([]);
    const [isSending, setIsSending] = createSignal<boolean>(false); // To manage sending state
    let messagesAreaRef: HTMLDivElement | undefined;
    let messageInputRef: HTMLTextAreaElement | undefined;
    let fileInputRef: HTMLInputElement | undefined;
    const defaultPartnerAvatar = 'https://picsum.photos/50';

    const adjustTextareaHeight = () => {
        if (messageInputRef) {
            messageInputRef.style.height = 'auto';
            messageInputRef.style.height = messageInputRef.scrollHeight + 'px';
        }
    };

    const scrollToBottom = () => {
        if (messagesAreaRef) {
            messagesAreaRef.scrollTop = messagesAreaRef.scrollHeight;
        }
    };

    createEffect(() => {
        props.activeConversation?.messages;
        props.activeConversation?.id;
        setTimeout(scrollToBottom, 50);
    });

    const handleSendMessage = () => {
        const text = messageInput().trim();
        if (text === '') return;
        setIsSending(true);
        props.sendMessage(text, 'text');
        setMessageInput('');
        adjustTextareaHeight();
        setIsSending(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const getMessageContent = (msg: Message) => {
        if (msg.type === 'text') {
            return <div>{(msg as TextMessage).content}</div>;
        } else if (msg.type === 'image') {
            const imageMsg = msg as ImageMessage;
            if (Array.isArray(imageMsg.imageUrl)) {
                return (
                    <div class="image-gallery">
                        <For each={imageMsg.imageUrl}>
                            {(url) => (
                                <img
                                    src={url}
                                    alt="Chat image"
                                    class="rounded-lg object-cover"
                                />
                            )}
                        </For>
                    </div>
                );
            } else {
                return (
                    <img
                        src={imageMsg.imageUrl}
                        alt="Chat image"
                        class="rounded-lg object-cover"
                    />
                );
            }
        }
        // Handle other types like 'file' here if implemented
        return null;
    };

    // Handle file selection
    const handleFileSelect = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files || []); // Ensure it's an array

        const newFiles: SelectedFile[] = [];
        const maxFiles = 5; // Example: Limit to 5 files per message
        const maxFileSizeMB = 20; // Example: 20MB per file

        for (const file of files) {
            if (selectedFiles().length + newFiles.length >= maxFiles) {
                alert(`You can only attach up to ${maxFiles} files.`);
                break;
            }
            if (
                !file.type.startsWith('image/') &&
                !file.type.startsWith('video/')
            ) {
                alert(
                    `File "${file.name}" is not an image or video. Only images and videos are allowed.`
                );
                continue;
            }
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                alert(
                    `File "${file.name}" is too large. Max size is ${maxFileSizeMB}MB.`
                );
                continue;
            }

            const previewUrl = URL.createObjectURL(file);
            newFiles.push({ file, previewUrl, type: file.type });
        }

        setSelectedFiles((prev) => [...prev, ...newFiles]);

        // Clear the file input value so the same file can be selected again
        target.value = '';
    };

    return (
        <div
            class={`${chat_module.chat_main} flex-grow flex flex-col bg-gray-50`}
        >
            <div
                id="chatHeader"
                class="p-4 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between z-10"
            >
                <div class="flex items-center space-x-3">
                    {/* Back button for mobile */}
                    {props.showGoBackButton && (
                        <button
                            class="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 fa-solid fa-arrow-left"
                            onClick={props.goBackToSidebar}
                        />
                    )}
                    <img
                        id="chatPartnerAvatar"
                        class="h-10 w-10 rounded-full object-cover"
                        src={
                            props.activeConversation?.receiver.avatar ||
                            defaultPartnerAvatar
                        }
                        alt="Partner Avatar"
                    />
                    <div>
                        <h2
                            id="chatPartnerName"
                            class="text-lg font-semibold text-gray-800"
                        >
                            {props.activeConversation
                                ? props.activeConversation.receiver.name
                                : 'Select a Chat'}
                        </h2>
                        <p id="chatPartnerStatus" class="text-xs text-gray-500">
                            {props.activeConversation && (
                                <>
                                    <span
                                        class={`h-2 w-2 rounded-full ${
                                            props.activeConversation.receiver
                                                .isOnline
                                                ? 'bg-green-500'
                                                : 'bg-gray-400'
                                        } inline-block mr-1`}
                                    ></span>
                                    {props.activeConversation.receiver.isOnline
                                        ? 'Online'
                                        : 'Offline'}
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="messagesArea"
                ref={messagesAreaRef}
                class={`${chat_module.chat_messages_area} flex-grow flex flex-col`}
            >
                {!props.activeConversation ? (
                    <div
                        id="noChatSelected"
                        class="flex flex-grow items-center justify-center text-center text-gray-500"
                    >
                        <p>
                            Select a conversation from the left sidebar to start
                            chatting.
                        </p>
                    </div>
                ) : (
                    <For each={props.activeConversation.messages}>
                        {(msg, i) => {
                            const isSentByMe =
                                msg.sender_id === props.loggedInUser.id;
                            const prevMsg =
                                props.activeConversation?.messages[i() - 1];
                            const showDateDivider =
                                !prevMsg ||
                                msg.timestamp.toDateString() !==
                                    prevMsg.timestamp.toDateString();

                            return (
                                <>
                                    {showDateDivider && (
                                        <div
                                            class={`${chat_module.date_divider}`}
                                        >
                                            <span>
                                                {formatRelativeTime(
                                                    msg.timestamp
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        class={`flex mb-2 ${
                                            isSentByMe
                                                ? 'justify-end'
                                                : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            class={`${
                                                chat_module.message_bubble
                                            } relative group ${
                                                isSentByMe
                                                    ? `${chat_module.sent}`
                                                    : `${chat_module.received}`
                                            } ${
                                                msg.type === 'image'
                                                    ? `${chat_module.image_message}`
                                                    : ''
                                            }`}
                                        >
                                            {getMessageContent(msg)}
                                            <div
                                                class={`${chat_module.message_timestamp} flex items-center justify-end text-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                                            >
                                                {formatMessageTime(
                                                    msg.timestamp
                                                )}
                                                {isSentByMe && (
                                                    <span
                                                        class={`material-symbols-rounded text-xs align-bottom leading-none ml-0.5 ${getStatusColor(
                                                            msg.status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(
                                                            msg.status
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                    </For>
                )}

                <div
                    id="messageInputArea"
                    class={`p-4 bg-white border-t border-gray-200 flex items-end space-x-3 ${
                        !props.activeConversation ? 'hidden' : ''
                    }`}
                >
                    {/* File Input Button */}
                    <button
                        onClick={() => fileInputRef?.click()} // Use optional chaining for ref
                        class="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-300"
                        title="Attach media"
                        disabled={isSending()} // Disable while sending
                    >
                        <span class="material-symbols-rounded text-xl">✉️</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        class="hidden"
                    />
                    <textarea
                        ref={messageInputRef}
                        class="textarea-autosize flex-grow p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                        placeholder="Type your message here..."
                        rows={1}
                        value={messageInput()}
                        onInput={(e) => {
                            setMessageInput(e.currentTarget.value);
                            adjustTextareaHeight();
                        }}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <button
                        id="sendMessageBtn"
                        class="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSendMessage}
                        disabled={messageInput().trim() === ''}
                    >
                        <span class="material-symbols-rounded text-xl">
                            send
                        </span>
                    </button>
                </div>
                <ChatInputArea
                    activeConversation={{
                        id: 'someboringid',
                        name: 'someboringname',
                    }}
                    currentUserId=""
                />
            </div>
        </div>
    );
};

export default ChatWindow;
