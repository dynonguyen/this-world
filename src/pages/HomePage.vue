<script setup lang="ts">
import ThemeController from '~/components/ThemeController.vue'
import { useUserLocationStore } from '~/stores/user-location'

const { userLocation } = useUserLocationStore()
</script>

<template>
  <ThemeController />
  {{ userLocation }}
</template>
