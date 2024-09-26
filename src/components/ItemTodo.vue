<script setup lang="ts">
import ActionTodo from "./ActionTodo.vue";
import IconUnChecked from "./Icon/IconUnChecked.vue";
import IconChecked from "./Icon/IconChecked.vue";
import { ref, watch } from "vue";
import { useDarkModeStore } from "@/stores/DarkModeStore";
import { apiService } from "@/apiService";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
const darkModeStore = useDarkModeStore();

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
  user_id: string;
};
const props = defineProps<{
  todo: Todo;
  id: string;
  index: number;
}>();

const todo = ref<Todo>(props.todo);
const handleChecked = async () => {
  todo.value.completed = !todo.value.completed;
  const newData = {
    ...todo.value,
    completed: todo.value.completed,
  };
  await apiService.updateItem(props.id, newData);
  notify({
    title: "Success",
    text: "Todo has been updated",
    type: "success",
  });
};

watch(
  () => props.todo,
  (newValue) => {
    todo.value = newValue;
  },
  {
    deep: true,
  }
);
</script>

<template>
  <li class="flex items-center justify-between gap-[50px] cursor-move">
    <div class="flex items-center gap-[10px] justify-between w-full">
      <button @click="handleChecked">
        <IconChecked
          v-if="todo.completed"
          width="20px"
          height="20px"
          :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
        />
        <IconUnChecked
          v-else
          width="20px"
          height="20px"
          :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
        />
      </button>
      <div
        class="grid w-full"
        :class="{ 'dark:text-white': darkModeStore.isDarkMode }"
      >
        {{ todo.name }}
        <p v-if="!todo.hide_description" class="text-sm">
          {{ todo.description }}
        </p>
      </div>
    </div>
    <ActionTodo :index="index" :id="id" />
  </li>
</template>
