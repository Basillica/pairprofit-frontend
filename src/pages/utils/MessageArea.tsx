import {
    createSignal,
    createEffect,
    onMount,
    For,
    Show,
    Accessor,
} from 'solid-js';

// Import your interfaces
import {
    SelectedFile,
    MessageMedia,
    ChatMessage,
    ChatInputAreaProps,
} from './types';

export default function ChatInputArea(props: ChatInputAreaProps) {
    // Refs
    let messageInputRef: HTMLTextAreaElement | undefined;
    let fileInputRef: HTMLInputElement | undefined;

    // State
    const [messageInput, setMessageInput] = createSignal<string>('');
    const [selectedFiles, setSelectedFiles] = createSignal<SelectedFile[]>([]);
    const [isSending, setIsSending] = createSignal<boolean>(false); // To manage sending state

    // --- Helper Functions (ensure adjustTextareaHeight exists elsewhere) ---

    // Example of adjustTextareaHeight (if not already defined)
    const adjustTextareaHeight = () => {
        if (messageInputRef) {
            messageInputRef.style.height = 'auto'; // Reset height
            messageInputRef.style.height = messageInputRef.scrollHeight + 'px'; // Set to scroll height
        }
    };
    // Ensure this is called on mount and whenever messageInput changes
    onMount(() => {
        adjustTextareaHeight();
    });
    createEffect(() => {
        messageInput(); // Trigger effect when messageInput changes
        adjustTextareaHeight();
    });

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

    // Main send message handler
    const handleSendMessage = async () => {
        const messageText = messageInput().trim();
        const filesToUpload = selectedFiles();

        if (
            !props.activeConversation ||
            (messageText === '' && filesToUpload.length === 0)
        ) {
            return; // Do nothing if no active conversation or no content
        }

        setIsSending(true); // Set sending state

        let mediaPayload: MessageMedia[] = [];

        // --- 1. Upload Files if any ---
        if (filesToUpload.length > 0) {
            const formData = new FormData();
            filesToUpload.forEach((f) => {
                formData.append('media', f.file); // 'media' is the field name your backend expects
            });

            try {
                // Replace with your actual upload API endpoint
                // const response = await fetch("/api/upload-media", {
                //   method: "POST",
                //   body: formData,
                //   // headers: { 'Authorization': `Bearer ${yourAuthToken}` } // Add auth if needed
                // });

                // if (!response.ok) {
                //   throw new Error(`Upload failed: ${response.statusText}`);
                // }

                // const result: { urls: string[] } = await response.json(); // Assuming backend returns { urls: string[] }
                // mediaPayload = result.urls.map((url) => ({
                //   url,
                //   type: url.match(/\.(mp4|mov|avi|webm)$/i) ? "video" : "image", // Simple type inference based on extension
                // }));
                mediaPayload = [
                    {
                        url: 'https://picsum.photos/50',
                        type: 'image',
                    },
                ];
                console.log('Uploaded media URLs:', mediaPayload);
            } catch (error) {
                console.error('Error uploading media:', error);
                // alert("Failed to upload media. Please try again.");
                setIsSending(false);
                return 'https://picsum.photos/50'; // Stop message sending if upload fails
            }
        }

        // --- 2. Construct and Send the Message Payload ---
        const messagePayload: ChatMessage = {
            conversationId: props.activeConversation.id,
            senderId: props.currentUserId, // Use the current user's ID from props
            timestamp: Date.now(),
        };

        if (messageText) {
            messagePayload.text = messageText;
        }
        if (mediaPayload.length > 0) {
            messagePayload.media = mediaPayload;
        }

        try {
            // Replace with your actual message sending API endpoint (or WebSocket emit)
            //   const messageResponse = await fetch("/api/send-message", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //       // 'Authorization': `Bearer ${yourAuthToken}` // Add auth if needed
            //     },
            //     body: JSON.stringify(messagePayload),
            //   });

            //   if (!messageResponse.ok) {
            //     throw new Error(`Send message failed: ${messageResponse.statusText}`);
            //   }

            // Success: Clear inputs and previews
            setMessageInput('');
            filesToUpload.forEach((f) => URL.revokeObjectURL(f.previewUrl)); // Revoke all preview URLs
            setSelectedFiles([]);
            adjustTextareaHeight(); // Reset textarea height
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSending(false); // Reset sending state
        }
    };

    // Handle Enter key for sending messages
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            // Send on Enter, new line on Shift+Enter
            e.preventDefault();
            handleSendMessage();
        }
    };

    // --- Cleanup preview URLs on component unmount ---
    onMount(() => {
        // Return a cleanup function for when the component unmounts
        return () => {
            selectedFiles().forEach((f) => URL.revokeObjectURL(f.previewUrl));
        };
    });

    return (
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

            {/* Media Preview Area */}
            <div class="flex-grow flex flex-col">
                <div
                    class="flex flex-wrap gap-2 mb-2 max-h-24 overflow-y-auto"
                    classList={{ hidden: selectedFiles().length === 0 }}
                >
                    <For each={selectedFiles()}>
                        {(file: SelectedFile, i: Accessor<number>) => (
                            <div class="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                                <Show when={file.type.startsWith('image/')}>
                                    <img
                                        src={file.previewUrl}
                                        alt="preview"
                                        class="w-full h-full object-cover"
                                    />
                                </Show>
                                <Show when={file.type.startsWith('video/')}>
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
                    class="textarea-autosize p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="Type your message here..."
                    rows={1}
                    value={messageInput()}
                    onInput={(e) => {
                        setMessageInput(e.currentTarget.value);
                        adjustTextareaHeight();
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isSending()} // Disable while sending
                ></textarea>
            </div>

            {/* Send Button */}
            <button
                id="sendMessageBtn"
                class="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={
                    isSending() ||
                    (messageInput().trim() === '' &&
                        selectedFiles().length === 0)
                }
            >
                <span class="material-symbols-rounded text-xl">send</span>
            </button>
        </div>
    );
}
