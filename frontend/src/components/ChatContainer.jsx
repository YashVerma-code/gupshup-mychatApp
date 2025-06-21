import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import { User } from "lucide-react";

const ChatContainer = () => {
  const { messages, isMessagesLoading } = useMessageStore();
  const { authUser, selectedUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function formatDate(date) {
    return new Date(date).toLocaleTimeString("en-Us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex justify-center items-center">
        <span className="loading loading-dots w-1/6"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5">
      {messages.map((msg, index) => {
        const isOwn = msg.senderId === authUser._id;

        return (
          <div key={msg._id || index} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-end space-x-3 max-w-[80%] ${
                isOwn ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >

              {/* Message Bubble */}
              <div
                className={`relative px-4 py-2 rounded-2xl text-sm leading-snug shadow-md  ${
                  isOwn
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.message && <p className="break-words">{msg.message}</p>}

                {msg.image && (
                  <div className="mt-2">
                    <img
                      src={msg.image}
                      alt="attached"
                      className="rounded-lg max-w-xs border border-gray-200 shadow-md"
                    />
                  </div>
                )}

                <span className="block mt-1 text-[10px] text-right italic text-gray-400">
                  {formatDate(msg.createdAt)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatContainer;
