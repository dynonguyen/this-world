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

const infos: LabelValueTuple<[string, string]>[] = [
  ['Capital', props.capital, ['ph-map-pin-area-fill', 'text-blue-400/80']],
  [
    'Continent',
    props.continents.map(c => continentMapping(c).name).join(', '),
    ['other-sharp-landside', 'text-orange-400/80']
  ],
  ['Population', numberWithCommas(props.population.total), ['ph-users-three-fill', 'text-green-400/80']],
  ['Area', `${numberWithCommas(props.area)} km²`, ['other-area', 'text-purple-400/80']]
]

const handleShowQuickView = () => {
  const quickView = useCountryQuickView()
  quickView.id = props.id
}
</script>

<template>
  <div class="flex-v-center gap-3 country-list-item">
    <!-- Flag -->
    <img
      class="size-6 md:size-8 mt-1 rounded-full object-cover object-center shrink-0 cursor-pointer"
      :src="flag"
      :alt="name.common"
      @click="handleShowQuickView"
    />

    <div class="flex flex-col gap-0.5 grow">
      <!-- Name -->
      <div class="flex flex-col gap-0.5 relative">
        <h2 class="text-lg font-semibold">
          {{ name.common }} - {{ id }}
          <span v-if="isVie" class="text-xs font-normal text-neutral-main">({{ name.vieName }})</span>
        </h2>
      </div>

      <!-- Infos -->
      <div class="flex-v-center gap-2 flex-wrap">
        <div
          v-for="info in infos"
          :key="info[0]"
          class="flex-v-center gap-1 tooltip"
          :data-tip="info[0]"
          :class="info[2]![1]"
        >
          <span class="icon size-4" :class="info[2]![0]"></span>
          <span class="text-xs md:text-sm">{{ info[1] }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <CountryActions v-bind="$props" />
  </div>
</template>
