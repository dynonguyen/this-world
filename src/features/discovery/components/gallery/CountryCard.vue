<script setup lang="ts">
import { omit } from 'lodash-es'
import { ref } from 'vue'
import { LS_KEY } from '~/constants/key'
import { PATH } from '~/constants/path'
import { useCountryQuickView } from '~/features/country/stores/country-quick-view'
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'
import type { LabelValueTuple } from '~/types/common'
import { getEnv, numberWithCommas, safeJsonParse, textToSpeech } from '~/utils/helpers'

type FavoriteStore = Record<string, string>

const props = defineProps<Country>()

const isVie = useUserLocationStore().userLocation.isVie
const quickView = useCountryQuickView()
const isFavorite = ref(
  Boolean(safeJsonParse<FavoriteStore>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))[props.cca2])
)

const infos: LabelValueTuple<string>[] = [
  ['Capital', props.capital, 'ph-map-pin-area-fill'],
  ['Continent', props.continents.join(', '), 'other-sharp-landside'],
  ['Population', numberWithCommas(props.population.total), 'ph-users-three-fill'],
  ['Area', `${numberWithCommas(props.area)} km²`, 'other-area']
]

const handleShowQuickView = () => (quickView.cca2 = props.cca2)

const handleCopyLink = (ev: MouseEvent) => {
  ev.stopPropagation()

  const url = `${getEnv('VITE_BASE_URL')}${PATH.COUNTRY.replace(':cca2', props.cca2)}`
  const target = ev.currentTarget as HTMLElement

  navigator.clipboard.writeText(url).then(() => {
    target?.setAttribute('data-tip', 'Link copied to clipboard!')
    setTimeout(() => target?.setAttribute('data-tip', 'Copy share link'), 3000)
  })
}

const handleToggleFavorite = () => {
  const favoriteStore = safeJsonParse<FavoriteStore>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))
  localStorage.setItem(
    LS_KEY.FAVORITE_COUNTRIES,
    JSON.stringify(isFavorite.value ? omit(favoriteStore, props.cca2) : { ...favoriteStore, [props.cca2]: '1' })
  )

  isFavorite.value = !isFavorite.value
}
</script>

<template>
  <div
    class="bg-gray-50/10 dark:bg-gray-600/20 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md flex flex-col gap-3"
  >
    <!-- Flag -->
    <img
      :src="flag"
      :alt="name.common"
      class="h-36 w-full object-cover object-center rounded-lg cursor-pointer"
      @click="handleShowQuickView"
    />

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

    <!-- Actions -->
    <div
      class="flex-v-center justify-end gap-3 [&_span]:text-neutral-main [&_span:hover]:text-primary [&_span]:size-5 [&_span]:transition-colors [&_span]:cursor-pointer"
    >
      <div
        class="flex-v-center tooltip"
        :data-tip="isFavorite ? 'Remove from favorite' : 'Add to favorite'"
        @click="handleToggleFavorite"
      >
        <span class="icon" :class="isFavorite ? 'ph-heart-fill !text-primary' : 'ph-heart'"></span>
      </div>

      <span class="icon ph-speaker-high" @click="textToSpeech(name.common)"></span>

      <div class="flex-v-center tooltip" data-tip="Quick view">
        <span class="icon uil-info-circle" @click="handleShowQuickView"></span>
      </div>

      <div class="flex-v-center tooltip" data-tip="Copy share link">
        <span class="icon ph-link" @click="handleCopyLink"></span>
      </div>

      <RouterLink :to="PATH.COUNTRY.replace(':cca2', cca2)" class="flex-v-center tooltip" data-tip="Go to detail page">
        <span class="icon other-open"></span>
      </RouterLink>
    </div>
  </div>
</template>
