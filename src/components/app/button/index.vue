<script setup lang="ts">
import type { ButtonVariant, IconPlacement } from "./type";

withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    disabled?: boolean;
    round?: boolean;
    loading?: boolean;
    iconPlacement?: IconPlacement;
  }>(),
  { variant: "solid", round: false, loading: false, iconPlacement: "left" }
);
</script>

<template>
  <button
    class="app-button"
    :class="[`app-button-${variant} icon-${iconPlacement}`]"
    :disabled="disabled"
  >
    <icon v-if="loading" class="icon-loading" name="svg-spinners:180-ring" size="20" />

    <slot v-else name="icon"></slot>

    <slot>Click me</slot>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  @apply px-5 py-2.5 text-center leading-[1] flex gap-2 justify-center items-center cursor-pointer disabled:cursor-not-allowed rounded-md duration-300;
  &-solid {
    @apply bg-primary-500 hover:bg-primary-600 text-white;
  }
  &-outline {
    @apply text-primary-500 border border-primary-500 hover:bg-primary-500/10;
    .loading {
      @apply text-primary-500;
    }
  }
  &-soft {
    @apply text-primary-500 bg-primary-500/10 hover:bg-primary-500/20 border hover:border-primary-500;
    .loading {
      @apply text-primary-500;
    }
  }
  &.icon-right {
    @apply flex-row-reverse;
  }
}
</style>
