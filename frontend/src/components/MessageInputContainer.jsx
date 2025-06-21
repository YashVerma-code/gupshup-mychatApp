import { useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Camera, CircleX, Send, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInputContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    sendMessage,
    selectedUser,
  } = useMessageStore();
  const [message, setMessage] = useState("");
  const [sendingImage, setSendingImage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Img = reader.result;
        setSendingImage(base64Img);
        // console.log("Image : ", base64Img);
      };
      reader.readAsDataURL(file);
    } else return;
  };
  const handleSendingMessage = async (event) => {
    event.preventDefault();
    if (!message && !sendingImage) {
      toast.error("Nothing to send");
      return;
    }
    await sendMessage({
      id: selectedUser._id,
      data: { text: message, image: sendingImage },
    });
    setMessage("");
    setSendingImage("");
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 md:rounded-br-3xl rounded-b-3xl md:rounded-none  border-l">
      {sendingImage && (
        <div className="flex w-full items-center">
          <img
            src={sendingImage}
            alt="image"
            className="w-12 h-12 object-center border"
          />
          <button
            onClick={() => setSendingImage(null)}
            className="relative -top-5 right-2 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-red-100"
          >
            <span className="text-red-500 font-bold text-xs">
              <CircleX className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}

      {/* <div className="flex items-center space-x-3 border"> */}
      <form
        onSubmit={handleSendingMessage}
        className="flex items-center space-x-3"
      >
        <label className=" bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
          <Camera className="w-4 h-4" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write Something..."
            rows={1}
            className="w-full resize-none max-h-32 overflow-y-auto hide-scrollbar px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent pr-10"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          onClick={handleSendingMessage}
          type="submit"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};

export default MessageInputContainer;
