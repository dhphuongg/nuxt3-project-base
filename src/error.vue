<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps<{ error: NuxtError }>();
console.error(error);
</script>

<template>
  <app-result :status="500" :description="error?.message" />
</template>

<style lang="scss" scoped></style>
