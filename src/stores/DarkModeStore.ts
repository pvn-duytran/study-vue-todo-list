import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
    },
    loadDarkMode() {
      this.isDarkMode = localStorage.getItem("darkMode") === "true";
    },
  },
});
