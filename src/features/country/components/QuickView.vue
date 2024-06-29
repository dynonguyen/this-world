<script setup lang="ts">
import { computed } from 'vue'
import ModalContent from '~/components/ModalContent.vue'
import { useKeyPress } from '~/hooks/useKeyPress'
import { useCountriesStore } from '~/stores/countries'
import { useCountryQuickView } from '../stores/country-quick-view'

const quickViewStore = useCountryQuickView()
const countryByCode = useCountriesStore().countryByCode

const country = computed(() => countryByCode[quickViewStore.cca2]!)

const handleClose = () => (quickViewStore.cca2 = '')

const open = computed(() => Boolean(quickViewStore.cca2))

useKeyPress('Escape', handleClose, open)
</script>

<template>
  <Teleport to="body">
    <dialog v-if="Boolean(country)" class="modal modal-open">
      <ModalContent class="max-w-2xl" @close="handleClose">
        <template #title>
          <h2>{{ country.flagSymbol }} {{ country.name.common }}</h2>
        </template>

        <div class="p-4">{{ country.name.common }}</div>
      </ModalContent>
      <form method="dialog" class="modal-backdrop" @click="handleClose"></form>
    </dialog>
  </Teleport>
</template>
