<script setup lang="ts">
import { omit } from 'lodash-es'
import LabelValue, { type LabelValueProps } from '~/components/LabelValue.vue'
import { useCountriesStore } from '~/stores/countries'
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'
import type { LabelValueTuple } from '~/types/common'
import { numberWithCommas } from '~/utils/helpers'
import { continentMapping } from '~/utils/mapping'

const props = defineProps<Country>()
const isVie = useUserLocationStore().userLocation.isVie
const countryByCode = useCountriesStore().countryByCode

const renderYesNo = (value: boolean) => (value ? '✅' : '❌')
const renderExternalLink = (url: string) => (url ? `<a class="underline" href="${url}" target="_blank">${url}</a>` : '')

const infos: LabelValueTuple<{ tooltip?: string } & LabelValueProps>[] = [
  ['Common Name', props.name.common + (isVie ? ` (${props.name.vieName})` : '')],
  ['Official Name', props.name.official],
  ['Flag', `<img src="${props.flag}" class="size-6"' />`, { isHtml: true }],
  ['Coat Of Arms', `<img src="${props.coatOfArms}" class="size-6"' />`, { isHtml: true }],
  ['Capital', props.capital],
  ['Country Code', `${props.cca2} / ${props.cca3}`, { tooltip: 'ISO 3166-1 alpha-2 / alpha-3 code' }],
  ['Population', numberWithCommas(props.population.total), { tooltip: `Updated: ${props.population.updatedAt}` }],
  ['Area', `${numberWithCommas(props.area)} km²`],
  ['Continent', props.continents.map(c => continentMapping(c).name).join(', ')],
  ['Languages', props.languages.join(', ')],
  ['Timezones', props.timezones.join(', ')],
  ['GDP 2022', props.gdp2022 === 0 ? '' : `${props.gdp2022} Billion USD`],
  [
    'Neighbors',
    props.borders
      .map(bc => countryByCode[bc]?.name.common)
      .filter(Boolean)
      .join(', '),
    { tooltip: 'Neighbouring Countries' }
  ],
  ['Currencies', props.currencies.map(c => `${c.code} ${c.symbol} (${c.name})`).join(', ')],
  ['Calling code', `+${props.dialingCode}`],
  ['Top Level Domain', props.tld.join(', ')],
  ['Independent', renderYesNo(props.independent)],
  ['UN Member State', renderYesNo(props.unMember)],
  ['UN Observer', props.unObserver ? '✅' : ''],
  ['Lat & Long', props.latlng.join(', ')],
  ['Driving', `Side: ${props.car.side === 'left' ? '⬅ Left ️' : 'Right ➡️'} / Signs: ${props.car.signs.join(', ')}`],
  ['Start of week', props.startOfWeek],
  ['Fifa country code', props.fifaCode],
  ['Google Map', renderExternalLink(props.googleMap), { isHtml: true }],
  ['Wikipedia', renderExternalLink(props.wiki), { isHtml: true }]
]
</script>

<template>
  <LabelValue
    v-for="[label, value, option] in infos"
    :key="label"
    :label="label"
    :value="value"
    :label-width="140"
    v-bind="omit(option, 'tooltip')"
    class="py-3 border-b border-dashed border-neutral-divider last:border-b-0"
  >
    <template v-if="option?.tooltip" #label>
      <div class="tooltip tooltip-right" :data-tip="option.tooltip">
        <div class="flex-v-center gap-1">
          <span>{{ label }}</span>
          <span class="icon uil-info-circle size-4"></span>
        </div>
      </div>
    </template>
  </LabelValue>
</template>
