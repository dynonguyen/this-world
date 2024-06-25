<script setup lang="ts">
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'
import CountryCard from './CountryCard.vue'

const countries = useCountriesStore().countries as Country[]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <CountryCard v-for="country in countries" :key="country.cca2" v-bind="country" />
  </div>
</template>
