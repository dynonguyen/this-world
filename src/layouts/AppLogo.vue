<script setup lang="ts">
import { APP_NAME } from '~/constants/common'
import { PATH } from '~/constants/path'
import { withAssets } from '~/utils/helpers'
</script>

<template>
  <RouterLink :to="PATH.HOME">
    <div class="flex-v-center gap-2">
      <img class="size-7 sm:size-8" :src="withAssets('img/logo.png')" />
      <div class="text-lg font-semibold hidden md:block">{{ APP_NAME }}</div>
    </div>
  </RouterLink>
</template>
