<script setup lang="ts">
import { get, orderBy } from 'lodash-es'
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import DataNotFound from '~/components/DataNotFound.vue'
import QueryPagination from '~/components/QueryPagination.vue'
import { SortOrder } from '~/constants/common'
import { FILTER_QUERY_KEY, LS_KEY } from '~/constants/key'
import { useCountriesStore } from '~/stores/countries'
import type { Continent, Country } from '~/types/Country'
import { countrySearch, safeJsonParse, toNumber } from '~/utils/helpers'
import { CONTINENT_FILTER_KEY } from './filter-bar/ContinentFilter.vue'
import { FAVORITE_FILTER_KEY } from './filter-bar/FavoriteFilter.vue'
import { ViewType } from './filter-bar/ViewAs.vue'
import GalleryView from './gallery-view/GalleryView.vue'

const ListView = defineAsyncComponent(() => import('./list-view/ListView.vue'))
const TableView = defineAsyncComponent(() => import('./TableView.vue'))

const PAGE_SIZE = 12

const countriesStore = useCountriesStore()
const route = useRoute()

const viewAs = computed(() => route.query[FILTER_QUERY_KEY.VIEW_AS])

const data = computed(() => {
  let countries = countriesStore.countries as Country[]
  const query = route.query

  // Favorite filter
  if (Number(query[FAVORITE_FILTER_KEY]) === 1) {
    const favorites = safeJsonParse<Record<string, string>>(localStorage.getItem(LS_KEY.FAVORITE_COUNTRIES))

    if (!Object.keys(favorites).length) return { countries: [], total: 0 }

    countries = countries.filter(country => Boolean(favorites[country.id]))
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

  const page = toNumber(route.query[FILTER_QUERY_KEY.PAGE], 1)

  return { countries: countries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: countries.length }
})
</script>

<template>
  <DataNotFound v-if="!data.total" />
  <template v-else>
    <ListView v-if="viewAs === ViewType.List" :countries="data.countries" />
    <TableView v-else-if="viewAs === ViewType.Table" :countries="data.countries" />
    <GalleryView v-else :countries="data.countries" />
  </template>

  <QueryPagination :total="data.total" :page-size="PAGE_SIZE" class="mt-4" />
</template>
