import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as Cookies from "js-cookie";
import { onAuthStateChanged } from "firebase/auth";

vi.mock("js-cookie", async () => {
  const originalModule = await vi.importActual<typeof import("js-cookie")>(
    "js-cookie"
  );
  return {
    ...originalModule,
    default: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  };
});

vi.mock("firebase/auth", async () => {
  const originalModule = await vi.importActual<typeof import("firebase/auth")>(
    "firebase/auth"
  );

  return {
    ...originalModule,
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn(),
  };
});

describe("AuthStore - State", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("has the correct initial state", () => {
    const authStore = useAuthStore();

    expect(authStore.currentUser).toBe(null);
    expect(authStore.accessToken).toBe("");
    expect(authStore.isLogin).toBe(false);
  });
});

describe("AuthStore - Actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("checkLogin sets isLogin to true if accessToken is present", () => {
    const authStore = useAuthStore();
    (Cookies.default.get as vi.Mock).mockReturnValue("accessToken");
    authStore.checkLogin();
    expect(authStore.isLogin).toBe(true);
  });

  it("checkLogin does not set isLogin if accessToken is absent", () => {
    const authStore = useAuthStore();
    (Cookies.default.get as vi.Mock).mockReturnValue(undefined);
    authStore.checkLogin();
    expect(authStore.isLogin).toBe(false);
  });

  it("sets accessToken and currentUser if accessToken is present in cookies", async () => {
    const authStore = useAuthStore();
    (Cookies.default.get as vi.Mock).mockReturnValue("accessToken");
    const mockUser = { uid: "12345" };
    (onAuthStateChanged as vi.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
    });

    await authStore.initializeAuth();

    expect(authStore.accessToken).toBe("accessToken");
    expect(authStore.currentUser).toEqual(mockUser);
  });

  it("does nothing if accessToken is not present in cookies", async () => {
    const authStore = useAuthStore();
    (Cookies.default.get as vi.Mock).mockReturnValue(undefined);

    await authStore.initializeAuth();

    expect(authStore.accessToken).toBe("");
    expect(authStore.currentUser).toBe(null);
  });
});
