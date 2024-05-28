<script setup lang="ts">
import { pages } from "~/constants/pages.constant";
import { LocalKey } from "~/languages";

definePageMeta({
  path: pages["not-found"].path,
  name: pages["not-found"].name
});
const i18n = useI18n();
useSeoMeta({ title: i18n.t(LocalKey.error.notFound) });
</script>

<template>
  <app-result :status="404" />
</template>
