<script setup lang="ts">
import EditTodo from "@/components/EditTodo.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import { apiService } from "@/apiService";
import router from "@/router";
import { ROUTES } from "@/config";

type Todo = {
  id: string;
  name?: string;
  completed?: boolean;
  hide_description?: boolean;
  description?: string;
};

const route = useRoute();
const id = route.params.id as string | undefined;
const { notify } = useNotification();

const handleEdit = async (data: Todo) => {
  await apiService.updateItem(id, data);
  notify({
    title: "Success",
    text: "Todo has been updated",
    type: "success",
  });
  router.push(ROUTES.TODO);
};
</script>
<template>
  <EditTodo @submit="handleEdit" />
</template>
