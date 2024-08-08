<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { apiService } from "./apiService";
import Header from "./components/HeaderTodo.vue";
import Footer from "./components/FooterTodo.vue";
import ListTodo from "./components/ListTodo.vue";
import DetailTodo from "./components/DetailTodo.vue";

type Item = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const isActivePopup = ref<boolean>(false);
const detailsTodo = ref<Item>({} as Item);
const indexTodo = ref<number>(0);
const checked = ref<boolean>(false);
const items = ref<Item[]>([]);
const loading = ref<boolean>(true);
const countCompleted = ref<number>(0);
const countTodo = ref<number>(0);

async function fetchData() {
  try {
    const data = await apiService.getItems();
    items.value = data;
    countTodo.value = data.length;
    data.map((item: { completed: boolean }) =>
      item.completed ? countCompleted.value++ : ""
    );
  } catch {
    console.log("Error fetching data");
  } finally {
    loading.value = false;
  }
}
onMounted(fetchData);

const handleUpdateItems = (updatedItems: Item[]) => {
  items.value = updatedItems;
  countCompleted.value = 0;
  items.value.map((item: { completed: boolean }) =>
    item.completed ? countCompleted.value++ : ""
  );
  countTodo.value = items.value.length;
};
const handleUpdateChecked = (updatedItems: boolean) => {
  checked.value = updatedItems;
};
const getDetail = (updatedItems: Item, index?: number) => {
  detailsTodo.value = updatedItems;
  indexTodo.value = index;
};
const updateIndex = (index: number) => {
  indexTodo.value = index;
};
const handleActivePopup = (updatedItem: boolean) => {
  isActivePopup.value = updatedItem;
};
</script>

<template>
  <section class="flex justify-center items-center min-h-[100vh]">
    <div
      class="w-[700px] m-auto rounded-[5px] shadow-md border-t-[5px] border-solid border-black relative"
    >
      <Header />
      <ListTodo
        :handle-update-items="handleUpdateItems"
        :items="items"
        :loading="loading"
        :get-detail="getDetail"
        :checked="checked"
        :handle-active-popup="handleActivePopup"
      />
      <Footer
        :handle-update-items="handleUpdateItems"
        :items="items"
        :count-completed="countCompleted"
        :count-todo="countTodo"
        :checked="checked"
        :handle-update-checked="handleUpdateChecked"
      />
      <Teleport to="body">
        <DetailTodo
          :details-todo="detailsTodo"
          :items="items"
          :index="indexTodo"
          :handle-update-items="handleUpdateItems"
          :update-index="updateIndex"
          :get-detail="getDetail"
          :handle-active-popup="handleActivePopup"
          :is-active-popup="isActivePopup"
        />
      </Teleport>
    </div>
  </section>
</template>
