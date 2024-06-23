<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'
import Sort from '~/features/discovery/components/Sort.vue'
import ViewAs from '~/features/discovery/components/ViewAs.vue'
</script>

<template>
  <PageTitle>Discover countries around the <b class="text-primary/70">World</b> 🌍</PageTitle>

  <div class="flex-v-center flex-wrap gap-2 justify-between">
    <div>Hi</div>

    <div class="flex-v-center gap-2">
      <ViewAs />
      <Sort />
    </div>
  </div>
</template>
