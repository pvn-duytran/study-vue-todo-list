<script setup lang="ts">
import ItemTodo from "../../components/ItemTodo.vue";
import IconLoading from "../../components/Icon/IconLoading.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { useAuthStore } from "@/stores/AuthStore";
import { onMounted, ref, watch, computed } from "vue";
import { apiService } from "@/apiService";
import { useDarkModeStore } from "@/stores/DarkModeStore";
import { useRoute, useRouter } from "vue-router";
import IconDown from "@/components/Icon/IconDown.vue";
import IconUp from "@/components/Icon/IconUp.vue";
import ButtonField from "@/components/Button/ButtonField.vue";

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
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const todos = ref<Todo[]>([]);
const itemsPerPage = ref(4);
const currentPage = ref(Number(route.query.page) || 1);
const totalPages = ref(0);

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

const filtersTodo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  totalPages.value = Math.ceil(todos.value.length / itemsPerPage.value);
  if (TodoStore.filters) {
    return todos.value
      .slice(start, end)
      .filter((todo: Todo) => !todo.completed);
  }
  return todos.value.slice(start, end);
});

watch(
  () => TodoStore.todos || [],
  (newValue) => {
    todos.value = newValue;
  },
  {
    deep: true,
  }
);

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    router.push({ path: "/todos", query: { page } });
  }
};
watch(
  () => route.query.page,
  (newPage) => {
    console.log(currentPage.value);
    currentPage.value = Number(newPage) || 1;
  }
);
const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  console.log(pages);
  return pages;
});

let draggedItemIndex = null;

const onDragStart = (index: number) => {
  draggedItemIndex = index;
};
const onDrop = (index: number) => {
  console.log("onDrop", index);
  if (draggedItemIndex !== null && draggedItemIndex !== index) {
    const draggedItem = todos.value[draggedItemIndex];
    todos.value.splice(draggedItemIndex, 1);
    todos.value.splice(index, 0, draggedItem);
  }
  draggedItemIndex = null;
};
</script>

<template>
  <TransitionGroup
    name="fade"
    tag="ul"
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
          draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent
          @drop="onDrop(index)"
        />
      </template>
      <template v-else>
        <p :class="{ 'text-white': darkModeStore.isDarkMode }">
          There are no tasks for today yet.
        </p>
      </template>
    </template>
  </TransitionGroup>
  <div class="flex justify-center gap-2 mt-4 pagination">
    <ButtonField
      size="small"
      variant="text"
      :disabled="currentPage === 1"
      class="rotate-90"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
      @click="goToPage(currentPage - 1)"
    >
      <IconDown
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="goToPage(page)"
      :class="{ 'bg-black text-white': page === currentPage }"
      class="flex px-3 py-1 border border-solid"
    >
      {{ page }}
    </button>
    <ButtonField
      size="small"
      class="rotate-90"
      variant="text"
      :disabled="currentPage === totalPages"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
      @click="goToPage(currentPage + 1)"
    >
      <IconUp
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
  </div>
</template>
<style scoped>
li {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
