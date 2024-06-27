<script lang="ts">
export const FAVORITE_FILTER_KEY = 'favorite'
</script>

<script setup lang="ts">
import { omit } from 'lodash-es'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterButton from './FilterButton.vue'

const route = useRoute()
const router = useRouter()

const isFavorite = computed(() => Number(route.query[FAVORITE_FILTER_KEY]) === 1)

const handleToggleFavorite = () => {
  if (isFavorite.value) router.push({ query: omit(route.query, FAVORITE_FILTER_KEY) })
  else router.push({ query: { ...route.query, [FAVORITE_FILTER_KEY]: 1 } })
}
</script>

<template>
  <FilterButton
    :icon="isFavorite ? 'ph-heart-fill !text-red-500' : 'ph-heart-bold'"
    label="Favorite"
    tooltip="Favorite"
    :active="isFavorite"
    @click="handleToggleFavorite"
  />
</template>
