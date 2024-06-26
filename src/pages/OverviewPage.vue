<script setup lang="ts">
import PageTitle from '~/components/PageTitle.vue'
import ContinentsOverview from '~/features/overview/components/ContinentsOverview.vue'
import Statistics from '~/features/overview/components/Statistics.vue'
</script>

<template>
  <PageTitle>Overview</PageTitle>

  <div class="flex flex-col gap-6">
    <Statistics />
    <ContinentsOverview />
  </div>
</template>
