import { createSignal, For, createEffect } from 'solid-js';
// import './style.css'; // Assuming style.css contains additional custom styles
import css_module from './style.module.css'

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl: string;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}


export const LovelyChat = () => {
  const [activeContact, setActiveContact] = createSignal<Contact | null>(null);
  const [contacts] = createSignal<Contact[]>([
    {
      id: 1,
      name: 'Jane Doe',
      lastMessage: 'Last message here...',
      timestamp: '10:30 AM',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 2,
      name: 'Peter Smith',
      lastMessage: 'Hey, how are you?',
      timestamp: 'Yesterday',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 3,
      name: 'Alice Brown',
      lastMessage: 'Sent an image',
      timestamp: '2 days ago',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 4,
      name: 'John Williams',
      lastMessage: 'Typing...',
      timestamp: 'Just now',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 5,
      name: 'Sophia Miller',
      lastMessage: 'Okay, sounds good!',
      timestamp: '1 week ago',
      avatarUrl: 'https://picsum.photos/20',
    },
  ]);

  const [messages] = createSignal<Message[]>([
    { text: 'Hello! How are you doing today?', isUser: false, timestamp: '10:30 AM' },
    { text: "I'm doing great, thanks! What about you?", isUser: true, timestamp: '10:31 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:32 AM' },
  ]);

  const [showChatView, setShowChatView] = createSignal(window.innerWidth <= 768 ? false : true);

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    if (window.innerWidth <= 768) {
      setShowChatView(true);
    }
  };

  const handleBackButtonClick = () => {
    setShowChatView(false);
    setActiveContact(null);
  };

  createEffect(() => {
    const handleResize = () => {
      setShowChatView(window.innerWidth > 768 || (window.innerWidth <= 768 && activeContact()) ? true : false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeContact]);

  return (
    <div class="container-fluid chat-container">
      <div class={`chat-sidebar ${showChatView() && window.innerWidth <= 768 ? 'hidden' : ''}`}>
        <div class="p-1 chat-list-header">
          <div class="input-group mb-3">
            <span class="input-group-text bg-white border-0"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control border-0 bg-white shadow-sm" placeholder="Search or start new chat" />
          </div>
        </div>

        <div class="p-1 chat-list-header" style={"width: 100%; background-color: blue"}>
          <ul class="list-group list-group-flush overflow-auto chat-list">
            <For each={contacts()}>{(contact) => (
              <li
                class={`list-group-item d-flex align-items-center p-3 bg-light chat-contact ${
                  activeContact()?.id === contact.id ? 'active' : ''
                }`}
                data-chat-id={contact.id}
                onClick={() => handleContactClick(contact)}
              >
                <img src={contact.avatarUrl} alt={contact.name} class="rounded-circle me-3" />
                <div class="flex-grow-1">
                  <h6 class="mb-0">{contact.name}</h6>
                  <small class="text-muted">{contact.lastMessage}</small>
                </div>
                <small class="text-muted ms-2">{contact.timestamp}</small>
              </li>
            )}</For>
          </ul>
        </div>
      </div>

      <div class={`chat-messages-wrapper ${showChatView() ? '' : 'd-none d-md-block'}`}>
        <div class="chat-header">
          <i class="fas fa-arrow-left back-button" onClick={handleBackButtonClick}></i>
          {activeContact() ? (
            <div class="d-flex align-items-center">
              <img src={activeContact()?.avatarUrl} alt={activeContact()?.name} class="rounded-circle me-3" />
              <h6 class="mb-0">{activeContact()?.name}</h6>
            </div>
          ) : (
            <div class="d-flex align-items-center">
              <i class="fas fa-user-circle me-3 fa-2x text-secondary"></i>
              <h6 class="mb-0">Select a Chat</h6>
            </div>
          )}
          <div>
            <button class="btn btn-sm btn-light me-2"><i class="fas fa-phone"></i></button>
            <button class="btn btn-sm btn-light me-2"><i class="fas fa-video"></i></button>
            <button class="btn btn-sm btn-light"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>

        <div class="chat-messages p-3 overflow-auto">
          <For each={messages()}>{(message) => (
            <div class={`d-flex ${message.isUser ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
              {!message.isUser && (
                <div class="chat-bubble bg-light text-dark p-2 rounded-pill">
                  {message.text}
                </div>
              )}
              <small class={`text-muted ${message.isUser ? 'me-2' : 'ms-2'} align-self-end`}>{message.timestamp}</small>
              {message.isUser && (
                <div class="chat-bubble bg-primary text-white p-2 rounded-pill">
                  {message.text}
                </div>
              )}
            </div>
          )}</For>
        </div>

        <div class="chat-input-area p-3">
          <div class="chat-input-group">
            <button class="btn btn-light border rounded-pill me-2"><i class="far fa-smile"></i></button>
            <input type="text" class="form-control border-0 rounded-pill bg-light shadow-sm" placeholder="Type a message" />
            <button class="btn btn-primary rounded-pill ms-2 send-button"><i class="fas fa-paper-plane"></i> Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export const Shitty = () => {
  const [contacts] = createSignal<Contact[]>([
    {
      id: 1,
      name: 'Jane Doe',
      lastMessage: 'Last message here...',
      timestamp: '10:30 AM',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 2,
      name: 'Peter Smith',
      lastMessage: 'Hey, how are you?',
      timestamp: 'Yesterday',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 3,
      name: 'Alice Brown',
      lastMessage: 'Sent an image',
      timestamp: '2 days ago',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 4,
      name: 'John Williams',
      lastMessage: 'Typing...',
      timestamp: 'Just now',
      avatarUrl: 'https://picsum.photos/20',
    },
    {
      id: 5,
      name: 'Sophia Miller',
      lastMessage: 'Okay, sounds good!',
      timestamp: '1 week ago',
      avatarUrl: 'https://picsum.photos/20',
    },
  ]);

  const [messages] = createSignal<Message[]>([
    { text: 'Hello! How are you doing today?', isUser: false, timestamp: '10:30 AM' },
    { text: "I'm doing great, thanks! What about you?", isUser: true, timestamp: '10:31 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:32 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:33 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:34 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:35 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:36 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:37 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:38 AM' },
    { text: 'Just working on some stuff.', isUser: false, timestamp: '10:39 AM' },
  ]);
  const [activeContact, setActiveContact] = createSignal<Contact | null>(null);
  const [isMobile, setIsMobile] = createSignal(window.innerWidth <= 768);
  const [showChat, setShowChat] = createSignal(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setShowChat(true);
    }
  };

  createEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    if (isMobile()) {
      setShowChat(true);
    }
  };

  const handleBackButtonClick = () => {
    setShowChat(false);
    setActiveContact(null);
  };

  return (
    <div class={`container-fluid ${css_module.chat_container}`}>
      <div class={`${css_module.chat_sidebar} ${isMobile() && showChat() ? 'd-none' : ''}`}>
        <div class={`p-1 ${css_module.chat_list_header}`}>
          <div class="input-group mb-2">
            <span class="input-group-text bg-white border-0"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control border-0 bg-white shadow-sm" placeholder="Search or start new chat" />
          </div>
        </div>

        <div class={`${css_module.chat_sidebar}`}>
          <ul >
            <For each={contacts()}>{(contact) => (
              <li
                class={`bg-light ${css_module.chat_contact} ${
                  activeContact()?.id === contact.id ? 'active' : ''
                }`}
                data-chat-id={contact.id}
                onClick={() => handleContactClick(contact)}
              >
                <img src={contact.avatarUrl} alt={contact.name} class="rounded-circle me-3" />
                <div class="flex-grow-1">
                  <h6 class="mb-0">{contact.name}</h6>
                  <small class="text-muted">{contact.lastMessage}</small>
                </div>
                <small class="text-muted ms-2">{contact.timestamp}</small>
              </li>
            )}</For>
          </ul>
        </div>
      </div>

      <div class={`${css_module.chat_messages_wrapper} ${showChat() ? 'd-flex flex-column h-100' : isMobile() ? 'd-none' : 'd-flex flex-column h-100'}`}>
        {isMobile() && showChat() ? (
          <div class="mobile-chat-nav bg-light p-2 border-bottom d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-2" onClick={handleBackButtonClick}>
              <i class="fas fa-arrow-left"></i>
            </button>
            {activeContact() && (
              <div class="d-flex align-items-center">
                <img src={activeContact()?.avatarUrl} alt={activeContact()?.name} class="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                <h6 class="mb-0">{activeContact()?.name}</h6>
              </div>
            )}
          </div>
        ) : null}

        {isMobile() && showChat() ? 
            <div class="mobile-chat-nav bg-light p-2 border-bottom d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary me-2" onClick={handleBackButtonClick}>
                <i class="fas fa-arrow-left"></i>
              </button>
              {activeContact() && (
                <div class="d-flex align-items-center">
                  <img src={activeContact()?.avatarUrl} alt={activeContact()?.name} class="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                  <h6 class="mb-0">{activeContact()?.name}</h6>
                </div>
              )}
            </div>
            : null
        }
          

        <div class={`${css_module.chat_header} ${isMobile() ? 'd-none' : 'd-flex'} align-items-center p-3 border-bottom`}>
          {activeContact() ? (
            <>
              <img src={activeContact()?.avatarUrl} alt={activeContact()?.name} class="rounded-circle me-3" />
              <h6 class="mb-0 flex-grow-1">{activeContact()?.name}</h6>
            </>
          ) : (
            <>
              <i class="fas fa-user-circle me-3 fa-2x text-secondary"></i>
              <h6 class="mb-0 flex-grow-1">Select a Chat</h6>
            </>
          )}
          <div>
            <button class="btn btn-sm btn-light me-2"><i class="fas fa-phone"></i></button>
            <button class="btn btn-sm btn-light me-2"><i class="fas fa-video"></i></button>
            <button class="btn btn-sm btn-light"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>

        <div class={`${css_module.chat_messages} p-3 overflow-auto flex-grow-1`} style={{ "padding-top": isMobile() && showChat() ? '3.5rem' : undefined }}>
          <For each={messages()}>{(message) => (
            <div class={`d-flex ${message.isUser ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
              {!message.isUser && (
                <div class={`${css_module.chat_bubble} bg-light text-dark p-2 rounded-pill`}>
                  {message.text}
                </div>
              )}
              <small class={`text-muted ${message.isUser ? 'me-2' : 'ms-2'} align-self-end`}>{message.timestamp}</small>
              {message.isUser && (
                <div class={`${css_module.chat_bubble} bg-primary text-white p-2 rounded-pill`}>
                  {message.text}
                </div>
              )}
            </div>
          )}</For>
        </div>

        <div class={`${css_module.chat_input_area} p-3 border-top`}>
          <div class={`${css_module.chat_input_group}`}>
            <button class="btn btn-light border rounded-pill me-2"><i class="far fa-smile"></i></button>
            <input type="text" class="form-control border-0 rounded-pill bg-light shadow-sm" placeholder="Type a message" />
            <button class="btn btn-primary rounded-pill ms-2 send-button" style={""}><i class="fas fa-paper-plane"></i> Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};