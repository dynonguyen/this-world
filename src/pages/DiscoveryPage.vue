<script setup lang="ts">
import DiscoveryTitle from '~/features/discovery/components/DiscoveryTitle.vue'
import Sort from '~/features/discovery/components/Sort.vue'
import ViewAs from '~/features/discovery/components/ViewAs.vue'
</script>

<template>
  <DiscoveryTitle />

  <div class="flex-v-center flex-wrap gap-2 justify-between">
    <div>Hi</div>

    <div class="flex-v-center gap-2">
      <ViewAs />
      <Sort />
    </div>
  </div>
</template>
