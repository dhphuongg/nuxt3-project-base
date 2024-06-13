<script setup lang="ts">
import { LocalKey } from "~/languages";
import type { ResultStatus } from "./type";
import { pages } from "~/constants/pages.constant";

withDefaults(
  defineProps<{
    status?: ResultStatus;
    title?: string;
    description?: string;
  }>(),
  { status: 500 }
);
</script>

<template>
  <div class="result-container">
    <div class="app-result">
      <div class="app-result-image">
        <app-result-404 v-if="status === 404" />
        <app-result-500 v-if="status === 500" />
      </div>
      <p class="title">
        <app-formatted-message v-if="!title && status === 404" :id="LocalKey.error.pageNotFound" />
        <app-formatted-message v-else-if="!title || status === 500" :id="LocalKey.error.wrong" />
        <span v-else>{{ title }}</span>
      </p>
      <p v-if="description" class="description">{{ description }}</p>
      <slot name="footer">
        <div class="flex gap-4">
          <app-button variant="outline" @click="$router.back()">
            <app-formatted-message :id="LocalKey.common.back" />
          </app-button>
          <app-button @click="navigateTo(pages.home.path)">
            <app-formatted-message :id="LocalKey.common.backHome" />
          </app-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result-container {
  @apply py-20 small-tablet:h-screen small-tablet:flex justify-center;
}
.app-result {
  @apply flex flex-col items-center px-4 text-center;
  &-image {
    @apply flex justify-center;
  }
  p {
    @apply tracking-tight dark:text-white;
  }
  .title {
    @apply my-4 text-2xl tracking-tight font-bold small-tablet:text-xl;
  }
  .description {
    @apply mb-4 whitespace-pre-wrap;
  }
}
</style>
