<script setup lang="ts">
defineProps<{ id: string; args?: string[] }>();
</script>

<template>
  {{ args && args.length ? $t(id, args) : $t(id) }}
</template>
