<script lang="ts" setup>
import IconEye from "./Icon/IconEye.vue";
import IconPlus from "./Icon/IconPlus.vue";
import IconEyeClose from "./Icon/IconEyeClose.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { useDarkModeStore } from "@/stores/DarkModeStore";
import { ROUTES } from "@/config";
import ButtonField from "./Button/ButtonField.vue";

const TodoStore = useTodoStore();
const darkModeStore = useDarkModeStore();
const toggleFilters = () => {
  TodoStore.filters = !TodoStore.filters;
};
</script>

<template>
  <footer
    class="p-[20px_10px] flex justify-between items-center"
    :class="{ 'dark:bg-black text-white': darkModeStore.isDarkMode }"
  >
    <ButtonField
      class="flex items-center gap-2"
      size="medium"
      variant="text"
      @click="toggleFilters"
      :class="{
        'dark:!text-white hover:!bg-gray-600': darkModeStore.isDarkMode,
      }"
    >
      <IconEye
        v-if="TodoStore.filters"
        width="20px"
        height="20px"
        :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
      />
      <IconEyeClose
        v-else
        width="20px"
        height="20px"
        :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
      />
      Completed {{ TodoStore.countCompleted }} of {{ TodoStore.todos.length }}
    </ButtonField>
    <ButtonField
      class="flex items-center gap-2"
      size="medium"
      variant="text"
      :to="`${ROUTES.ADD_TODO}`"
      :class="{
        'dark:!text-white hover:!bg-gray-600': darkModeStore.isDarkMode,
      }"
    >
      <IconPlus
        width="15px"
        height="15px"
        :class="{ 'dark:fill-white': darkModeStore.isDarkMode }"
      />
      Add task
    </ButtonField>
  </footer>
</template>
