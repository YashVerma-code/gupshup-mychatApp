import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUserLoading: false,
  isMessagesLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/api/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error of getUser : ", error.message);
      toast.error(error.AxiosError.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (id) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/api/messages/${id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getting messages : ".error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async ({ id, data }) => {
    try {
      const res = await axiosInstance.post(`/api/messages/send/${id}`, data);
      toast.success("Message send");
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (error) {
      console.log("Error of sendMessage : ", error);
      toast.error(error.response.data.message || error.message);
    }
  },
   subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      console.log(`Real time message : ${newMessage}`)
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
