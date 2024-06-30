<script setup lang="ts">
import { useCountryQuickView } from '~/features/country/stores/country-quick-view'
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'
import { numberWithCommas } from '~/utils/helpers'
import { continentMapping } from '~/utils/mapping'
import CountryActions from './CountryActions.vue'

defineProps<{ countries: Country[] }>()
const isVie = useUserLocationStore().userLocation.isVie

const handleShowQuickView = (id: string) => {
  const quickView = useCountryQuickView()
  quickView.id = id
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Name</th>
          <th title="Alpha-2 ISO 3166-1 code">Code</th>
          <th>Capital</th>
          <th>Continent</th>
          <th>Population</th>
          <th>Area</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="c in countries" :key="c.id">
          <td class="min-w-48">
            <div class="flex-v-center gap-2">
              <img
                class="size-5 rounded-full object-cover object-center cursor-pointer"
                :src="c.flag"
                :alt="c.name.common"
                @click="handleShowQuickView(c.id)"
              />
              <div class="flex flex-col">
                {{ c.name.common }}
                <span v-if="isVie" class="text-xs text-neutral-main">{{ c.name.vieName }}</span>
              </div>
            </div>
          </td>
          <td class="min-w-20">{{ c.id }}</td>
          <td class="min-w-32">{{ c.capital }}</td>
          <td class="min-w-40">{{ c.continents.map(c => continentMapping(c).name).join(', ') }}</td>
          <td>{{ numberWithCommas(c.population.total) }}</td>
          <td class="min-w-40">{{ numberWithCommas(c.area) }} km²</td>
          <td class="min-w-48">
            <CountryActions v-bind="c" class="!justify-start" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
