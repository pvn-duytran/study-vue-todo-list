<script setup lang="ts">
import IconClose from "./Icon/IconClose.vue";
import { ref, watch } from "vue";
import { useTodoStore } from "@/stores/TodoStore";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const TodoStore = useTodoStore();
const detailTodo = ref<Todo>(TodoStore.detailsTodo);
const customStyle = ref<string>(
  "cursor-pointer p-[20px] transition-all hover:bg-gray-200"
);
watch(
  () => TodoStore.detailsTodo,
  (newValue) => {
    detailTodo.value = newValue;
  }
);
const handleDelete = () => {
  TodoStore.deleteTodo(detailTodo.value.id);
  TodoStore.activePopup = false;
};
const handleClose = () => {
  TodoStore.activePopup = false;
};
const handleMoveUp = () => {
  TodoStore.moveUp(TodoStore.detailsIndex);
};
const handleMoveDown = () => {
  TodoStore.moveDown(TodoStore.detailsIndex);
};
watch(
  () => TodoStore.filtersTodo,
  (newValue) => {
    newValue.find((todo: Todo, index: number) => {
      if (todo.id == detailTodo.value.id) {
        TodoStore.detailsIndex = index;
      }
    });
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div
    class="fixed inset-x-0 m-auto max-w-[400px] top-[100px] shadow-md z-10 bg-white"
  >
    <div class="flex items-center p-[20px] justify-between">
      <h3>Task: {{ detailTodo.name }}</h3>
      <IconClose @click="handleClose" class="cursor-pointer" width="15px" />
    </div>
    <ul class="border-y border-solid border-[#b6b5b5]">
      <li
        :class="[
          customStyle,
          TodoStore.detailsIndex == 0
            ? 'opacity-30 !cursor-not-allowed hover:bg-white'
            : '',
        ]"
        @click="handleMoveUp"
      >
        Move up
      </li>
      <li
        :class="[
          customStyle,
          TodoStore.detailsIndex == TodoStore.countTodos - 1
            ? 'opacity-30 !cursor-not-allowed hover:bg-white'
            : '',
        ]"
        @click="handleMoveDown"
      >
        Move Down
      </li>
      <li :class="customStyle">Show description</li>
      <li :class="customStyle">Duplicate</li>
    </ul>
    <div class="flex items-center p-[20px] justify-between">
      <h3 class="text-red-600 cursor-pointer" @click="handleDelete">
        Delete Task
      </h3>
    </div>
  </div>
</template>
