<script setup lang="ts">
import IconClose from "./Icon/IconClose.vue";
import { useTodoStore } from "@/stores/TodoStore";

const TodoStore = useTodoStore();
</script>
<template>
  <div
    class="fixed inset-x-0 m-auto max-w-[400px] top-[100px] shadow-md z-10 bg-white"
  >
    <IconClose
      class="cursor-pointer absolute top-[10px] right-[10px]"
      width="15px"
      @click="TodoStore.activeForm = false"
    />
    <slot name="form-content"></slot>
  </div>
</template>
