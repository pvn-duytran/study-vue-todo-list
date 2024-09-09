import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null as any,
    accessToken: "" as string,
    isLogin: false as boolean,
  }),
  actions: {
    checkLogin() {
      const savedToken = Cookies.get("accessToken");
      if (!!savedToken) {
        this.isLogin = true;
      }
    },
    async initializeAuth() {
      const savedToken = Cookies.get("accessToken");
      if (savedToken) {
        this.accessToken = savedToken;
        return new Promise((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              this.currentUser = user;
            }
            resolve(user);
          });
        });
      }
    },
  },
});
