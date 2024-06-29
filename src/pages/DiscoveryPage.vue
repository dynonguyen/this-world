<script setup lang="ts">
import DiscoveryContent from '~/features/discovery/components/DiscoveryContent.vue'
import FilterBar from '~/features/discovery/components/filter-bar/FilterBar.vue'
</script>

<template>
  <!-- <PageTitle>Discover Countries & Territories</PageTitle> -->
  <FilterBar class="mb-4 py-2" />
  <DiscoveryContent />
</template>
