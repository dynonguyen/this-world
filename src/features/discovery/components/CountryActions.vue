<script setup lang="ts">
import { omit } from 'lodash-es'
import { ref } from 'vue'
import { LS_KEY } from '~/constants/key'
import { PATH } from '~/constants/path'
import { useCountryQuickView } from '~/features/country/stores/country-quick-view'
import type { Country } from '~/types/Country'
import { getEnv, safeJsonParse, textToSpeech } from '~/utils/helpers'

type FavoriteStore = Record<string, string>

const props = defineProps<Country & { hideShowDetail?: boolean; hideQuickView?: boolean }>()
const quickView = useCountryQuickView()

const isFavorite = ref(Boolean(safeJsonParse<FavoriteStore>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))[props.id]))

const handleShowQuickView = () => {
  quickView.id = props.id
}

const handleCopyLink = (ev: MouseEvent) => {
  ev.stopPropagation()

  const url = `${getEnv('VITE_BASE_URL')}${PATH.COUNTRY.replace(':id', props.id)}`
  const target = ev.currentTarget as HTMLElement

  navigator.clipboard.writeText(url).then(() => {
    target?.setAttribute('data-tip', 'Link copied to clipboard!')
    setTimeout(() => target?.setAttribute('data-tip', 'Copy share link'), 3000)
  })
}

const handleCopyName = (ev: MouseEvent) => {
  ev.stopPropagation()

  const target = ev.currentTarget as HTMLElement

  navigator.clipboard.writeText(`${props.flagSymbol} - ${props.name.common} - ${props.id}`).then(() => {
    target?.setAttribute('data-tip', 'Copied to clipboard!')
    setTimeout(() => target?.setAttribute('data-tip', 'Copy name & flag'), 3000)
  })
}

const handleToggleFavorite = () => {
  const favoriteStore = safeJsonParse<FavoriteStore>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))
  localStorage.setItem(
    LS_KEY.FAVORITE_COUNTRIES,
    JSON.stringify(isFavorite.value ? omit(favoriteStore, props.id) : { ...favoriteStore, [props.id]: '1' })
  )

  isFavorite.value = !isFavorite.value
}
</script>

<template>
  <div
    class="flex-v-center justify-end gap-3 [&_span]:text-neutral-main [&_span:hover]:text-primary [&_span]:size-5 [&_span]:transition-colors [&_span]:cursor-pointer"
  >
    <slot name="start"></slot>

    <div
      class="flex-v-center tooltip"
      :data-tip="isFavorite ? 'Remove from favorite' : 'Add to favorite'"
      @click="handleToggleFavorite"
    >
      <span class="icon" :class="isFavorite ? 'ph-heart-fill !text-primary' : 'ph-heart'"></span>
    </div>

    <span class="icon ph-speaker-high" @click="textToSpeech(name.common)"></span>

    <div class="flex-v-center tooltip" data-tip="Copy name & flag" @click="handleCopyName">
      <span class="icon ph-clipboard"></span>
    </div>

    <div class="flex-v-center tooltip" data-tip="Copy share link" @click="handleCopyLink">
      <span class="icon ph-link"></span>
    </div>

    <div v-if="!hideQuickView" class="flex-v-center tooltip" data-tip="Quick view">
      <span class="icon uil-info-circle" @click="handleShowQuickView"></span>
    </div>

    <RouterLink
      v-if="!hideShowDetail"
      :to="PATH.COUNTRY.replace(':id', id)"
      class="flex-v-center tooltip"
      data-tip="Go to detail page"
      @click="quickView.id = ''"
    >
      <span class="icon other-open"></span>
    </RouterLink>
  </div>
</template>
