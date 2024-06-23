<script setup lang="ts">
import { withAssets } from '~/utils/helpers'
</script>

<template>
  <div class="max-w-md mx-auto my-12">
    <img :src="withAssets('img/coming-soon.svg')" />
    <div class="text-center text-3xl font-semibold mt-6">Coming Soon</div>
  </div>
</template>
