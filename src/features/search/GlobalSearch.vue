<script setup lang="ts">
import { debounce } from 'lodash-es'
import { computed, ref } from 'vue'
import DataNotFound from '~/components/DataNotFound.vue'
import Dropdown from '~/components/Dropdown.vue'
import { PATH } from '~/constants/path'
import { useKeyPress } from '~/hooks/useKeyPress'
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'
import { countrySearch, detectDevicePlatform } from '~/utils/helpers'
import { useCountryQuickView } from '../country/stores/country-quick-view'

const MAX_RESULTS = 8

const countriesStore = useCountriesStore()
const platform = detectDevicePlatform()

const open = ref(false)
const results = ref<Country[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

const handleSearch = debounce((ev: Event) => {
  const keyword = (ev.target as HTMLInputElement).value.trim()

  if (!keyword) return (results.value = [])

  results.value = countriesStore.countries
    .filter(c => countrySearch(c as Country, keyword))
    .slice(0, MAX_RESULTS) as Country[]
}, 250)

const handleClose = () => {
  open.value = false
  inputRef.value?.blur()
}

const handleShowQuickView = (id: string) => {
  const quickView = useCountryQuickView()
  quickView.id = id
  handleClose()
}

useKeyPress(
  'k',
  ev => {
    if ((platform === 'mac' && ev.metaKey) || (platform !== 'mac' && ev.ctrlKey)) {
      open.value = true
      inputRef.value?.focus()
    }
  },
  computed(() => !open.value)
)
useKeyPress('Escape', handleClose, open)
</script>

<template>
  <Dropdown v-model:open="open" class="w-full" :menu-props="{ class: 'mt-1 w-full' }">
    <template #action>
      <div className="input input-ghost bg-gray-100 dark:bg-gray-700 input-sm flex-v-center gap-2 w-full">
        <span class="icon uil-search text-base-content/75"></span>

        <input
          ref="inputRef"
          @click="open = true"
          type="text"
          className="grow"
          placeholder="Search a country"
          @input="handleSearch"
        />

        <div class="flex-v-center gap-0.5 opacity-40 shrink-0">
          <kbd class="kbd kbd-sm">{{ platform === 'mac' ? '⌘' : '^' }}</kbd>
          <kbd class="kbd kbd-sm">K</kbd>
        </div>
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
