import { createSignal, For, createEffect, onMount } from "solid-js";
import css_module from "./style.module.css";

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl: string;
}

interface Message {
  text: string;
  isUser: boolean; // true if the message is from the current user
  timestamp: string;
}

export const LovelyChat = () => {
  const [contacts] = createSignal<Contact[]>([
    {
      id: 1,
      name: "Jane Doe",
      lastMessage: "Last message here...",
      timestamp: "10:30 AM",
      avatarUrl: "https://picsum.photos/40?random=1",
    },
    {
      id: 2,
      name: "Peter Smith",
      lastMessage: "Hey, how are you?",
      timestamp: "Yesterday",
      avatarUrl: "https://picsum.photos/40?random=2",
    },
    {
      id: 3,
      name: "Alice Brown",
      lastMessage: "Sent an image",
      timestamp: "2 days ago",
      avatarUrl: "https://picsum.photos/40?random=3",
    },
    {
      id: 4,
      name: "John Williams",
      lastMessage: "Typing...",
      timestamp: "Just now",
      avatarUrl: "https://picsum.photos/40?random=4",
    },
    {
      id: 5,
      name: "Sophia Miller",
      lastMessage: "Okay, sounds good!",
      timestamp: "1 week ago",
      avatarUrl: "https://picsum.photos/40?random=5",
    },
  ]);

  const [messages] = createSignal<Message[]>([
    {
      text: "Hello! How are you doing today?",
      isUser: false,
      timestamp: "10:30 AM",
    },
    {
      text: "I'm doing great, thanks! What about you?",
      isUser: true,
      timestamp: "10:31 AM",
    },
    {
      text: "Just working on some stuff.",
      isUser: false,
      timestamp: "10:32 AM",
    },
    {
      text: "SolidJS is pretty cool, isn't it?",
      isUser: true,
      timestamp: "10:33 AM",
    },
    {
      text: "It definitely is! Enjoying working with it.",
      isUser: false,
      timestamp: "10:34 AM",
    },
    {
      text: "Planning anything fun for the weekend?",
      isUser: true,
      timestamp: "10:35 AM",
    },
    {
      text: "Thinking about a hike, maybe. You?",
      isUser: false,
      timestamp: "10:36 AM",
    },
    {
      text: "Sounds relaxing! I might just catch up on some reading.",
      isUser: true,
      timestamp: "10:37 AM",
    },
    {
      text: "Nice! Well, gotta get back to it. Talk soon!",
      isUser: false,
      timestamp: "10:38 AM",
    },
    {
      text: "You too! Bye for now.",
      isUser: true,
      timestamp: "10:39 AM",
    },
  ]);

  const [activeContact, setActiveContact] = createSignal<Contact | null>(null); // Start with no active contact
  const [isMobile, setIsMobile] = createSignal(false);
  const [showChat, setShowChat] = createSignal(false); // Controls which panel is visible on mobile

  // Function to update mobile state
  const checkIsMobile = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    // On desktop, always show chat and default to first contact if none selected
    if (!mobile && !activeContact()) {
      setActiveContact(contacts()[0]);
      setShowChat(true);
    }
  };

  // Effect to handle initial load and window resize
  onMount(() => {
    checkIsMobile(); // Set initial state
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  });

  // Effect to manage showChat state based on isMobile and activeContact
  createEffect(() => {
    if (!isMobile()) {
      setShowChat(true); // Always show chat on desktop
    } else {
      // On mobile, if no contact is active, hide chat
      if (!activeContact()) {
        setShowChat(false);
      }
      // If a contact is active, show chat
      else {
        setShowChat(true);
      }
    }
  });

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
  };

  const handleBackButtonClick = () => {
    setActiveContact(null); // Clear active contact to trigger sidebar view on mobile
  };

  return (
    <div class={`${css_module.chat_container}`}>
      <div
        class={`${css_module.chat_sidebar} ${
          isMobile() && showChat() ? css_module.hidden : ""
        }`}
      >
        <div class={`p-3 ${css_module.chat_list_header}`}>
          <div class="input-group">
            <input
              type="text"
              class="form-control border-0 bg-white shadow-sm"
              placeholder="Search or start new chat"
            />
          </div>
        </div>

        <div class={`${css_module.chat_list}`}>
          <ul>
            <For each={contacts()}>
              {(contact) => (
                <li
                  class={`${css_module.chat_contact} ${
                    activeContact()?.id === contact.id ? css_module.active : ""
                  }`}
                  data-chat-id={contact.id}
                  onClick={() => handleContactClick(contact)}
                >
                  <img
                    src={contact.avatarUrl}
                    alt={contact.name}
                    class="rounded-circle me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{contact.name}</h6>
                    <small class="text-muted">{contact.lastMessage}</small>
                  </div>
                  <small class="text-muted ms-2">{contact.timestamp}</small>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      {/* Chat Messages Wrapper */}
      {/*
        On mobile:
        - If showChat is false (meaning sidebar is visible), hide the chat panel.
        - If showChat is true (meaning sidebar is hidden), show the chat panel.
        On desktop: Chat panel is always visible.
      */}
      <div
        class={`${css_module.chat_messages_wrapper} ${
          isMobile() && !showChat() ? css_module.hidden : ""
        }`}
      >
        {/* Mobile Chat Header (Only visible on mobile) */}
        {isMobile() && (
          <div
            class={`${css_module.mobile_chat_nav} p-2 border-bottom d-flex align-items-center`}
            // class={`${css_module.chat_header} d-flex align-items-center p-3 border-bottom`}
          >
            <button
              class="btn btn-sm btn-outline-secondary me-2"
              onClick={handleBackButtonClick}
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            {activeContact() ? (
              <div class="d-flex align-items-center">
                <img
                  src={activeContact()?.avatarUrl}
                  alt={activeContact()?.name}
                  class="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                <h6 class="mb-0">{activeContact()?.name}</h6>
              </div>
            ) : (
              <h6 class="mb-0">Select a Chat</h6>
            )}
          </div>
        )}

        {/* Desktop Chat Header (Only visible on desktop) */}
        {!isMobile() && (
          <div
            class={`${css_module.chat_header} d-flex align-items-center p-3 border-bottom`}
          >
            {activeContact() ? (
              <>
                <img
                  src={activeContact()?.avatarUrl}
                  alt={activeContact()?.name}
                  class="rounded-circle me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <h6 class="mb-0 flex-grow-1">{activeContact()?.name}</h6>
              </>
            ) : (
              <>
                <i class="fas fa-user-circle me-3 fa-2x text-secondary"></i>
                <h6 class="mb-0 flex-grow-1">Select a Chat</h6>
              </>
            )}
            <div>
              <button class="btn btn-sm btn-light me-2">
                <i class="fas fa-phone"></i>
              </button>
              <button class="btn btn-sm btn-light me-2">
                <i class="fas fa-video"></i>
              </button>
              <button class="btn btn-sm btn-light">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div
          class={`${css_module.chat_messages} p-3 overflow-auto flex-grow-1`}
        >
          <For each={messages()}>
            {(message) => (
              <div
                class={`d-flex mb-2 ${
                  message.isUser
                    ? css_module.message_user // Apply specific user message styles
                    : css_module.message_other // Apply specific other message styles
                }`}
              >
                <div
                  class={`${css_module.chat_bubble} ${
                    message.isUser
                      ? "bg-primary text-white"
                      : "bg-light text-dark"
                  } p-2 rounded-pill`}
                >
                  {message.text}
                  <small class={`text-muted ${css_module.message_timestamp}`}>
                    {message.timestamp}
                  </small>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Chat Input Area */}
        <div class={`${css_module.chat_input_area} p-3 border-top`}>
          <div class={`${css_module.chat_input_group}`}>
            <button class="btn btn-light border rounded-circle me-2">
              <i class="far fa-smile"></i>
            </button>
            <input
              type="text"
              class="form-control border-0 rounded-pill bg-light shadow-sm"
              placeholder="Type a message"
            />
            <button class="btn btn-primary rounded-pill ms-2 send-button">
              <i class="fas fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
