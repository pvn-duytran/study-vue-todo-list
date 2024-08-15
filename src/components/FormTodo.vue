<script lang="ts" setup>
import AddTodoForm from "./AddTodoForm.vue";
import EditTodoForm from "./EditTodoForm.vue";
import FormContainer from "./FormContainer.vue";
import { useTodoStore } from "@/stores/TodoStore";

const TodoStore = useTodoStore();
</script>
<template>
  <FormContainer>
    <template v-slot:form-content>
      <EditTodoForm v-if="TodoStore.isEdit" />
      <AddTodoForm v-else />
    </template>
  </FormContainer>
</template>
