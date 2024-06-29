<script setup lang="ts">
import { get, orderBy } from 'lodash-es'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SortOrder } from '~/constants/common'
import { FILTER_QUERY_KEY, LS_KEY } from '~/constants/key'
import { useCountriesStore } from '~/stores/countries'
import type { Continent, Country } from '~/types/Country'
import { countrySearch, safeJsonParse } from '~/utils/helpers'
import DataNotFound from './DataNotFound.vue'
import ViewAll from './ViewAll.vue'
import { CONTINENT_FILTER_KEY } from './filter-bar/ContinentFilter.vue'
import { FAVORITE_FILTER_KEY } from './filter-bar/FavoriteFilter.vue'
import GalleryView from './gallery/GalleryView.vue'

const PREVIEW_COUNT = 12

const countriesStore = useCountriesStore()
const route = useRoute()

const viewAll = ref(false)

const countries = computed<Country[]>(() => {
  let countries = countriesStore.countries as Country[]
  const query = route.query

  // Favorite filter
  if (Number(query[FAVORITE_FILTER_KEY]) === 1) {
    const favorites = safeJsonParse<Record<string, string>>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))

    if (!Object.keys(favorites).length) return []

    countries = countries.filter(country => Boolean(favorites[country.cca2]))
  }

  // Continent filter
  const continent = query[CONTINENT_FILTER_KEY]
  if (continent) {
    countries = countries.filter(country => country.continents.includes(continent as Continent))
  }

  // Search filter
  const keyword = (query[FILTER_QUERY_KEY.KEYWORD] || '').toString()
  if (keyword) {
    countries = countries.filter(c => countrySearch(c, keyword))
  }

  // Sort
  const sortField = query[FILTER_QUERY_KEY.SORT_BY]
  if (sortField) {
    countries = orderBy(countries, item => get(item, sortField as string))

    const order = query[FILTER_QUERY_KEY.SORT_ORDER]
    if (order === SortOrder.DESC) countries.reverse()
  }

  return countries
})
</script>

<template>
  <DataNotFound v-if="!countries.length" />
  <template v-else>
    <div class="text-sm md:text-md text-neutral-main mb-4">
      <b>{{ countries.length }}</b> countries and territories
    </div>
    <GalleryView :countries="viewAll ? countries : countries.slice(0, PREVIEW_COUNT)" />
  </template>

  <ViewAll v-if="!viewAll && countries.length > PREVIEW_COUNT" @click="viewAll = true" class="mt-4" />
</template>
