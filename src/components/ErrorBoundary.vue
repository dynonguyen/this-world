<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { withAssets } from '~/utils/helpers'

const error = ref<Error | null>(null)

onErrorCaptured(err => {
  error.value = err
  console.error('ErrorBoundary:', error)
  return false
})
</script>

<template>
  <slot v-if="Boolean(error)" name="fallback">
    <div class="max-w-md mx-auto my-12">
      <img :src="withAssets('img/server-error.svg')" />
      <div class="text-center text-2xl md:text-3xl font-semibold mt-6">
        Something went wrong.<br />Refresh to try again
      </div>
    </div>
  </slot>
  <slot v-else></slot>
</template>
