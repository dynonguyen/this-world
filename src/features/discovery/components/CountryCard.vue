<script setup lang="ts">
import { useUserLocationStore } from '~/stores/user-location'
import type { Country } from '~/types/Country'

defineProps<Country>()

const isVie = useUserLocationStore().userLocation.isVie
</script>

<template>
  <div
    class="bg-gray-50/10 dark:bg-gray-600/20 rounded-2xl cursor-pointer transition-shadow p-4 flex flex-col gap-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl"
  >
    <img :src="flag" alt="Shoes" class="h-36 w-full object-cover object-center rounded-lg" />
    <div class="flex flex-col">
      <h2 class="text-lg font-semibold">{{ name.common }}</h2>
      <span v-if="isVie" class="text-sm text-neutral-main">{{ name.vieName }}</span>
    </div>
  </div>
</template>
