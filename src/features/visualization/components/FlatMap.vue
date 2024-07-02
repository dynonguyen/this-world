<script setup lang="ts">
import 'vue-zoomable/dist/style.css'

// @ts-ignore
import VueZoomable from 'vue-zoomable'
import BlankMap from './BlankMap.vue'
</script>

<template>
  <div class="flex-v-center justify-end mb-8">
    <!-- Search -->
    <label class="input input-ghost bg-gray-100 dark:bg-gray-700 input-sm flex items-center gap-2 h-10 md:h-8">
      <input type="text" class="grow" placeholder="Search" />
      <span class="icon uil-search text-base-content/75"></span>
    </label>
  </div>

  <div class="overflow-auto">
    <div class="flex-center cursor-move" :class="$style.wrap">
      <VueZoomable selector="#Earth" enableControllButton :minZoom="0.5" :maxZoom="4" :initialZoom="1">
        <BlankMap />
      </VueZoomable>
    </div>
  </div>
</template>

<style module>
.wrap :global(#Ocean) {
  @apply fill-blue-500/20 stroke-neutral-divider;
}

.wrap :global(#Earth g path) {
  @apply fill-neutral-main;
}

.wrap :global(#Earth g.selected path) {
  @apply fill-primary;
}

.wrap :global(#Earth g:hover path),
.wrap :global(#Earth g:active path) {
  @apply fill-primary;
}

.wrap :global(.controll__buttons) {
  @apply cursor-pointer scale-75 md:scale-x-75;
}
</style>
