<script setup lang="ts">
import type { Country } from '~/types/Country'
import ListItem from './ListItem.vue'

defineProps<{ countries: Country[] }>()
</script>

<template>
  <div id="country-list-view" class="flex flex-col gap-4">
    <ListItem
      v-for="country in countries"
      :key="country.code"
      v-bind="country"
      class="border-b border-dashed pb-4 last:border-b-0"
    />
  </div>
</template>
