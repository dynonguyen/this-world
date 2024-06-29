<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'
import CountryQuickView from '~/features/country/components/QuickView.vue'
import DiscoveryContent from '~/features/discovery/components/DiscoveryContent.vue'
import FilterBar from '~/features/discovery/components/filter-bar/FilterBar.vue'
import ScrollTop from '~/layouts/ScrollTop.vue'
</script>

<template>
  <PageTitle>Discovery</PageTitle>
  <FilterBar class="mb-4 py-2" />
  <DiscoveryContent />

  <CountryQuickView />
  <ScrollTop />
</template>
