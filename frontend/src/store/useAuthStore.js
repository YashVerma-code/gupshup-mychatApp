import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "\";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: null,
  socket: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      console.log("Response: ", res);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  setIsUpdatingProfile: (value) => {
    set({ isUpdatingProfile: value });
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/api/auth/signup", data);
      // console.log("Response: ",res);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Registered Successfully!");
    } catch (error) {
      // console.log("Error while signing up : ",error);
      set({ authUser: null });
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Successfully logout!");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  UploadProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully ");
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.message || error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
      query: {
        userId: authUser._id,
      },
    });

    socket.on("connect", () => {
    //   console.log("🌐 Socket connected successfully:", socket.id);
      set({ socket: socket });
    });

    socket.on("connect_error", (error) => {
      console.error("🚨 Socket connection error:", error);
    });

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    console.log("🌐 Socket Disconnected");
  },
}));
