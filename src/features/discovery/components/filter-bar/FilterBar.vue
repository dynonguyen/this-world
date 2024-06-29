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
  <div class="flex-v-center flex-wrap gap-2 justify-between">
    <div class="flex-v-center gap-2">
      <ViewAs />
      <FavoriteButton />
      <ClearFilter v-if="isMobile.matched" class="h-10" />
    </div>

    <div class="flex-v-center gap-2">
      <ClearFilter v-if="!isMobile.matched" />
      <QuerySearchBar />
      <ContinentFilter />
      <CountrySort />
    </div>
  </div>
</template>
