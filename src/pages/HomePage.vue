<script setup lang="ts">
import ThemeController from '~/components/ThemeController.vue'
import { useUserLocationStore } from '~/stores/user-location'

const { userLocation } = useUserLocationStore()
</script>

<template>
  <button class="btn btn-primary">Button {{ userLocation.country }}</button>
  <ThemeController />
  <div style="height: 200vh">HomePage</div>
</template>
