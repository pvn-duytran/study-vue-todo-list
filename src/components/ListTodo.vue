<script setup lang="ts">
import ItemTodo from "./ItemTodo.vue";
import IconLoading from "./Icon/IconLoading.vue";
import { computed } from "vue";

type Item = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const props = defineProps<{
  items: Item[];
  loading: boolean;
  handleUpdateItems: (updatedItems: Item[]) => void;
  getDetail: (updatedItems: Item, index: number) => void;
  checked: boolean;
  handleActivePopup: (updatedItem: boolean) => void;
}>();

const filteredItems = computed(() => {
  if (props.checked) {
    const newData = props.items.filter((item) => !item.completed);
    return newData;
  }
  return props.items;
});
</script>

<template>
  <ul class="p-[20px] pr-[10px] border-y border-solid border-[#b6b5b5]">
    <li v-if="loading" class="text-center">
      <IconLoading width="30px" class="m-auto" />
    </li>
    <template v-else>
      <ItemTodo
        v-for="(item, i) in filteredItems"
        :key="item.id"
        :item="item"
        :i="i"
        :max="filteredItems.length"
        :items="items"
        :handle-update-items="handleUpdateItems"
        :get-detail="getDetail"
        :checked="checked"
        :handle-active-popup="handleActivePopup"
      />
    </template>
  </ul>
</template>
