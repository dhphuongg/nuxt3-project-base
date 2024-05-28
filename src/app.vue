<script setup lang="ts">
import { app } from "./constants";
import { LocalKey } from "./languages";

const { locale } = useI18n();
useHead({ titleTemplate: `%s ● ${app.name}` });
</script>

<template>
  <Html :lang="locale">
    <Head>
      <Meta property="og:title" :content="app.name" />
      <Meta property="og:site:name" :content="app.name" />
      <Meta property="og:description" :content="$t(LocalKey.app.description)" />
      <Meta name="description" :content="$t(LocalKey.app.description)" />
      <Meta name="google" content="notranslate" />
      <Link rel="icon" href="/favicon.ico" />
    </Head>
    <Body>
      <NuxtLoadingIndicator :color="app.theme.primary" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss">
body {
  @apply dark:bg-black dark:text-white duration-300;
}
</style>
