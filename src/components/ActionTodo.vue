<script setup lang="ts">
import { ref } from "vue";
import IconDown from "./Icon/IconDown.vue";
import IconMenu from "./Icon/IconMenu.vue";
import IconUp from "./Icon/IconUp.vue";
import { apiService } from "../apiService";

type Item = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const props = defineProps<{
  items: Item[];
  item: Item;
  index: number;
  max: number;
  getDetail: (updatedItems: Item, index: number) => void;
  handleActivePopup: (updatedItem: boolean) => void;
}>();

const styleButton = ref<string>(
  "cursor-pointer p-[10px] rounded-[5px] transition-all hover:bg-gray-200"
);

const handleMoveDown = (index: number) => {
  if (index != props.max) {
    [props.items[index], props.items[index + 1]] = [
      props.items[index + 1],
      props.items[index],
    ];
  }
};
const handleMoveUp = (index: number) => {
  if (index != 0) {
    [props.items[index], props.items[index - 1]] = [
      props.items[index - 1],
      props.items[index],
    ];
  }
};
const handleDetail = async (id: string, index: number) => {
  try {
    const data = await apiService.getItem(id);
    props.getDetail(data, index);
  } catch (error) {
    console.log(error);
  } finally {
    props.handleActivePopup(true);
  }
};
</script>

<template>
  <div class="flex items-center">
    <button
      :class="[
        styleButton,
        index == 0 ? 'opacity-30 !cursor-not-allowed hover:bg-white' : '',
      ]"
      :disabled="index == 0"
      @click="handleMoveUp(index)"
    >
      <IconUp width="15px" />
    </button>
    <button
      :class="[
        styleButton,
        index == max - 1 ? 'opacity-30 !cursor-not-allowed hover:bg-white' : '',
      ]"
      :disabled="index == max - 1"
      @click="handleMoveDown(index)"
    >
      <IconDown width=" 15px" />
    </button>
    <button :class="styleButton" @click="handleDetail(item.id, index)">
      <IconMenu width="15px" />
    </button>
  </div>
</template>
