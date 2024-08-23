<script setup lang="ts">
import { useTodoStore } from "@/stores/TodoStore";
import { reactive } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { apiService } from "@/apiService";
import router from "@/router";
import { v4 as uuidv4 } from "uuid";
import ButtonField from "../../components/Button/ButtonField.vue";
import { ROUTES } from "@/config";
import TextField from "../../components/Input/TextField.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useForm } from "vee-validate";
import * as yup from "yup";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const { notify } = useNotification();
const TodoStore = useTodoStore();
const AuthStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().min(4).required(),
    description: yup.string().min(7).required(),
  }),
});
const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");

const formData = reactive<Todo>({
  id: uuidv4(),
  name: "",
  description: "",
  completed: false,
  hide_description: true,
});

const handleAdd = handleSubmit(async (values) => {
  const newData = values;
  const data = {
    ...formData,
    user_id: AuthStore.currentUser.uid,
    name: newData.name,
    description: newData.description,
  };
  try {
    await apiService.createItem(data);
    TodoStore.todos.push(data);
    notify({
      title: "Success",
      text: "Todo has been added",
      type: "success",
    });
  } catch (error) {
    console.log(error);
  } finally {
    router.push(ROUTES.TODO);
  }
});
</script>
<template>
  <div>
    <form @submit.prevent="handleAdd" class="p-5">
      <h2 class="text-xl font-bold text-center">ADD</h2>
      <div class="mb-4">
        <TextField
          v-bind="nameAttrs"
          v-model="name"
          label="Text"
          placeholder="Enter text..."
          class="!m-0"
        />
        <span class="text-[14px] italic text-[red]">{{ errors.name }}</span>
      </div>

      <div class="mb-4">
        <TextField
          label="Description"
          placeholder="Enter description..."
          class="!m-0"
          v-bind="descriptionAttrs"
          v-model="description"
          :multiline="true"
          :rows="2"
        />
        <span class="text-[14px] italic text-[red]">{{
          errors.description
        }}</span>
      </div>

      <div class="flex gap-3">
        <ButtonField
          class="w-full"
          size="medium"
          variant="contained"
          type="submit"
        >
          Submit
        </ButtonField>
        <ButtonField
          class="w-full"
          :to="`${ROUTES.HOME}`"
          size="medium"
          variant="outlined"
          >Cancel</ButtonField
        >
      </div>
    </form>
  </div>
</template>
