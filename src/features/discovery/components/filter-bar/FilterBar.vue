<script setup lang="ts">
import QuerySearchBar from '~/components/QuerySearchBar.vue'
import { useIsMobile } from '~/stores/is-mobile'
import ClearFilter from './ClearFilter.vue'
import ContinentFilter from './ContinentFilter.vue'
import CountrySort from './CountrySort.vue'
import FavoriteButton from './FavoriteFilter.vue'
import ViewAs from './ViewAs.vue'

const isMobile = useIsMobile()
</script>

<template>
  <div v-if="isMobile.matched" class="flex flex-col gap-2">
    <div class="flex-v-center justify-between">
      <ViewAs />

      <div class="flex-v-center gap-2">
        <ClearFilter class="h-10" />
        <FavoriteButton />
        <ContinentFilter />
        <CountrySort />
      </div>
    </div>

    <QuerySearchBar />
  </div>
  <div v-else class="flex-v-center flex-wrap gap-2 justify-between">
    <ViewAs />

    <div class="flex-v-center gap-2">
      <ClearFilter />
      <QuerySearchBar />
      <FavoriteButton />
      <ContinentFilter />
      <CountrySort />
    </div>
  </div>
</template>
