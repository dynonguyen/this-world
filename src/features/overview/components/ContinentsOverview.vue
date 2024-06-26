<script setup lang="ts">
import { useCountriesStore } from '~/stores/countries'
import { Continent } from '~/types/Country'
import { continentMapping } from '~/utils/mapping'

const countries = useCountriesStore().countries

const countCountries = (continent: Continent) => countries.filter(c => c.continents.includes(continent)).length

const rows = [
  {
    ...continentMapping(Continent.Asia),
    population: '4,927,748,740 (61.56%)',
    noCountries: countCountries(Continent.Asia),
    area: '44,614,000'
  },
  {
    ...continentMapping(Continent.Africa),
    noCountries: countCountries(Continent.Africa),
    population: '1,494,988,668 (18.68%)',
    area: '30,365,000'
  },
  {
    ...continentMapping(Continent.Europe),
    noCountries: countCountries(Continent.Europe),
    population: '741,252,853 (9.26%)',
    area: '9,948,000'
  },
  {
    ...continentMapping(Continent.NorthAmerica),
    noCountries: countCountries(Continent.NorthAmerica),
    population: '608,132,768 (7.6%)',
    area: '24,230,000'
  },
  {
    ...continentMapping(Continent.SouthAmerica),
    noCountries: countCountries(Continent.SouthAmerica),
    population: '442,860,821 (5.53%)',
    area: '17,814,000'
  },
  {
    ...continentMapping(Continent.Oceania),
    noCountries: countCountries(Continent.Oceania),
    population: '46,109,212	(0.58%)',
    area: '8,510,9260'
  },
  {
    ...continentMapping(Continent.Antarctica),
    noCountries: countCountries(Continent.Antarctica),
    population: '0 (0%)',
    area: '14,200,000'
  }
]
</script>

<template>
  <div class="p-4 md:p-6 rounded-2xl border base-border">
    <div class="flex flex-col gap-4">
      <div class="text-lg font-medium line-clamp-1">7 Continents</div>
      <div class="overflow-x-auto">
        <table class="table [&_td]:min-w-48">
          <thead>
            <tr>
              <th>Continent</th>
              <th title="Reference: https://worldpopulationreview.com/continents">Population (2024)</th>
              <th title="Reference: https://en.wikipedia.org/wiki/Continent#Area_and_population">Area (Km²)</th>
              <th class="w-40">No. countries & territories</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in rows" :key="row.name">
              <td>
                <div class="flex-v-center gap-1">
                  <span class="icon text-gray-500" :class="row.icon"></span> {{ row.name }}
                </div>
              </td>
              <td>{{ row.population }}</td>
              <td>{{ row.area }}</td>
              <td class="w-40">{{ row.noCountries }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
