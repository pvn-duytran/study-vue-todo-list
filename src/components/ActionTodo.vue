<script setup lang="ts">
import { ref, watch } from "vue";
import IconDown from "./Icon/IconDown.vue";
import IconMenu from "./Icon/IconMenu.vue";
import IconUp from "./Icon/IconUp.vue";
import { useTodoStore } from "@/stores/TodoStore";
import IconEdit from "./Icon/IconEdit.vue";
import { ROUTES } from "@/config";
import ButtonField from "./Button/ButtonField.vue";
import { useDarkModeStore } from "@/stores/DarkModeStore";

const TodoStore = useTodoStore();
const darkModeStore = useDarkModeStore();
const max = ref<number>(TodoStore.countTodos - 1);
const props = defineProps<{
  id: string;
  index: number;
}>();
const handleDetails = () => {
  TodoStore.activePopup = true;
  TodoStore.getDetailTodo(props.id);
};

watch(
  () => TodoStore.filteredTodos,
  (newValue) => {
    max.value = newValue.length - 1;
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="flex items-center">
    <ButtonField
      size="small"
      variant="text"
      :disabled="index === 0"
      @click="TodoStore.moveUp(index)"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
    >
      <IconUp
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
    <ButtonField
      size="small"
      variant="text"
      :disabled="index == max"
      @click="TodoStore.moveDown(index)"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
    >
      <IconDown
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
    <ButtonField
      size="small"
      variant="text"
      @click="handleDetails"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
    >
      <IconMenu
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
    <ButtonField
      size="small"
      variant="text"
      :to="`${ROUTES.EDIT_TODO.replace(':id', id)}`"
      :class="{ 'hover:!bg-gray-600': darkModeStore.isDarkMode }"
    >
      <IconEdit
        width="15px"
        :class="{ 'fill-white': darkModeStore.isDarkMode }"
      />
    </ButtonField>
  </div>
</template>
