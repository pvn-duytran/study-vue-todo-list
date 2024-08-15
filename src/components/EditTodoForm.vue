<script setup lang="ts">
import IconClose from "./Icon/IconClose.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { computed, reactive, watch, ref, onMounted } from "vue";
import { useNotification } from "@kyvg/vue3-notification";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const { notify } = useNotification();
const TodoStore = useTodoStore();

const formData = reactive<Todo>({
  id: TodoStore.detailsTodo.id,
  name: TodoStore.detailsTodo.name,
  completed: TodoStore.detailsTodo.completed,
  hide_description: TodoStore.detailsTodo.hide_description,
  description: TodoStore.detailsTodo.description,
});

const handleEdit = async () => {
  try {
    const data = await TodoStore.updateTodo(formData.id, formData);
    TodoStore.todos = TodoStore.todos.map((todo) =>
      todo.id === data.id ? data : todo
    );
  } catch (error) {
  } finally {
    notify({
      title: "Success",
      text: "Todo updated successfully",
      type: "success",
      speed: 1000,
      duration: 2000,
    });
    TodoStore.activeForm = false;
  }
};
</script>
<template>
  <form @submit.prevent="handleEdit" class="p-5">
    <h2 class="text-xl font-bold text-center">EDIT</h2>
    <div class="mb-4">
      <label for="text" class="block text-sm font-medium text-gray-700"
        >Text</label
      >
      <input
        type="text"
        id="text"
        name="text"
        v-model="formData.name"
        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
        placeholder="Enter text"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <textarea
        v-model="formData.description"
        id="description"
        name="description"
        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        placeholder="Enter description"
      ></textarea>
    </div>

    <div>
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-black rounded-md"
      >
        Submit
      </button>
    </div>
  </form>
</template>
