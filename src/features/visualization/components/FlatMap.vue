<script setup lang="ts">
import 'vue-zoomable/dist/style.css'

import { debounce } from 'lodash-es'
import { onMounted, onUnmounted, ref } from 'vue'
// @ts-ignore
import VueZoomable from 'vue-zoomable'
import { useCountryQuickView } from '~/features/country/stores/country-quick-view'
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'
import BlankMap from './BlankMap.vue'

const countryByCode = useCountriesStore().countryByCode

const inMap = ref(false)
const preview = ref<{ x: number; y: number; country: Country } | null>(null)

const handleMoveHover = debounce((ev: Event) => {
  if (!inMap.value) return

  const target = ev.target as HTMLElement
  const country = countryByCode[target.id] as Country

  if (!country) return

  const { x, y } = ev as MouseEvent
  preview.value = { x: x, y: y + 32, country }
}, 500)

const handleMoveLeave = () => {
  if (preview.value) preview.value = null
}

const handleOutMap = () => {
  inMap.value = false
}

const handleInMap = () => {
  inMap.value = true
}

const handlePreview = () => {
  if (!preview.value) return

  useCountryQuickView().id = preview.value.country.cca2
  preview.value = null
}

onMounted(() => {
  const earth = document.getElementById('Earth')
  if (!earth) return

  const cNodes = earth.querySelectorAll('& > g[id]') || []
  if (!cNodes.length) return

  earth.addEventListener('mouseenter', handleInMap)
  earth.addEventListener('mouseleave', handleOutMap)

  // Add title
  cNodes.forEach(c => {
    c.addEventListener('mouseenter', handleMoveHover)
    c.addEventListener('mouseleave', handleMoveLeave)
  })
})

onUnmounted(() => {
  const earth = document.getElementById('Earth')
  if (!earth) return

  const cNodes = earth.querySelectorAll('& > g[id]') || []
  if (!cNodes.length) return

  earth.addEventListener('mouseenter', handleInMap)
  earth.addEventListener('mouseleave', handleOutMap)

  cNodes.forEach(c => {
    c.removeEventListener('mouseenter', handleMoveHover)
    c.removeEventListener('mouseleave', handleMoveLeave)
  })
})
</script>

<template>
  <!-- Map -->
  <div class="overflow-auto my-8">
    <div class="flex-center cursor-move" :class="$style.wrap" @dblclick="handlePreview">
      <VueZoomable
        selector="#Earth"
        enableControllButton
        :dblClickEnabled="false"
        :minZoom="0.5"
        :maxZoom="4"
        :initialZoom="1"
        :touchEnabled="false"
      >
        <BlankMap v-once />
      </VueZoomable>
    </div>
  </div>

  <!-- Tooltip popup -->
  <div v-if="preview" class="fixed" :style="{ left: `${preview.x}px`, top: `${preview.y}px` }">
    <div class="p-2 rounded-lg bg-base-100 shadow flex flex-col gap-1">
      <div class="flex-v-center gap-2">
        <img :src="preview.country.flag" class="size-4 object-cover object-center rounded-full" />
        <span class="text-sm">{{ preview.country.cca2 }} - {{ preview.country.name.common }}</span>
      </div>

      <div class="text-xs text-neutral-main">Double click to show preview</div>
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
  @apply cursor-pointer scale-[0.65];
}
</style>
