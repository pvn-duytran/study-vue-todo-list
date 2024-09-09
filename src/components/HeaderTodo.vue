<script setup lang="ts">
import ButtonField from "./Button/ButtonField.vue";
import IconLogout from "./Icon/IconLogout.vue";
import Cookie from "js-cookie";
import { useAuthStore } from "@/stores/AuthStore";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "vue-router";
import IconDarkMode from "./Icon/IconDarkMode.vue";
import { useDarkModeStore } from "@/stores/DarkModeStore";
import { ROUTES } from "@/config";

const AuthStore = useAuthStore();
const darkModeStore = useDarkModeStore();
const router = useRouter();
const handleLogout = async () => {
  try {
    await signOut(auth);
    AuthStore.currentUser = null;
    AuthStore.accessToken = "";
    Cookie.remove("accessToken");
    AuthStore.isLogin = false;
    router.push(ROUTES.LOGIN);
  } catch (e: any) {
    console.error("Error logging out:", e);
  }
};
const handleDarkMode = () => {
  darkModeStore.toggleDarkMode();
};
</script>

<template>
  <header
    class="bg-white flex justify-between items-center p-[20px] text-[26px] font-bold"
    :class="{ 'dark:bg-black text-white': darkModeStore.isDarkMode }"
    v-if="AuthStore.isLogin"
  >
    My checklist
    <div class="flex">
      <ButtonField
        variant="text"
        size="small"
        @click="handleLogout"
        :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
      >
        <IconLogout
          width="20px"
          :class="{ 'fill-white': darkModeStore.isDarkMode }"
        />
      </ButtonField>
      <ButtonField
        variant="text"
        size="small"
        @click="handleDarkMode"
        :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
      >
        <IconDarkMode
          width="25px"
          :class="{ 'fill-white': darkModeStore.isDarkMode }"
        />
      </ButtonField>
    </div>
  </header>
</template>
