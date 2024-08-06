<script lang="ts" setup>
import IconEye from './Icon/IconEye.vue';
import IconPlus from './Icon/IconPlus.vue';
import IconEyeClose from './Icon/IconEyeClose.vue';
import { apiService } from '../apiService';

type Item =  {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string
};

const props = defineProps<{
    items: Item[];
    handleUpdateItems: (updatedItems: Item[]) => void;
    countCompleted: number;
    countTodo: number;
    checked: boolean;
    handleUpdateChecked: (updatedItems: boolean) => void
}>()

const handleCompleted = async () => {
    if (props.checked) {
        props.handleUpdateChecked(false);
        console.log(props.items)
    } else {
        props.handleUpdateChecked(true);
        console.log(props.items)
    }
}

const handleAdd = async () => {
    const lastID = (Number(props.items[props.items.length - 1].id) + 1).toString();
    const data = {
        name: '',
        completed: false,
        hide_description: false,
        description: '',
        id: lastID
    }
    const newData = [
        ...props.items,
        data
    ]
    props.handleUpdateItems(newData)
    try {
        apiService.createItem(data);
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
  <footer class="p-[20px_10px] flex justify-between items-center">
    <button
      class="flex items-center gap-[10px] rounded p-[5px_10px] transition-all hover:bg-gray-200"
      @click="handleCompleted"
    >
      <IconEye
        v-if="checked"
        width="20px"
        height="20px"
      />
      <IconEyeClose
        v-else
        width="20px"
        height="20px"
      />
      Completed {{ countCompleted }} of {{ countTodo }}
    </button>
    <button
      class="flex items-center gap-[10px] rounded p-[5px_10px] transition-all hover:bg-gray-200"
      @click="handleAdd"
    >
      <IconPlus
        width="15px"
        height="15px"
      />
      Add task
    </button>
  </footer>
</template>
