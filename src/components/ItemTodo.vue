<script setup lang="ts">
import ActionTodo from "./ActionTodo.vue";
import IconUnChecked from "./Icon/IconUnChecked.vue";
import IconChecked from "./Icon/IconChecked.vue";
import { reactive } from "vue";
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
  i: number;
  max: number;
  handleUpdateItems: (updatedItems: Item[]) => void;
  checked: boolean;
  getDetail: (updatedItems: Item, index: number) => void;
  handleActivePopup: (updatedItem: boolean) => void;
}>();

const item = reactive(props.item);

const autoResize = (event: Event) => {
  const target = event.target as HTMLElement;
  const textarea = target;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};
const handleChecked = async () => {
  const data = {
    ...item,
    completed: !item.completed,
  };
  try {
    await apiService.updateItem(item.id, data);
    const updatedItems = [...props.items];
    updatedItems.map((Item) => {
      if (Item.id == item.id) {
        Item.completed = !Item.completed;
      }
    });
    props.handleUpdateItems(updatedItems);
  } catch {
    console.log("Error fetching data");
  }
};
const handleChange = (event: Event) => {
  const target = event.target as HTMLElement;
  const dataId = target.getAttribute("data-id");
  try {
    apiService.updateItem(dataId, item);
  } catch {
    console.log("Error fetching data");
  }
};
</script>

<template>
  <li :data-index="i" class="flex items-center justify-between gap-[50px]">
    <div class="flex items-center gap-[10px] justify-between w-full">
      <button @click="handleChecked">
        <IconChecked v-if="item.completed" width="20px" height="20px" />
        <IconUnChecked v-else width="20px" height="20px" />
      </button>
      <div class="grid w-full">
        <textarea
          v-model="item.name"
          rows="1"
          placeholder="Title..."
          :class="[
            item.completed
              ? 'line-through overflow-hidden resize-none text-[18px]'
              : 'overflow-hidden resize-none text-[18px]',
          ]"
          :data-id="item.id"
          @input="autoResize"
          @change="handleChange"
        />
        <textarea
          v-if="item.hide_description"
          v-model="item.description"
          rows="1"
          placeholder="Description..."
          :class="[
            item.completed
              ? 'line-through overflow-hidden resize-none'
              : 'overflow-hidden resize-none',
          ]"
          :data-id="item.id"
          @input="autoResize"
          @change="handleChange"
        />
      </div>
    </div>
    <ActionTodo
      :items="items"
      :index="i"
      :max="max"
      :item="item"
      :get-detail="getDetail"
      :handle-active-popup="handleActivePopup"
    />
  </li>
</template>
