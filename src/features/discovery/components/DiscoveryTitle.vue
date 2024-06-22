<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const globe = ref<HTMLSpanElement | null>(null)
const intervalId = ref<number | null>(null)

onMounted(() => {
  const g = ['🌍', '🌎', '🌏']
  let i = 0
  intervalId.value = setInterval(() => {
    if (globe.value) {
      globe.value.textContent = g[i++]
      if (i === g.length) i = 0
    }
  }, 250)
})

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})
</script>

<template>
  <h1 class="text-center text-lg sm:text-xl md:text-2xl font-medium my-4">
    Discover countries around the <b class="text-primary/50">World</b> <span ref="globe">🌍</span>
  </h1>
</template>
