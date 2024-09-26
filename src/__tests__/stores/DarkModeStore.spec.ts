import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useDarkModeStore } from "@/stores/DarkModeStore";

describe("DarkModeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("initial state is correct", () => {
    const darkModeStore = useDarkModeStore();
    expect(darkModeStore.isDarkMode).toBe(false);
  });

  it("toggleDarkMode toggles the isDarkMode state and updates localStorage", () => {
    const darkModeStore = useDarkModeStore();
    darkModeStore.toggleDarkMode();
    expect(darkModeStore.isDarkMode).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("true");

    darkModeStore.toggleDarkMode();
    expect(darkModeStore.isDarkMode).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("false");
  });

  it("loadDarkMode loads the isDarkMode state from localStorage", () => {
    localStorage.setItem("darkMode", "true");
    const darkModeStore = useDarkModeStore();
    darkModeStore.loadDarkMode();
    expect(darkModeStore.isDarkMode).toBe(true);

    localStorage.setItem("darkMode", "false");
    darkModeStore.loadDarkMode();
    expect(darkModeStore.isDarkMode).toBe(false);
  });
});
