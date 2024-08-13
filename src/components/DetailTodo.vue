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
watch(
  () => TodoStore.todos,
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
const handleDelete = () => {
  TodoStore.deleteTodo(detailTodo.value.id);
  TodoStore.activePopup = false;
};

const handleMoveUp = () => {
  TodoStore.moveUp(TodoStore.detailsIndex);
};
const handleMoveDown = () => {
  TodoStore.moveDown(TodoStore.detailsIndex);
};
const handleDescription = () => {
  detailTodo.value.hide_description = !detailTodo.value.hide_description;
  TodoStore.updateTodo(detailTodo.value.id, detailTodo.value);
};
const handleDuplicate = async () => {
  const newData = {
    ...detailTodo.value,
    id: (TodoStore.todos.length + 1).toString(),
  };
  await TodoStore.createTodo(
    newData,
    "Todo duplicated successfully!!",
    "success"
  );
};
</script>

<template>
  <div
    class="fixed inset-x-0 m-auto max-w-[400px] top-[100px] shadow-md z-10 bg-white"
  >
    <div class="flex items-center p-[20px] justify-between">
      <h3>Task: {{ detailTodo.name }}</h3>
      <IconClose
        @click="TodoStore.activePopup = false"
        class="cursor-pointer"
        width="15px"
      />
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
      <li :class="customStyle" @click="handleDescription">
        <template v-if="detailTodo.hide_description">
          Show description
        </template>
        <template v-else> Hide description </template>
      </li>
      <li :class="customStyle" @click="handleDuplicate">Duplicate</li>
    </ul>
    <div class="flex items-center p-[20px] justify-between">
      <h3 class="text-red-600 cursor-pointer" @click="handleDelete">
        Delete Task
      </h3>
    </div>
  </div>
</template>
