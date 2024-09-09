<script setup lang="ts">
import HeaderTodo from "./components/HeaderTodo.vue";
import DetailTodo from "./components/DetailTodo.vue";
import { useTodoStore } from "./stores/TodoStore";
import { useAuthStore } from "./stores/AuthStore";
import { Transition, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ROUTES } from "./config";

const TodoStore = useTodoStore();
const AuthStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  AuthStore.checkLogin();
  const fullPathname = window.location.pathname;
  if (!AuthStore.isLogin) {
    router.push(ROUTES.LOGIN);
  } else {
    if (fullPathname == "/login" || fullPathname == "/register")
      router.push(ROUTES.TODO);
  }
});
</script>

<template>
  <section class="flex justify-center items-center min-h-[100vh]">
    <div
      class="w-[700px] m-auto rounded-[5px] shadow-md border-t-[5px] border-solid border-black relative"
    >
      <Notifications position="top center" />
      <HeaderTodo />
      <router-view></router-view>
      <Transition>
        <DetailTodo v-if="TodoStore.activePopup" />
      </Transition>
    </div>
  </section>
</template>
