import { createSignal, createEffect, For, Accessor, Show } from 'solid-js';
import chat_module from './chat.module.css';
import { ChatWindowProps, SelectedFile } from './types';
import {
    formatRelativeTime,
    getStatusColor,
    getStatusIcon,
    stringToHslColor,
    getInitials,
} from './functions';
import { ChatMessageModel } from '../../../models/chat';

const ChatWindow = (props: ChatWindowProps) => {
    const [messageInput, setMessageInput] = createSignal('');
    const [selectedFiles, setSelectedFiles] = createSignal<SelectedFile[]>([]);
    const [isSending, setIsSending] = createSignal<boolean>(false);

    let messagesAreaRef: HTMLDivElement | undefined;
    let messageInputRef: HTMLTextAreaElement | undefined;
    let fileInputRef: HTMLInputElement | undefined;

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
        // props.activeConversation?.messages;
        // props.activeConversation?.id;
        setTimeout(scrollToBottom, 50);
    });

    const handleSendMessage = () => {
        const text = messageInput().trim();
        if (text === '' && selectedFiles().length === 0) return;
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

    const getMessageContent = (msg: ChatMessageModel) => {
        if (!msg.is_media) {
            return <div>{msg.message}</div>;
        } else {
            return (
                <div class="image-gallery">
                    <img
                        src={msg.message}
                        alt="Chat image"
                        class="rounded-lg object-cover"
                    />
                </div>
            );
        }
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

    // Function to remove a file from the preview list
    const removeFile = (indexToRemove: number) => {
        setSelectedFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== indexToRemove);
            // Revoke the URL for the removed file to prevent memory leaks
            if (prev[indexToRemove]) {
                // Ensure file exists before revoking
                URL.revokeObjectURL(prev[indexToRemove].previewUrl);
            }
            return updatedFiles;
        });
    };

    function isSameDay(d1: Date, d2: Date) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

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
                    {/* <img
                        id="chatPartnerAvatar"
                        class="h-10 w-10 rounded-full object-cover"
                        src={
                            props.activeConversation?.receiver.avatar ||
                            defaultPartnerAvatar
                        }
                        alt="Partner Avatar"
                    /> */}
                    <div
                        class="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{
                            'background-color': stringToHslColor(
                                `${props.authUser()?.firstname} ${
                                    props.authUser()?.lastname
                                }`,
                                70,
                                70
                            ),
                        }}
                        aria-label={`${props.authUser()?.firstname} ${
                            props.authUser()?.lastname
                        }`}
                    >
                        {getInitials(
                            `${props.authUser()?.firstname} ${
                                props.authUser()?.lastname
                            }`
                        )}
                    </div>

                    <div>
                        <h2
                            id="chatPartnerName"
                            class="text-lg font-semibold text-gray-800"
                        >
                            {props.roomMessages.latest &&
                            props.roomMessages.latest!.length > 0 &&
                            props.activeConversationId() ===
                                props.roomMessages.latest![0].id
                                ? 'To be Changed'
                                : props.currentRoom()?.title}
                        </h2>
                        <p id="chatPartnerStatus" class="text-xs text-gray-500">
                            {props.roomMessages.latest &&
                                props.roomMessages.latest!.length > 0 &&
                                props.activeConversationId() && (
                                    // props.roomMessages.latest![0].id && (
                                    <>
                                        <span
                                            class={`h-2 w-2 rounded-full ${
                                                // props.activeConversation.receiver
                                                //     .isOnline
                                                props.activeConversationId()
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-400'
                                            } inline-block mr-1`}
                                        ></span>
                                        {props.activeConversationId()
                                            ? // props.activeConversation.receiver.isOnline
                                              'Online'
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
                {props.roomMessages.latest?.length! < 1 ? (
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
                    <For each={props.roomMessages.latest!}>
                        {(msg, i) => {
                            const isSentByMe =
                                msg.sender_id === props.authUser()?.id;
                            const prevMsg = props.roomMessages()![i() - 1];

                            const showDateDivider =
                                !prevMsg ||
                                !isSameDay(
                                    new Date(msg.updated_at),
                                    new Date(prevMsg.updated_at)
                                );

                            return (
                                <>
                                    {showDateDivider && (
                                        <div
                                            class={`${chat_module.date_divider}`}
                                        >
                                            <span>
                                                {formatRelativeTime(
                                                    msg.updated_at
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
                                                msg.is_media
                                                    ? `${chat_module.image_message}`
                                                    : ''
                                            }`}
                                        >
                                            {getMessageContent(msg)}
                                            <div
                                                class={`${chat_module.message_timestamp} flex items-center justify-end text-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                                            >
                                                {formatRelativeTime(
                                                    msg.updated_at
                                                )}
                                                {isSentByMe && (
                                                    <span
                                                        class={`material-symbols-rounded text-xs align-bottom leading-none ml-0.5 ${getStatusColor(
                                                            msg.status!
                                                        )}`}
                                                    >
                                                        {getStatusIcon(
                                                            msg.status!
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
                        !props.activeConversationId()! ? 'hidden' : ''
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
                    {/* Media Preview Area */}
                    <div class="flex-grow flex flex-col">
                        <div
                            class="flex flex-wrap gap-2 mb-2 max-h-24 overflow-y-auto"
                            classList={{ hidden: selectedFiles().length === 0 }}
                        >
                            <For each={selectedFiles()}>
                                {(file: SelectedFile, i: Accessor<number>) => (
                                    <div class="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                                        <Show
                                            when={file.type.startsWith(
                                                'image/'
                                            )}
                                        >
                                            <img
                                                src={file.previewUrl}
                                                alt="preview"
                                                class="w-full h-full object-cover"
                                            />
                                        </Show>
                                        <Show
                                            when={file.type.startsWith(
                                                'video/'
                                            )}
                                        >
                                            <video
                                                src={file.previewUrl}
                                                class="w-full h-full object-cover"
                                                controls={false}
                                                muted
                                            ></video>
                                            <span
                                                class="material-symbols-rounded absolute text-white text-2xl"
                                                style="text-shadow: 0 0 5px rgba(0,0,0,0.7);"
                                            >
                                                play_circle
                                            </span>
                                        </Show>
                                        <button
                                            onClick={() => removeFile(i())}
                                            class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                )}
                            </For>
                        </div>

                        {/* Textarea */}
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
                    </div>
                    <button
                        id="sendMessageBtn"
                        class="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSendMessage}
                        disabled={
                            messageInput().trim() === '' &&
                            selectedFiles().length === 0
                        }
                    >
                        <span class="material-symbols-rounded text-xl">
                            send
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
