import { createSignal, createEffect, onMount } from "solid-js";
import "./chat.css";
import { User, Conversation, MessageType, Message, TextMessage } from "./types";
import ChatWindow from "./ChatWindow";
import Sidebar from "./SideBar";

const loggedInUser: User = {
  isOnline: false,
  id: "user_me",
  name: "You",
  avatar: "https://picsum.photos/50?random=5",
};

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
          "https://picsum.photos/200?random=1",
          "https://picsum.photos/200?random=2",
          "https://picsum.photos/200?random=3",
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
