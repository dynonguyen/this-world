<script setup lang="ts">
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import DataNotFound from '~/components/DataNotFound.vue'
import Dropdown from '~/components/Dropdown.vue'
import { PATH } from '~/constants/path'
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'
import { countrySearch } from '~/utils/helpers'
import { useCountryQuickView } from '../country/stores/country-quick-view'

const MAX_RESULTS = 8

const countriesStore = useCountriesStore()

const open = ref(false)
const results = ref<Country[]>([])

const handleSearch = debounce((ev: Event) => {
  const keyword = (ev.target as HTMLInputElement).value.trim()

  if (!keyword) return (results.value = [])

  results.value = countriesStore.countries
    .filter(c => countrySearch(c as Country, keyword))
    .slice(0, MAX_RESULTS) as Country[]
}, 250)

const handleShowQuickView = (id: string) => {
  const quickView = useCountryQuickView()
  quickView.id = id
  open.value = false
}
</script>

<template>
  <Dropdown v-model:open="open" class="w-full" :menu-props="{ class: 'mt-1 w-full' }">
    <template #action>
      <div
        className="input input-ghost bg-gray-100 dark:bg-gray-700 input-sm flex-v-center gap-2 w-full"
        @click="open = true"
      >
        <span class="icon uil-search text-base-content/75"></span>
        <input type="text" className="grow" placeholder="Search a country" @input="handleSearch" />
      </div>
    </template>

    <template #list>
      <DataNotFound v-if="!results.length" :img-props="{ class: 'h-16' }" />
      <template v-else>
        <li v-for="c in results" :key="c.id" @click="handleShowQuickView(c.id)">
          <a class="flex-v-center gap-2 justify-between group">
            <div class="flex-v-center gap-2 grow">
              <img class="size-6 rounded-full object-cover object-center shrink-0" :src="c.flag" />
              <span class="line-clamp-1">
                <b>{{ c.cca2 }}</b> - {{ c.name.common }}
              </span>
            </div>

            <RouterLink
              :to="PATH.COUNTRY.replace(':id', c.id)"
              class="md:hidden md:group-hover:flex-v-center"
              @click.stop="open = false"
            >
              <span class="icon size-4 text-neutral-main other-open shrink-0"></span>
            </RouterLink>
          </a>
        </li>
      </template>
    </template>
  </Dropdown>
</template>
