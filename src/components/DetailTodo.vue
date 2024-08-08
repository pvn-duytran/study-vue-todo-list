<script setup lang="ts">
import { apiService } from "../apiService";
import IconClose from "./Icon/IconClose.vue";
import { ref } from "vue";

type Item = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const props = defineProps<{
  detailsTodo: Item;
  items: Item[];
  index: number | undefined;
  handleUpdateItems: (updatedItems: object) => void;
  updateIndex: (index: number) => void;
  getDetail: (updatedItems: Item, index?: number | undefined) => void;
  handleActivePopup: (updatedItem: boolean) => void;
  isActivePopup: boolean;
}>();

const customStyle = ref<string>(
  "cursor-pointer p-[20px] transition-all hover:bg-gray-200"
);

const handleClose = () => {
  props.handleActivePopup(false);
};
const handleMoveUp = (index: number) => {
  if (index > 0) {
    [props.items[index], props.items[index - 1]] = [
      props.items[index - 1],
      props.items[index],
    ];
    props.updateIndex(index - 1);
    props.handleUpdateItems(props.items);
  }
};
const handleMoveDown = (index: number) => {
  if (index < props.items.length - 1) {
    [props.items[index], props.items[index + 1]] = [
      props.items[index + 1],
      props.items[index],
    ];
    props.updateIndex(index + 1);
    props.handleUpdateItems(props.items);
  }
};
const handleDelete = async (id: string) => {
  const newData = props.items.filter((item) => item.id != id);
  props.handleUpdateItems(newData);
  props.handleActivePopup(false);
  try {
    await apiService.deleteItem(id);
  } catch {
    console.log("Error fetching data");
  }
};
const handleDescription = (id: string) => {
  const newData = props.items.filter((item) => {
    if (item.id == id) {
      item.hide_description = !item.hide_description;
      props.getDetail(item);
      try {
        apiService.updateItem(item.id, item);
      } catch {
        console.log("Error fetching data");
      }
    }
    return props.items;
  });
  props.handleUpdateItems(newData);
};
const handleDuplicate = async () => {
  const lastID = (
    Number(props.items[props.items.length - 1].id) + 1
  ).toString();
  const newData = {
    ...props.detailsTodo,
    id: lastID,
  };
  try {
    apiService.createItem(newData);
  } catch {
    console.log("Error fetching data");
  }
  props.handleUpdateItems([...props.items, newData]);
};
</script>

<template>
  <div
    v-if="isActivePopup"
    class="fixed inset-x-0 m-auto max-w-[400px] top-[100px] shadow-md z-10 bg-white"
  >
    <div class="flex items-center p-[20px] justify-between">
      <h3>Task: {{ detailsTodo.name }}</h3>
      <IconClose class="cursor-pointer" width="15px" @click="handleClose" />
    </div>
    <ul class="border-y border-solid border-[#b6b5b5]">
      <li
        :class="[
          customStyle,
          index == 0 ? 'opacity-30 !cursor-not-allowed hover:bg-white' : '',
        ]"
        @click="handleMoveUp(index)"
      >
        Move up
      </li>
      <li
        :class="[
          customStyle,
          index == items.length - 1
            ? 'opacity-30 !cursor-not-allowed hover:bg-white'
            : '',
        ]"
        @click="handleMoveDown(index)"
      >
        Move down
      </li>
      <li :class="customStyle" @click="handleDescription(detailsTodo.id)">
        <template v-if="detailsTodo.hide_description">
          Hide description
        </template>
        <template v-else> Show description </template>
      </li>
      <li :class="customStyle" @click="handleDuplicate">Duplicate</li>
    </ul>
    <div class="flex items-center p-[20px] justify-between">
      <h3
        class="text-red-600 cursor-pointer"
        @click="handleDelete(detailsTodo.id)"
      >
        Delete Task
      </h3>
    </div>
  </div>
</template>
