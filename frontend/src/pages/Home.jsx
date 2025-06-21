import React, { useEffect, useState } from "react";
import {
  Search,
  Heart,
  Bell,
  Paperclip,
  Camera,
  Smile,
  Send,
  Video,
  MessageCircle,
  FileText,
  Play,
  Music,
  Image,
  User,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import ChatContainer from "../components/ChatContainer";
import MessageInputContainer from "../components/MessageInputContainer";

const Home = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const {
    selectedUser,
    setSelectedUser,
    messages,
    getMessages,
    getUser,
    users,
    isUserLoading,subscribeToMessages,unsubscribeFromMessages
  } = useMessageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toCapitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function toTitleCase(str) {
    return str
      .split(" ")
      .map((word) => toCapitalize(word))
      .join(" ");
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages()
    }
    return ()=>unsubscribeFromMessages()
  }, [selectedUser]);
  // console.log("Online users : ",onlineUsers);
  return (
    <div className="w-5/6 mx-auto h-screen min-h-screen flex flex-wrap items-end pb-10">
      <div className="flex h-[88%] w-full shadow-2xl rounded-3xl">
        {/* Sidebar - Contact List */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block w-full lg:w-80 flex flex-col md:rounded-l-3xl md:rounded-none rounded-3xl border-l-accent border-l bg-white`}
        >
          {/* User Profile Header */}
          <div className="h-[80px] border-b border-gray-200 rounded-tl-3xl rounded-tr-xl flex align-middle">
            <div className="flex flex-wrap w-full items-center space-x-3">
              {authUser.profilePic ? (
                <img
                  className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold ml-2"
                  src={authUser.profilePic}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full ml-2">
                  <User className="text-white " />
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-semibold">
                  {authUser.fullName.toUpperCase()}
                </h3>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="h-[70%] overflow-y-scroll">
            {users.map((contact) => (
              <div
                key={contact._id}
                onClick={() => {
                  setSelectedUser(contact);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center p-4 hover:bg-accent rounded-sm hover:text-white cursor-pointer border-b ${
                  selectedUser?._id === contact?._id
                    ? "bg-accent border-r-2 border-r-blue-500"
                    : ""
                }`}
              >
                {contact.profilePic ? (
                  <img
                    className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold mr-3 "
                    src={contact.profilePic}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mr-3 ">
                    <User className="text-white " />
                  </div>
                )}

                <div className="flex-1 min-w-0 ">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">
                      {toTitleCase(contact.fullName)}
                    </h4>
                    {/* <span className="text-xs">time</span> */}
                  </div>
                  {onlineUsers.includes(contact._id) ? (
                    <p className="text-sm truncate mt-1 text-green-900 ">
                      Online
                    </p>
                  ) : (
                    ``
                  )}
                </div>
                {/* {contact.unread == 0 && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                    <span className="text-xs text-white">{contact.unread} Read</span>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        {selectedUser ? (
          <div
            className={`${
              isMobileMenuOpen ? "hidden" : "flex"
            } lg:flex flex-1 flex-col `}
          >
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:rounded-tr-3xl md:rounded-none  border-l rounded-t-3xl ">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className=" p-2 hover:bg-gray-100 rounded-lg lg:hidden block"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                {selectedUser.profilePic ? (
                  <img
                    className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold"
                    src={selectedUser.profilePic}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full ">
                    <User className="text-white " />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {toTitleCase(selectedUser.fullName)}
                  </h3>
                  {onlineUsers.includes(selectedUser._id) && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-500">Online</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                <Bell className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              </div>
            </div>

            {/* Messages Area */}
            <ChatContainer />

            {/* Message Input */}
            <MessageInputContainer />
          </div>
        ) : (
          <div
            className={`${
              isMobileMenuOpen ? "hidden rounded-3xl" : "flex"
            } flex-1 w-full lg:flex flex-wrap flex-col items-center justify-center bg-white sm:rounded-r-3xl border-l border-gray-200 rounded-3xl lg:rounded-l-none`}
          >
            {!isMobileMenuOpen && (
              <div className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between md:rounded-tr-3xl border-l rounded-3xl lg:rounded-l-none">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className=" p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 flex-wrap justify-center items-center flex">
              <div className="text-center p-4 h-1/2">
                <img
                  src="/chatIcon.gif"
                  alt="Start Chatting"
                  className="mx-auto  mb-6"
                />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Select a conversation
                </h2>
                <p className="text-gray-500">
                  Choose a contact from the sidebar to start messaging. Your
                  chats will appear here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
