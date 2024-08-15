<script setup lang="ts">
import IconClose from "./Icon/IconClose.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { computed, reactive, watch, ref } from "vue";
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
const checkValueName = ref<boolean>(false);
const checkValueDescription = ref<boolean>(false);
const formData = reactive<Todo>({
  name: "",
  description: "",
  completed: false,
  hide_description: true,
  id: (TodoStore.todos.length + 1).toString(),
});
const isNameValid = computed(() => {
  if (formData.name.trim().length >= 3 && formData.name != " ") {
    return true;
  }
  return false;
});
const isDescriptionValid = computed(() => {
  if (formData.description.trim().length >= 8 && formData.description != " ") {
    return true;
  }
  return false;
});
const submitTodo = async () => {
  if (isNameValid.value && isDescriptionValid.value) {
    await TodoStore.createTodo(
      formData,
      "Todo added successfully!!",
      "success"
    );
  } else {
    checkValueName.value = false;
    checkValueDescription.value = false;
    notify({
      title: "Error",
      text: "Please enter the name and description.",
      type: "error",
      speed: 1000,
      duration: 2000,
    });
  }
};
watch(
  () => formData,
  (newValue) => {
    if (newValue.name.trim().length > 3 && newValue.name != " ") {
      checkValueName.value = true;
    }
    if (newValue.description.trim().length > 8 && newValue.description != " ") {
      checkValueDescription.value = true;
    }
  },
  {
    deep: true,
  }
);
</script>
<template>
  <form @submit.prevent="submitTodo" class="p-5">
    <h2 class="text-xl font-bold text-center">ADD</h2>
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
        :class="{
          'focus:ring-red-500 focus:border-red-500': !checkValueName,
          'focus:ring-black focus:border-black': checkValueName,
        }"
        placeholder="Enter text"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <textarea
        id="description"
        name="description"
        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        placeholder="Enter description"
        :class="{
          'focus:ring-red-500 focus:border-red-500': !checkValueDescription,
          'focus:ring-black focus:border-black': checkValueDescription,
        }"
        v-model="formData.description"
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
