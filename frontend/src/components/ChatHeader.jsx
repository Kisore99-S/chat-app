import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-8 rounded-full relative">
              <img
                src={selectedUser.avatarUrl || "/avatar.png"}
                alt={selectedUser.username}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm">{selectedUser.username}</h3>
            <p className="text-xs text-base-content/70">
              {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button className="relative" onClick={() => setSelectedUser(null)}>
          <X size={20} className="absolute right-3 -top-3" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
