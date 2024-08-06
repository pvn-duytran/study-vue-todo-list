<script setup lang="ts">
import ActionTodo from './ActionTodo.vue';
import IconUnChecked from './Icon/IconUnChecked.vue';
import IconChecked from './Icon/IconChecked.vue';
import { ref } from 'vue';
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
  item: Item;
  i: number;
  max: number;
  handleUpdateItems: (updatedItems: Item[]) => void;
  checked: boolean;
  getDetail: (updatedItems: Item,index: number) => void;
  handleActivePopup: (updatedItem:boolean) => void
}>();


const item = ref(props.item);

const autoResize = (event: Event) => {
    const target = event.target as HTMLElement;
    const textarea = target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};
const handleChecked = async (i:number,id:string) => {
    let data = {
        name: props.items[i].name,
        completed: !props.items[i].completed,
        hide_description: props.items[i].hide_description,
        description: props.items[i].description,
        id: props.items[i].id
    }
    item.value = data
    try {
        await apiService.updateItem(props.items[i].id, data);
        const updatedItems = [...props.items];
        updatedItems.map(item => {
          if(item.id == id){
            item.completed = !item.completed
          }
        })
        props.handleUpdateItems(updatedItems)
    } catch {
        console.log("Error fetching data")
    }
}
const handleChangeHeading = (event: Event) =>{
    const target = event.target as HTMLElement;
    const dataId = target.getAttribute('data-id');
    try {
        apiService.updateItem(dataId,props.item)
    } catch {
        console.log("Error fetching data")
    }
}
const handleChangeDescription = (event: Event) =>{
    const target = event.target as HTMLElement;
    const dataId = target.getAttribute('data-id');
    try {
        apiService.updateItem(dataId,props.item)
    } catch {
        console.log("Error fetching data")
    }
}

</script>

<template>
  <li
    :data-index="i"
    class="flex items-center justify-between gap-[50px]"
  >
    <div class="flex items-center gap-[10px] justify-between w-full">
      <button @click="handleChecked(i,item.id)">
        <IconChecked 
          v-if="item.completed" 
          width="20px" 
          height="20px"
        />
        <IconUnChecked 
          v-else 
          width="20px" 
          height="20px" 
        />
      </button>
      <div class="grid w-full">
        <textarea 
          v-model="item.name"
          rows="1"
          placeholder="Title..."
          :class="[item.completed ? 'line-through overflow-hidden resize-none text-[18px]' : 'overflow-hidden resize-none text-[18px]']"
          :data-id="item.id"
          @input="autoResize" 
          @change="handleChangeHeading"
        />
        <textarea 
          v-if="item.hide_description" 
          v-model="item.description"
          rows="1"
          placeholder="Description..."
          :class="[item.completed ? 'line-through overflow-hidden resize-none' : 'overflow-hidden resize-none']" 
          :data-id="item.id"
          @input="autoResize" 
          @change="handleChangeDescription"
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
