<script setup lang="ts">
import { computed } from 'vue'
import ModalContent from '~/components/ModalContent.vue'
import CountryActions from '~/features/discovery/components/CountryActions.vue'
import { useKeyPress } from '~/hooks/useKeyPress'
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'
import { useCountryQuickView } from '../stores/country-quick-view'
import CountryInfo from './CountryInfo.vue'

const quickViewStore = useCountryQuickView()
const countryByCode = useCountriesStore().countryByCode

const country = computed(() => countryByCode[quickViewStore.code] as Country)
const open = computed(() => Boolean(quickViewStore.code))

const handleClose = () => (quickViewStore.code = '')

useKeyPress('Escape', handleClose, open)
</script>

<template>
  <Teleport to="body">
    <dialog v-if="Boolean(country)" class="modal modal-open">
      <ModalContent class="max-w-2xl" @close="handleClose">
        <template #title>
          <div class="flex-v-center gap-2">
            <img
              :src="country.flag"
              :alt="country.name.common"
              class="size-6 rounded-full object-cover object-center"
            />
            <h2>{{ country.name.common }}</h2>
          </div>
        </template>

        <div class="px-4 py-2 flex flex-col">
          <CountryInfo v-bind="country" />
        </div>

        <template #action>
          <CountryActions v-bind="country" hide-quick-view />
        </template>
      </ModalContent>
      <form method="dialog" class="modal-backdrop" @click="handleClose"></form>
    </dialog>
  </Teleport>
</template>
