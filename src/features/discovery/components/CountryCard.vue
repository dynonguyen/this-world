<script setup lang="ts">
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'
import type { LabelValueTuple } from '~/types/common'
import { numberWithCommas } from '~/utils/helpers'

const props = defineProps<Country>()

const isVie = useUserLocationStore().userLocation.isVie

const infos: LabelValueTuple<string>[] = [
  ['Capital', props.capital, 'ph-map-pin-area-fill'],
  ['Continent', props.continents.join(', '), 'other-sharp-landside'],
  ['Population', numberWithCommas(props.population.total), 'ph-users-three-fill'],
  ['Area', `${numberWithCommas(props.area)} km²`, 'other-area']
]
</script>

<template>
  <div
    class="bg-gray-50/10 dark:bg-gray-600/20 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary flex flex-col gap-3"
  >
    <!-- Flag -->
    <img :src="flag" :alt="name.common" class="h-36 w-full object-cover object-center rounded-lg" />

    <!-- Name -->
    <div class="flex flex-col gap-0.5 relative">
      <h2 class="text-lg font-semibold">{{ name.common }} - {{ cca2 }}</h2>
      <span v-if="isVie" class="text-xs text-neutral-main">{{ name.vieName }}</span>
    </div>

    <!-- General information -->
    <div class="flex flex-col">
      <div
        v-for="info in infos"
        :key="info[0]"
        class="flex-v-center justify-between gap-2 py-2 border-b border-dashed border-neutral-divider"
      >
        <div class="flex-v-center gap-1 text-neutral-main shrink-0">
          <span class="icon size-5" :class="info[2]"></span>
          <span class="text-sm">{{ info[0] }}</span>
        </div>
        <span class="text-sm text-gray-500 text-right grow line-clamp-1">{{ info[1] }}</span>
      </div>
    </div>

    <!-- Action -->
    <div
      class="flex-v-center justify-end gap-2 [&_span]:text-neutral-main [&_span:hover]:text-primary [&_span]:size-5 [&_span]:transition-colors [&_span]:cursor-pointer"
    >
      <span class="icon ph-speaker-high"></span>
      <span class="icon uil-info-circle"></span>
      <span class="icon ph-share-network"></span>
      <span class="icon other-open"></span>
    </div>
  </div>
</template>
