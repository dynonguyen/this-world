<script setup lang="ts">
import { omit } from 'lodash-es'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FILTER_QUERY_KEY } from '~/constants/key'
import { CONTINENT_FILTER_KEY } from './ContinentFilter.vue'

const route = useRoute()
const router = useRouter()

const filterKeys = [CONTINENT_FILTER_KEY, FILTER_QUERY_KEY.KEYWORD, FILTER_QUERY_KEY.SORT_BY]

const hasFilter = computed(() => filterKeys.some(key => route.query[key]))

const handleClear = () => {
  router.push({ query: omit(route.query, filterKeys) })
}
</script>

<template>
  <button
    v-if="hasFilter"
    class="btn btn-ghost btn-sm hidden md:flex text-error hover:!bg-error/15"
    @click="handleClear"
  >
    <span class="icon ph-x-circle-bold"></span>
    Clear
  </button>
</template>
