<script setup lang="ts">
import { get, orderBy } from 'lodash-es'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import DataNotFound from '~/components/DataNotFound.vue'
import { SortOrder } from '~/constants/common'
import { FILTER_QUERY_KEY, LS_KEY } from '~/constants/key'
import { useCountriesStore } from '~/stores/countries'
import type { Continent, Country } from '~/types/Country'
import { countrySearch, safeJsonParse } from '~/utils/helpers'
import ViewAll from './ViewAll.vue'
import { CONTINENT_FILTER_KEY } from './filter-bar/ContinentFilter.vue'
import { FAVORITE_FILTER_KEY } from './filter-bar/FavoriteFilter.vue'
import { ViewType } from './filter-bar/ViewAs.vue'
import GalleryView from './gallery-view/GalleryView.vue'

const ListView = defineAsyncComponent(() => import('./list-view/ListView.vue'))
const TableView = defineAsyncComponent(() => import('./TableView.vue'))

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

    countries = countries.filter(country => Boolean(favorites[country.code]))
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

const viewAs = computed(() => route.query[FILTER_QUERY_KEY.VIEW_AS])

const getSlicedCountries = () => {
  return viewAll.value ? countries.value : countries.value.slice(0, PREVIEW_COUNT)
}
</script>

<template>
  <DataNotFound v-if="!countries.length" />
  <template v-else>
    <div class="text-sm md:text-md text-neutral-main mb-4">
      <b>{{ countries.length }}</b> countries and territories
    </div>

    <ListView v-if="viewAs === ViewType.List" :countries="getSlicedCountries()" />
    <TableView v-else-if="viewAs === ViewType.Table" :countries="getSlicedCountries()" />
    <GalleryView v-else :countries="getSlicedCountries()" />
  </template>

  <ViewAll v-if="!viewAll && countries.length > PREVIEW_COUNT" @click="viewAll = true" class="mt-4" />
</template>
