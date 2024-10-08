<script setup lang="ts">
import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import ButtonField from "./Button/ButtonField.vue";
import { ROUTES } from "@/config";
import TextField from "./Input/TextField.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import debounce from "lodash/debounce";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
};

const AuthStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().min(4).required(),
    description: yup.string().min(7).required(),
  }),
});

const {
  value: name,
  errorMessage: nameError,
  handleChange: handleNameChange,
} = useField("name");
const {
  value: description,
  errorMessage: descriptionError,
  handleChange: handleDescriptionChange,
} = useField("description");

const debouncedHandleNameChange = debounce(handleNameChange, 1000);
const debouncedHandleDescriptionChange = debounce(
  handleDescriptionChange,
  1000
);
const formData = reactive<Todo>({
  id: uuidv4(),
  name: "",
  description: "",
  completed: false,
  hide_description: true,
});

const emit = defineEmits(["submit"]);
const handleAdd = handleSubmit(async (values) => {
  const newData = values;
  const data = {
    ...formData,
    user_id: AuthStore.currentUser.uid,
    name: newData.name,
    description: newData.description,
  };
  emit("submit", data);
});
</script>
<template>
  <div>
    <form @submit.prevent="handleAdd" class="p-5">
      <h2 class="text-xl font-bold text-center">ADD</h2>
      <div class="mb-4">
        <TextField
          v-model="formData.name"
          label="Text"
          placeholder="Enter text..."
          class="!m-0"
          @input="debouncedHandleNameChange"
        />
        <span class="text-[14px] italic text-[red]">{{ errors.name }}</span>
      </div>

      <div class="mb-4">
        <TextField
          label="Description"
          placeholder="Enter description..."
          class="!m-0"
          v-model="formData.description"
          :multiline="true"
          :rows="2"
          @input="debouncedHandleDescriptionChange"
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
          :to="`${ROUTES.TODO}`"
          size="medium"
          variant="outlined"
          >Cancel</ButtonField
        >
      </div>
    </form>
  </div>
</template>
