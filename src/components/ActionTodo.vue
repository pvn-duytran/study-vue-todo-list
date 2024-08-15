<script setup lang="ts">
import { ref, watch } from "vue";
import IconDown from "./Icon/IconDown.vue";
import IconMenu from "./Icon/IconMenu.vue";
import IconUp from "./Icon/IconUp.vue";
import { useTodoStore } from "@/stores/TodoStore";
import IconEdit from "./Icon/IconEdit.vue";

const TodoStore = useTodoStore();
const styleButton = ref<string>(
  "cursor-pointer p-[10px] rounded-[5px] transition-all hover:bg-gray-200"
);
const max = ref<number>(TodoStore.countTodos - 1);
const props = defineProps<{
  id: string;
  index: number;
}>();
const handleDetails = () => {
  TodoStore.activePopup = !TodoStore.activePopup;
  TodoStore.activeForm = false;
  TodoStore.getDetailTodo(props.id);
};
const handleEdit = () => {
  TodoStore.activeForm = true;
  TodoStore.activePopup = false;
  TodoStore.isEdit = true;
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
    <button
      :class="[
        styleButton,
        index == 0 ? 'opacity-30 !cursor-not-allowed hover:bg-white' : '',
      ]"
      :data-index="index"
      @click="TodoStore.moveUp(index)"
    >
      <IconUp width="15px" />
    </button>
    <button
      :class="[
        styleButton,
        index == max ? 'opacity-30 !cursor-not-allowed hover:bg-white' : '',
      ]"
      :data-index="index"
      @click="TodoStore.moveDown(index)"
    >
      <IconDown width=" 15px" />
    </button>
    <button :class="styleButton" @click="handleDetails">
      <IconMenu width="15px" />
    </button>
    <button :class="styleButton" @click="handleEdit">
      <IconEdit width="15px" />
    </button>
  </div>
</template>
