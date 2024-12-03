import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import {
  formatDateLabel,
  formatMessageTime,
  groupMessagesByDate,
} from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser.id);
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [
    selectedUser.id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 thin-scroll">
        {/* Loop through grouped messages */}
        {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
          <div key={date}>
            {/* Date Indicator */}
            <div className="text-center text-gray-500 my-4">
              {formatDateLabel(date)}{" "}
              {/* Date label (e.g., Today, Yesterday, November) */}
            </div>

            {/* Messages for the specific date */}
            {messagesForDate.map((message) => (
              <div
                key={message.id}
                className={`chat ${
                  message.senderId === authUser.id ? "chat-end" : "chat-start"
                }`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser.id
                          ? authUser.avatarUrl || "/avatar.png"
                          : selectedUser.avatarUrl || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.content && (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <div
                    className={`${
                      message.senderId === authUser.id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <time className="text-xs opacity-50 ml-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
