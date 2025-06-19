import { MessageStatus } from "./types";

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
