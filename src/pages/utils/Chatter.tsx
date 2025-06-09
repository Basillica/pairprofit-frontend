import { createSignal, createEffect, onMount, For } from "solid-js";
import "./chat.css";

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export type MessageStatus = "sent" | "delivered" | "seen" | "failed";
export type MessageType = "text" | "image" | "file";

export interface BaseMessage {
  id: string;
  senderId: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

export interface ImageMessage extends BaseMessage {
  type: "image";
  imageUrl: string | string[]; // Can be a single URL or an array for galleries
}

export interface FileMessage extends BaseMessage {
  type: "file";
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

export type Message = TextMessage | ImageMessage | FileMessage;

export interface Conversation {
  id: string;
  partner: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getStatusIcon(status: MessageStatus): string {
  switch (status) {
    case "sent":
      return "done"; // Single checkmark
    case "delivered":
      return "done_all"; // Double checkmark (delivered but not seen)
    case "seen":
      return "done_all"; // Double checkmark (seen)
    case "failed":
      return "error"; // Error icon
    default:
      return "";
  }
}

export function getStatusColor(status: MessageStatus): string {
  switch (status) {
    case "failed":
      return "text-red-500";
    default:
      return "text-gray-500"; // Default for sent/delivered/seen
  }
}

const loggedInUser: User = {
  isOnline: false,
  id: "user_me",
  name: "You",
  avatar: "https://picsum.photos/50?random=5",
};

// Dummy Data - Updated to reflect improved types
const initialConversations: Conversation[] = [
  {
    id: "chat_kit_herrington",
    partner: {
      id: "contact_kit",
      name: "Kit Herrington",
      avatar: "https://picsum.photos/50?random=9",
      isOnline: true,
    },
    lastMessage: "Ok, got it. Thanks!",
    lastMessageTime: new Date("2025-06-08T18:05:00Z"),
    unreadCount: 0,
    messages: [
      {
        id: "msg_k1",
        senderId: "contact_kit",
        type: "text",
        content:
          "Hi! I received your request for a new website design. I have some initial ideas.",
        timestamp: new Date("2025-06-07T09:30:00Z"),
        status: "seen",
      },
      {
        id: "msg_k2",
        senderId: "user_me",
        type: "text",
        content: "Great! I'm excited to see them. When can we discuss?",
        timestamp: new Date("2025-06-07T09:40:00Z"),
        status: "seen",
      },
      {
        id: "msg_k3",
        senderId: "contact_kit",
        type: "text",
        content:
          "I've attached a preliminary mockup of the homepage layout. Let me know what you think.",
        timestamp: new Date("2025-06-07T14:10:00Z"),
        status: "seen",
      },
      {
        id: "msg_k4",
        senderId: "contact_kit",
        type: "image",
        imageUrl:
          "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg",
        timestamp: new Date("2025-06-07T14:11:00Z"),
        status: "seen",
      },
      {
        id: "msg_k5",
        senderId: "user_me",
        type: "text",
        content: "Looks promising! What about the internal pages?",
        timestamp: new Date("2025-06-07T14:15:00Z"),
        status: "seen",
      },
      {
        id: "msg_k6",
        senderId: "contact_kit",
        type: "text",
        content:
          "They will follow a similar clean design. I'm also thinking of adding a very cool animation for the hero section.",
        timestamp: new Date("2025-06-08T17:00:00Z"),
        status: "seen",
      },
      {
        id: "msg_k7",
        senderId: "user_me",
        type: "text",
        content: "Sounds great! I'm looking forward to it. Ok, got it. Thanks!",
        timestamp: new Date("2025-06-08T18:05:00Z"),
        status: "delivered",
      },
    ],
  },
  {
    id: "chat_john_doe",
    partner: {
      id: "contact_john",
      name: "John Doe",
      avatar: "https://picsum.photos/50?random=5",
      isOnline: false,
    },
    lastMessage: "Can you show me a picture of the faucet?",
    lastMessageTime: new Date("2025-06-05T09:41:00Z"),
    unreadCount: 1,
    messages: [
      {
        id: "msg_j1",
        senderId: "user_me",
        type: "text",
        content: "Hi John, are you available for a repair next week?",
        timestamp: new Date("2025-06-05T09:00:00Z"),
        status: "seen",
      },
      {
        id: "msg_j2",
        senderId: "contact_john",
        type: "text",
        content: "Yes, I have some slots open. What kind of repair is it?",
        timestamp: new Date("2025-06-05T09:15:00Z"),
        status: "delivered",
      },
      {
        id: "msg_j3",
        senderId: "user_me",
        type: "text",
        content: "It's for a leaky faucet in the kitchen.",
        timestamp: new Date("2025-06-05T09:30:00Z"),
        status: "delivered",
      },
      {
        id: "msg_j4",
        senderId: "contact_john",
        type: "image",
        imageUrl: [
          "https://picsum.photos/50?random=1",
          "https://picsum.photos/50?random=2",
        ],
        timestamp: new Date("2025-06-05T09:40:00Z"),
        status: "delivered",
      },
      {
        id: "msg_j5",
        senderId: "contact_john",
        type: "text",
        content: "Can you show me a picture of the faucet?",
        timestamp: new Date("2025-06-05T09:41:00Z"),
        status: "delivered",
      },
    ],
  },
  {
    id: "chat_anna_smith",
    partner: {
      id: "contact_anna",
      name: "Anna Smith",
      avatar: "https://picsum.photos/50?random=3",
      isOnline: true,
    },
    lastMessage: "Got it, thanks for the update!",
    lastMessageTime: new Date("2025-06-09T10:00:00Z"),
    unreadCount: 0,
    messages: [
      {
        id: "msg_a1",
        senderId: "contact_anna",
        type: "text",
        content:
          "Good morning! Just confirming our meeting for tomorrow at 10 AM.",
        timestamp: new Date("2025-06-09T09:45:00Z"),
        status: "seen",
      },
      {
        id: "msg_a2",
        senderId: "user_me",
        type: "text",
        content: "Confirmed! Looking forward to it.",
        timestamp: new Date("2025-06-09T09:50:00Z"),
        status: "seen",
      },
      {
        id: "msg_a3",
        senderId: "contact_anna",
        type: "text",
        content: "Great, see you then.",
        timestamp: new Date("2025-06-09T10:00:00Z"),
        status: "seen",
      },
    ],
  },
];

const defaultPartnerAvatar = "https://picsum.photos/50";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  switchChat: (id: string) => void;
  loggedInUser: User;
  showOnMobile: boolean; // New prop to control its visibility on mobile
}

const Sidebar = (props: SidebarProps) => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [filteredConversations, setFilteredConversations] = createSignal<
    Conversation[]
  >([]);

  createEffect(() => {
    const lowerCaseSearchTerm = searchTerm().toLowerCase();
    const filtered = props.conversations.filter(
      (conv) =>
        conv.partner.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        conv.lastMessage.toLowerCase().includes(lowerCaseSearchTerm)
    );
    filtered.sort(
      (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    );
    setFilteredConversations(filtered);
  });

  return (
    <div
      id="chatSidebar"
      // No longer uses 'open' class for transform, handled by App.tsx's conditional rendering
      // shadow-md and md:shadow-none remain for desktop styling
      class={`w-full bg-white border-r border-gray-200 flex flex-col shadow-md md:shadow-none`}
    >
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img
            class="h-10 w-10 rounded-full object-cover"
            src={props.loggedInUser.avatar}
            alt={props.loggedInUser.name}
          />
          <span class="font-semibold text-gray-800">My Profile</span>
        </div>
        {/* No close button needed here, as App.tsx will handle showing/hiding this entire component */}
      </div>

      <div class="p-3 border-b border-gray-200 bg-gray-50">
        <input
          type="text"
          id="searchChats"
          placeholder="Search conversations..."
          class="w-full p-2 pl-10 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
          style='background-image: url(&apos;data:image/svg+xml;utf8,<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>&apos;); background-repeat: no-repeat; background-position: left 0.75rem center;'
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
          value={searchTerm()}
        />
      </div>

      <div id="conversationList" class="chat-sidebar-list flex-grow">
        <For each={filteredConversations()}>
          {(conv) => (
            <div
              class={`flex items-center p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 relative ${
                props.activeConversationId === conv.id
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : ""
              }`}
              onClick={() => props.switchChat(conv.id)}
            >
              {conv.unreadCount > 0 &&
                props.activeConversationId !== conv.id && (
                  <div class="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-sm"></div>
                )}
              <div class="relative flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full object-cover"
                  src={conv.partner.avatar}
                  alt={conv.partner.name}
                />
                <span
                  class={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-white ${
                    conv.partner.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <div class="flex-grow ml-3 overflow-hidden">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-800 truncate">
                    {conv.partner.name}
                  </span>
                  <span class="text-xs text-gray-500">
                    {formatRelativeTime(conv.lastMessageTime)}
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-600">
                  <p class="truncate text-gray-500">{conv.lastMessage}</p>
                  {conv.unreadCount > 0 &&
                    props.activeConversationId !== conv.id && (
                      <span class="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                </div>
              </div>
            </div>
          )}
        </For>
        {filteredConversations().length === 0 && (
          <p class="text-center text-gray-500 py-4">No conversations found.</p>
        )}
      </div>
    </div>
  );
};

interface ChatWindowProps {
  activeConversation: Conversation | undefined;
  loggedInUser: User;
  sendMessage: (
    content: string,
    type?: "text" | "image" | "file",
    imageUrl?: string | string[]
  ) => void;
  defaultPartnerAvatar: string;
  showGoBackButton: boolean; // New prop for mobile back button
  goBackToSidebar: () => void; // New callback for mobile back button
}

const ChatWindow = (props: ChatWindowProps) => {
  const [messageInput, setMessageInput] = createSignal("");
  let messagesAreaRef: HTMLDivElement | undefined;
  let messageInputRef: HTMLTextAreaElement | undefined;

  const adjustTextareaHeight = () => {
    if (messageInputRef) {
      messageInputRef.style.height = "auto";
      messageInputRef.style.height = messageInputRef.scrollHeight + "px";
    }
  };

  const scrollToBottom = () => {
    if (messagesAreaRef) {
      messagesAreaRef.scrollTop = messagesAreaRef.scrollHeight;
    }
  };

  // Re-scroll to bottom when messages change or conversation changes
  createEffect(() => {
    // Dependencies for this effect are the messages array and the active conversation ID
    props.activeConversation?.messages;
    props.activeConversation?.id;

    // Need a slight delay for DOM to render new messages before scrolling
    setTimeout(scrollToBottom, 50);
  });

  const handleSendMessage = () => {
    const text = messageInput().trim();
    if (text === "") return;

    props.sendMessage(text, "text");
    setMessageInput(""); // Clear input
    adjustTextareaHeight(); // Reset textarea height
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageContent = (msg: Message) => {
    if (msg.type === "text") {
      return <div>{(msg as TextMessage).content}</div>;
    } else if (msg.type === "image") {
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

  return (
    <div class="chat-main flex-grow flex flex-col bg-gray-50">
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
              props.activeConversation?.partner.avatar ||
              props.defaultPartnerAvatar
            }
            alt="Partner Avatar"
          />
          <div>
            <h2
              id="chatPartnerName"
              class="text-lg font-semibold text-gray-800"
            >
              {props.activeConversation
                ? props.activeConversation.partner.name
                : "Select a Chat"}
            </h2>
            <p id="chatPartnerStatus" class="text-xs text-gray-500">
              {props.activeConversation && (
                <>
                  <span
                    class={`h-2 w-2 rounded-full ${
                      props.activeConversation.partner.isOnline
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } inline-block mr-1`}
                  ></span>
                  {props.activeConversation.partner.isOnline
                    ? "Online"
                    : "Offline"}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div
        id="messagesArea"
        ref={messagesAreaRef}
        class="chat-messages-area flex-grow flex flex-col"
      >
        {!props.activeConversation ? (
          <div
            id="noChatSelected"
            class="flex flex-grow items-center justify-center text-center text-gray-500"
          >
            <p>
              Select a conversation from the left sidebar to start chatting.
            </p>
          </div>
        ) : (
          <For each={props.activeConversation.messages}>
            {(msg, i) => {
              const isSentByMe = msg.senderId === props.loggedInUser.id;
              const prevMsg = props.activeConversation?.messages[i() - 1];
              const showDateDivider =
                !prevMsg ||
                msg.timestamp.toDateString() !==
                  prevMsg.timestamp.toDateString();

              return (
                <>
                  {showDateDivider && (
                    <div class="date-divider">
                      <span>{formatRelativeTime(msg.timestamp)}</span>
                    </div>
                  )}
                  <div
                    class={`flex mb-2 ${
                      isSentByMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      class={`message-bubble relative group ${
                        isSentByMe ? "sent" : "received"
                      } ${msg.type === "image" ? "image-message" : ""}`}
                    >
                      {getMessageContent(msg)}
                      <div class="message-timestamp flex items-center justify-end text-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {formatMessageTime(msg.timestamp)}
                        {isSentByMe && (
                          <span
                            class={`material-symbols-rounded text-xs align-bottom leading-none ml-0.5 ${getStatusColor(
                              msg.status
                            )}`}
                          >
                            {getStatusIcon(msg.status)}
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
            !props.activeConversation ? "hidden" : ""
          }`}
        >
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
            disabled={messageInput().trim() === ""}
          >
            <span class="material-symbols-rounded text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChatApp = () => {
  const [conversations, setConversations] =
    createSignal<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = createSignal<
    string | null
  >("chat_kit_herrington");
  const [mobileView, setMobileView] = createSignal<"sidebar" | "chat">(
    window.innerWidth <= 768 ? "sidebar" : "chat"
  );
  const activeConversation = () =>
    conversations().find((c) => c.id === activeConversationId());

  const switchChat = (id: string) => {
    setConversations(
      (prev) =>
        prev
          .map((conv) => (conv.id === id ? { ...conv, unreadCount: 0 } : conv))
          .sort(
            (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
          ) // Re-sort to bring active to top (optional)
    );
    setActiveConversationId(id);
    // On mobile, switch to chat view
    if (window.innerWidth <= 768) {
      setMobileView("chat");
    }
  };

  const handleSendMessage = (
    content: string,
    type: MessageType = "text",
    imageUrl?: string | string[]
  ) => {
    if (!activeConversationId()) return;

    const currentConv = activeConversation();
    if (!currentConv) return;

    let newMessage: Message;

    if (type === "text") {
      newMessage = {
        id: `msg_${Date.now()}`, // In real app, use UUID or backend ID
        senderId: loggedInUser.id,
        type: "text",
        content: content,
        timestamp: new Date(),
        status: "sent", // Optimistic UI: assume sent, update to 'delivered'/'seen' later
      };
    } else if (type === "image" && imageUrl) {
      newMessage = {
        id: `msg_${Date.now()}`,
        senderId: loggedInUser.id,
        type: "image",
        imageUrl: imageUrl,
        timestamp: new Date(),
        status: "sent",
      };
    } else {
      console.warn("Unsupported message type or missing content for image.");
      return;
    }

    setConversations((prev) =>
      prev
        .map((conv) =>
          conv.id === activeConversationId()
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage:
                  type === "text"
                    ? content
                    : type === "image"
                    ? "Image"
                    : "File",
                lastMessageTime: newMessage.timestamp,
              }
            : conv
        )
        .sort(
          (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
        )
    );

    // Simulate status update after a delay (e.g., server acknowledgment)
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId()
            ? {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.id === newMessage.id
                    ? { ...msg, status: "delivered" }
                    : msg
                ),
              }
            : conv
        )
      );
    }, 1000); // Simulate network delay

    // Simulate partner's response (for demo purposes)
    if (
      currentConv.partner.id === "contact_kit" &&
      newMessage.type === "text" &&
      newMessage.content.toLowerCase().includes("hello")
    ) {
      setTimeout(() => {
        const autoResponse: TextMessage = {
          id: `msg_${Date.now()}_auto`,
          senderId: currentConv.partner.id,
          type: "text",
          content: "Hi there! How can I help you today?",
          timestamp: new Date(),
          status: "sent", // Auto-responses are 'sent' by partner from their end
        };
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId()
              ? {
                  ...conv,
                  messages: [...conv.messages, autoResponse],
                  lastMessage: autoResponse.content,
                  lastMessageTime: autoResponse.timestamp,
                }
              : conv
          )
        );
      }, 2000);
    }
  };

  // Handle window resize for sidebar visibility
  // Handle window resize to adjust mobileView state
  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        // On desktop, always show both
        setMobileView("chat"); // 'chat' implies both are visible on desktop
      } else {
        // On mobile, if an active chat exists, stay on chat view, otherwise go to sidebar
        if (activeConversationId()) {
          setMobileView("chat"); // Stay on chat if one is selected
        } else {
          setMobileView("sidebar"); // Go to sidebar if no chat selected initially
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // Initial load, set active chat if any
  createEffect(() => {
    if (!activeConversationId() && conversations().length > 0) {
      setActiveConversationId(conversations()[0].id);
    }
  });

  return (
    <div class="chat-container">
      <div
        class={`w-full md:w-1/4
                    bg-white border-r border-gray-200
                    flex flex-col shadow-md md:shadow-none
                    absolute md:relative inset-0
                    transition-transform duration-300 ease-in-out
                    ${
                      mobileView() === "sidebar"
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
      >
        <Sidebar
          conversations={conversations()}
          activeConversationId={activeConversationId()}
          switchChat={switchChat}
          loggedInUser={loggedInUser}
          showOnMobile={mobileView() === "sidebar"}
        />
      </div>

      <div
        class={`flex-grow flex flex-col bg-gray-50 ${
          mobileView() === "chat" ? "block" : "hidden"
        } md:block
        transition-transform duration-300 ease-in-out
                    ${
                      mobileView() === "chat"
                        ? "translate-x-0"
                        : "translate-x-full md:translate-x-0"
                    }
        `}
      >
        <ChatWindow
          activeConversation={activeConversation()}
          loggedInUser={loggedInUser}
          sendMessage={handleSendMessage}
          defaultPartnerAvatar={defaultPartnerAvatar}
          showGoBackButton={window.innerWidth <= 768 && mobileView() === "chat"}
          goBackToSidebar={() => setMobileView("sidebar")}
        />
      </div>
    </div>
  );
};
