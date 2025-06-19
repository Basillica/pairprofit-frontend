import { createSignal, createEffect, For } from "solid-js";
import "./chat.css";
import { User, Conversation } from "./types";
import { formatRelativeTime } from "./functions";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  switchChat: (id: string) => void;
  loggedInUser: User;
  showOnMobile: boolean;
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

export default Sidebar;
