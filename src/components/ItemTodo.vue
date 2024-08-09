<script setup lang="ts">
import ActionTodo from "./ActionTodo.vue";
import IconUnChecked from "./Icon/IconUnChecked.vue";
import IconChecked from "./Icon/IconChecked.vue";
import { ref } from "vue";
import { useTodoStore } from "@/stores/TodoStore";

const TodoStore = useTodoStore();
type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};
const props = defineProps<{
  todo: Todo;
  id: string;
  index: number;
}>();

const todo = ref<Todo>(props.todo);
const handleChecked = () => {
  todo.value.completed = !todo.value.completed;
  const newData = {
    ...todo.value,
    completed: todo.value.completed,
  };
  TodoStore.updateTodo(todo.value.id, newData);
};
</script>

<template>
  <li class="flex items-center justify-between gap-[50px]">
    <div class="flex items-center gap-[10px] justify-between w-full">
      <button @click="handleChecked">
        <IconChecked v-if="todo.completed" width="20px" height="20px" />
        <IconUnChecked v-else width="20px" height="20px" />
      </button>
      <div class="grid w-full">{{ todo.name }}</div>
    </div>
    <ActionTodo :index="index" :id="id" />
  </li>
</template>
