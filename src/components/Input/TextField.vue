<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
  label?: string;
  multiline?: boolean;
  error?: string;
  rows?: number;
  cols?: number;
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "contained";
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const defaultProps = {
  type: "text",
  variant: "outlined",
  size: "medium",
  multiline: false,
  rows: 4,
  cols: 50,
};

const componentType = computed(() => (props.multiline ? "textarea" : "input"));
const classes = computed(() => [
  "text-field-wrapper",
  `text-field-${props.size || defaultProps.size}`,
  props.multiline ? "textarea" : "",
  props.error ? "error" : "",
]);
</script>
<template>
  <div :class="classes">
    <label v-if="label">{{ label }}</label>
    <component
      :is="componentType"
      :type="!multiline ? type : undefined"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      :disabled="disabled"
      class="text-field"
      v-bind="multiline ? { rows, cols } : {}"
    ></component>
  </div>
</template>

<style scoped>
.text-field-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.text-field {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.text-field-wrapper label {
  font-size: 16px;
  display: inline-block;
  margin-bottom: 5px;
}
.text-field-small label {
  font-size: 12px;
}
.text-field-small .text-field {
  font-size: 12px;
  padding: 6px 12px;
}
.text-field-medium label {
  font-size: 14px;
}
.text-field-medium .text-field {
  font-size: 14px;
  padding: 10px 16px;
}
.text-field-large label {
  font-size: 16px;
}
.text-field-large .text-field {
  font-size: 16px;
  padding: 12px 20px;
}

.text-field:disabled {
  background-color: #f0f0f0;
}

.text-field.textarea {
  resize: vertical;
}
</style>
