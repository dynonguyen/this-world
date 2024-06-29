<script setup lang="ts">
import { useCountryQuickView } from '~/features/country/stores/country-quick-view'
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'
import type { LabelValueTuple } from '~/types/common'
import { numberWithCommas } from '~/utils/helpers'
import { continentMapping } from '~/utils/mapping'
import CountryActions from '../CountryActions.vue'

const props = defineProps<Country>()

const isVie = useUserLocationStore().userLocation.isVie

const infos: LabelValueTuple<string>[] = [
  ['Capital', props.capital, 'ph-map-pin-area-fill'],
  ['Continent', props.continents.map(c => continentMapping(c).name).join(', '), 'other-sharp-landside'],
  ['Population', numberWithCommas(props.population.total), 'ph-users-three-fill'],
  ['Area', `${numberWithCommas(props.area)} km²`, 'other-area']
]

const handleShowQuickView = () => {
  const quickView = useCountryQuickView()

  quickView.code = props.code
}
</script>

<template>
  <div class="bg-gray-50/10 dark:bg-gray-600/20 rounded-2xl p-4 base-border hover:shadow-md flex flex-col gap-3">
    <!-- Flag -->
    <img
      :src="flag"
      :alt="name.common"
      class="h-36 w-full object-cover object-center rounded-lg cursor-pointer"
      @click="handleShowQuickView"
    />

    <!-- Name -->
    <div class="flex flex-col gap-0.5 relative">
      <h2 class="text-lg font-semibold">{{ name.common }} - {{ code }}</h2>
      <span v-if="isVie" class="text-xs text-neutral-main">{{ name.vieName }}</span>
    </div>

    <!-- General information -->
    <div class="flex flex-col grow">
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

    <!-- Actions -->
    <CountryActions v-bind="$props" />
  </div>
</template>
