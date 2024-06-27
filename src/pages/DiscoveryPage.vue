<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'
import FilterBar from '~/features/discovery/components/filter-bar/FilterBar.vue'
import GalleryView from '~/features/discovery/components/gallery/GalleryView.vue'
</script>

<template>
  <PageTitle>Discover Countries</PageTitle>

  <FilterBar class="mb-4 py-2" />

  <GalleryView />
</template>
