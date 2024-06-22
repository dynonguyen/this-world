<script setup lang="ts">
import ActionButton from '~/components/ActionButton.vue'
import { APP_NAME } from '~/constants/common'
import { withAssets } from '~/utils/helpers'
import ThemeController from './ThemeController.vue'
</script>

<template>
  <div class="flex-v-center h-14 justify-between px-4 base-border-bottom">
    <!-- Logo -->
    <div class="flex-v-center space-x-2">
      <img class="size-8" :src="withAssets('img/logo.png')" />
      <div class="text-lg font-semibold">{{ APP_NAME }}</div>
    </div>

    <!-- Theme controller -->
    <div class="flex gap-2">
      <ThemeController />
      <ActionButton icon="ph-github-logo-fill" />
    </div>
  </div>
</template>
