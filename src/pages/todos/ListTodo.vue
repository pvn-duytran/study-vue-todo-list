<script setup lang="ts">
import ItemTodo from "../../components/ItemTodo.vue";
import IconLoading from "../../components/Icon/IconLoading.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { useAuthStore } from "@/stores/AuthStore";
import { onMounted, ref, watch, computed } from "vue";
import { apiService } from "@/apiService";
import { useDarkModeStore } from "@/stores/DarkModeStore";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
  user_id: string;
};

const TodoStore = useTodoStore();
const darkModeStore = useDarkModeStore();
const loading = ref<boolean>(true);
const todos = ref<Todo[]>([]);
onMounted(async () => {
  const AuthStore = useAuthStore();
  await AuthStore.initializeAuth();
  try {
    const data = await apiService.getItemsByUserUID(AuthStore.currentUser.uid);
    TodoStore.todos = data;
  } catch (error) {
  } finally {
    loading.value = false;
  }
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
  <ul
    class="p-[20px] pr-[10px] border-y border-solid border-[#b6b5b5] grid gap-2"
    :class="{ 'dark:bg-black': darkModeStore.isDarkMode }"
  >
    <li v-if="loading" class="text-center">
      <IconLoading
        width="30px"
        class="m-auto fill-black"
        :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
      />
    </li>
    <template v-else>
      <template v-if="todos.length > 0">
        <ItemTodo
          v-for="(todo, index) in filtersTodo"
          :todo="todo"
          :index="index"
          :id="todo.id"
          :key="todo.name"
        />
      </template>
      <template v-else>
        <p :class="{ 'text-white': darkModeStore.isDarkMode }">
          There are no tasks for today yet.
        </p>
      </template>
    </template>
  </ul>
</template>
