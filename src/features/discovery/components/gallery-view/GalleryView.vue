<script setup lang="ts">
import type { Country } from '~/types/Country'
import CountryCard from './CountryCard.vue'

defineProps<{ countries: Country[] }>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
    <CountryCard v-for="country in countries" :key="country.id" v-bind="country" />
  </div>
</template>
