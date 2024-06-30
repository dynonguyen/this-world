<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { withAssets } from '~/utils/helpers'

defineProps<{ imgProps?: HTMLAttributes }>()
</script>

<template>
  <div class="max-w-md mx-auto my-12 flex-center flex-col gap-4">
    <img :src="withAssets('img/empty-data.svg')" class="h-40" v-bind="imgProps" />
    <div class="text-center text-neutral-main">Data not found</div>
  </div>
</template>
