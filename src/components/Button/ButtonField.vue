<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  variant?: "text" | "contained" | "outlined";
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  to?: string;
}>();

const defaultProps = {
  variant: "contained",
  type: "button",
  size: "medium",
  disabled: false,
};

const componentType = computed(() => (props.to ? RouterLink : "button"));

const buttonClass = computed(() => [
  `btn-${props.variant || defaultProps.variant}`,
  `btn-${props.size || defaultProps.size}`,
  { "btn-disabled": props.disabled },
]);
</script>

<template>
  <Component
    class="btn"
    :is="componentType"
    :class="buttonClass"
    :to="to"
    :type="!to ? type : undefined"
  >
    <slot />
  </Component>
</template>

<style scoped>
.btn {
  border-radius: 0.25rem;
  text-align: center;
}
.btn-text {
  background: none;
  border: none;
  color: #333;
  padding: 5px 10px;
}
.btn-text:hover {
  background-color: rgb(229 231 235 / 1);
}
.btn-contained {
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
}

.btn-outlined {
  background: none;
  color: #333;
  border: 1px solid #333;
  padding: 0.5rem 1rem;
}

.btn-small {
  font-size: 12px;
  padding: 4px 8px;
}

.btn-medium {
  font-size: 14px;
  padding: 8px 16px;
}

.btn-large {
  font-size: 16px;
  padding: 12px 24px;
}

.btn-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
