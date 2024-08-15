<script setup lang="ts">
import ItemTodo from "./ItemTodo.vue";
import IconLoading from "./Icon/IconLoading.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { onMounted, ref, watch, computed } from "vue";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const TodoStore = useTodoStore();
const loading = ref<boolean>(true);
const todos = ref<Todo[]>([]);
onMounted(async () => {
  await TodoStore.getTodos();
  loading.value = false;
});

const filtersTodo = computed(() => TodoStore.filteredTodos);

watch(
  () => TodoStore.todos,
  (newValue) => {
    todos.value = newValue;
  },
  {
    deep: true,
  }
);
</script>

<template>
  <ul class="p-[20px] pr-[10px] border-y border-solid border-[#b6b5b5]">
    <li v-if="loading" class="text-center">
      <IconLoading width="30px" class="m-auto" />
    </li>
    <template v-else>
      <ItemTodo
        v-for="(todo, index) in filtersTodo"
        :todo="todo"
        :index="index"
        :id="todo.id"
        :key="todo.name"
      />
    </template>
  </ul>
</template>
