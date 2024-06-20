<script setup lang="ts">
import { APP_NAME } from '~/constants/common'
import { withAssets } from '~/utils/helpers'
</script>

<template>
  <div class="flex-center h-14 border-b border-gray-200 dark:border-gray-600 px-4">
    <div class="flex-center space-x-2">
      <img class="w-8 h-8" :src="withAssets('img/logo.png')" />
      <div class="text-xl font-semibold">{{ APP_NAME }}</div>
    </div>
  </div>
</template>
