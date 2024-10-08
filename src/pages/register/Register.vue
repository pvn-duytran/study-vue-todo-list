<script setup lang="ts">
import ButtonField from "../../components/Button/ButtonField.vue";
import TextField from "../../components/Input/TextField.vue";
import { auth } from "@/firebaseConfig";
import { useAuthStore } from "@/stores/AuthStore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { useNotification } from "@kyvg/vue3-notification";
import { ROUTES } from "@/config";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import debounce from "lodash/debounce";

const { notify } = useNotification();
const AuthStore = useAuthStore();
const router = useRouter();

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
});
const {
  value: email,
  errorMessage: emailError,
  handleChange: handleEmailChange,
} = useField("email");
const {
  value: password,
  errorMessage: passwordError,
  handleChange: handlePasswordChange,
} = useField("password");

const debouncedHandleEmailChange = debounce(handleEmailChange, 1000);
const debouncedHandlePasswordChange = debounce(handlePasswordChange, 1000);
const handleRegister = handleSubmit(async (values) => {
  const formData = values;
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = data.user;
    AuthStore.currentUser = user;
    const token = await user.getIdToken();
    Cookies.set("accessToken", token, { expires: 1 });
    AuthStore.accessToken = token;
    AuthStore.isLogin = true;
    router.push(ROUTES.TODO);
  } catch (error) {
    notify({
      title: "Error",
      text: "Email already in use",
      type: "error",
    });
  }
});
</script>
<template>
  <div>
    <form @submit.prevent="handleRegister" class="p-5">
      <h2 class="text-xl font-bold text-center">REGISTER</h2>
      <div class="mb-4">
        <TextField
          label="Email"
          placeholder="Enter email..."
          type="email"
          class="!m-0"
          @input="debouncedHandleEmailChange"
        />
        <span class="text-[14px] italic text-[red]">{{ errors.email }}</span>
      </div>

      <div class="mb-4">
        <TextField
          label="Password"
          placeholder="Enter password..."
          type="password"
          class="!m-0"
          @input="debouncedHandlePasswordChange"
        />
        <span class="text-[14px] italic text-[red]">{{ errors.password }}</span>
      </div>

      <div class="flex gap-3">
        <ButtonField
          class="w-full"
          size="medium"
          variant="contained"
          type="submit"
        >
          Register
        </ButtonField>
        <ButtonField :to="`${ROUTES.LOGIN}`" class="w-full" variant="outlined"
          >Login</ButtonField
        >
      </div>
    </form>
  </div>
</template>
