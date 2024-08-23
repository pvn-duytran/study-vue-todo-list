<script setup lang="ts">
import TextField from "./Input/TextField.vue";
import { onMounted, ref, reactive } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import { apiService } from "@/apiService";
import router from "@/router";
import ButtonField from "./Button/ButtonField.vue";
import { ROUTES } from "@/config";
import { useForm } from "vee-validate";
import * as yup from "yup";

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
const formData = ref<Todo>({} as Todo);
const { errors, handleSubmit, defineField, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().min(4).required(),
    description: yup.string().min(7).required(),
  }),
});
const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");

onMounted(async () => {
  const data = await apiService.getItem(id);
  formData.value = data;
  setValues({
    name: formData.value.name,
    description: formData.value.description,
  });
});
const handleEdit = handleSubmit(async (values) => {
  const newData = values;
  const data = {
    ...formData.value,
    name: newData.name,
    description: newData.description,
  };
  await apiService.updateItem(id, data);
  notify({
    title: "Success",
    text: "Todo has been updated",
    type: "success",
  });
  router.push(ROUTES.TODO);
});
</script>
<template>
  <div class="">
    <form @submit.prevent="handleEdit" class="p-5">
      <h2 class="text-xl font-bold text-center">EDIT</h2>
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
        >
          Cancel
        </ButtonField>
      </div>
    </form>
  </div>
</template>
