<script setup lang="ts">
const http = useHttp();
const { data: dataTest } = await useAsyncData(() => http.get("https://http.cat/401"));
console.log(dataTest);
</script>

<template>
  <nuxt-welcome />
</template>

<style lang="scss" scoped></style>
