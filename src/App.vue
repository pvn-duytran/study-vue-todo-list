<script setup lang="ts">
import Header from "./components/HeaderTodo.vue";
import Footer from "./components/FooterTodo.vue";
import ListTodo from "./components/ListTodo.vue";
import DetailTodo from "./components/DetailTodo.vue";
import { useTodoStore } from "./stores/TodoStore";
const TodoStore = useTodoStore();
</script>

<template>
  <section class="flex justify-center items-center min-h-[100vh]">
    <div
      class="w-[700px] m-auto rounded-[5px] shadow-md border-t-[5px] border-solid border-black relative"
    >
      <Header />
      <ListTodo />
      <Footer />
      <Teleport to="body">
        <DetailTodo v-if="TodoStore.activePopup" />
      </Teleport>
    </div>
  </section>
</template>
