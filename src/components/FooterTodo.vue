<script lang="ts" setup>
import IconEye from "./Icon/IconEye.vue";
import IconPlus from "./Icon/IconPlus.vue";
import IconEyeClose from "./Icon/IconEyeClose.vue";
import { useTodoStore } from "@/stores/TodoStore";

const TodoStore = useTodoStore();
const toggleFilters = () => {
  TodoStore.filters = !TodoStore.filters;
  TodoStore.filtersTodos();
};
const handleActiveForm = () => {
  TodoStore.activeForm = !TodoStore.activeForm;
  TodoStore.activePopup = false;
};
</script>

<template>
  <footer class="p-[20px_10px] flex justify-between items-center">
    <button
      class="flex items-center gap-[10px] rounded p-[5px_10px] transition-all hover:bg-gray-200"
      @click="toggleFilters"
    >
      <IconEye v-if="TodoStore.filters" width="20px" height="20px" />
      <IconEyeClose v-else width="20px" height="20px" />
      Completed {{ TodoStore.countCompleted }} of {{ TodoStore.countTodos }}
    </button>
    <button
      class="flex items-center gap-[10px] rounded p-[5px_10px] transition-all hover:bg-gray-200"
      @click="handleActiveForm"
    >
      <IconPlus width="15px" height="15px" />
      Add task
    </button>
  </footer>
</template>
