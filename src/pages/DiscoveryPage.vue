<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'
import QuerySearchBar from '~/components/QuerySearchBar.vue'
import ClearAllFilter from '~/features/discovery/components/ClearAllFilter.vue'
import ContinentFilter from '~/features/discovery/components/ContinentFilter.vue'
import CountriesGallery from '~/features/discovery/components/CountriesGallery.vue'
import CountrySort from '~/features/discovery/components/CountrySort.vue'
import ViewAs from '~/features/discovery/components/ViewAs.vue'
</script>

<template>
  <PageTitle>Discover Countries</PageTitle>

  <div class="flex-v-center flex-wrap gap-2 justify-between">
    <ViewAs />

    <div class="flex-v-center gap-2">
      <ClearAllFilter />
      <QuerySearchBar by="country" />
      <ContinentFilter />
      <CountrySort />
    </div>
  </div>

  <div class="mt-4">
    <CountriesGallery />
  </div>
</template>
