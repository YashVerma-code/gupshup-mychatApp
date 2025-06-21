import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (data) => {
    localStorage.setItem("chat-theme",data);
    set({ theme: data });
  },
}));
