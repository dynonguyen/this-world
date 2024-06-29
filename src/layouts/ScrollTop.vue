<script setup lang="ts">
import { debounce } from 'lodash-es'
import { onMounted, onUnmounted, ref } from 'vue'

const show = ref(false)
const layout = ref<HTMLElement | null>(null)

const POSITION_TO_SHOW = 1200

const handleScrollTop = () => {
  layout.value?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

const handleCheckScrollTop = debounce(() => {
  if (!layout.value) return
  const pageY = layout.value.scrollTop

  if (pageY >= POSITION_TO_SHOW && !show.value) return (show.value = true)
  if (pageY < POSITION_TO_SHOW && show.value) show.value = false
}, 250)

onMounted(() => {
  layout.value = document.getElementById('main-layout-content')
  if (!layout.value) return

  layout.value.addEventListener('scroll', handleCheckScrollTop)
})

onUnmounted(() => {
  if (!layout.value) return
  layout.value.removeEventListener('scroll', handleCheckScrollTop)
})
</script>

<template>
  <button
    v-if="show"
    class="btn btn-circle btn-secondary fixed right-8 bottom-24 md:bottom-8 btn-sm tooltip"
    data-tip="Scroll top"
    @click="handleScrollTop"
  >
    <span class="icon ph-caret-up-fill text-white"></span>
  </button>
</template>
