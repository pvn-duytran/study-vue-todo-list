<script setup lang="ts">
import AddTodo from "@/components/AddTodo.vue";
import { apiService } from "@/apiService";
import router from "@/router";
import { useTodoStore } from "@/stores/TodoStore";
import { useNotification } from "@kyvg/vue3-notification";
import { ROUTES } from "@/config";

const { notify } = useNotification();
const TodoStore = useTodoStore();
type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
  user_id: string;
};
const handleAdd = async (data: Todo) => {
  try {
    await apiService.createItem(data);
    TodoStore.todos.push(data);
    notify({
      title: "Success",
      text: "Todo has been added",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  } finally {
    router.push(ROUTES.TODO);
  }
};
</script>
<template>
  <AddTodo @submit="handleAdd" />
</template>
