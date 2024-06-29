<script setup lang="ts">
import { debounce, omit } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'
import { FILTER_QUERY_KEY } from '~/constants/key'

const route = useRoute()
const router = useRouter()

const handleSearchChange = debounce((ev: Event) => {
  const keyword = (ev.target as HTMLInputElement).value.trim()

  if (!keyword) {
    return router.push({ query: omit(route.query, FILTER_QUERY_KEY.KEYWORD) })
  }

  router.push({
    query: { ...route.query, [FILTER_QUERY_KEY.KEYWORD]: keyword }
  })
}, 300)
</script>

<template>
  <label class="input input-ghost bg-gray-100 dark:bg-gray-700 input-sm flex items-center gap-2 h-10 md:h-8">
    <input
      :value="route.query[FILTER_QUERY_KEY.KEYWORD]"
      type="text"
      class="grow"
      placeholder="Search"
      @input="handleSearchChange"
    />
    <span class="icon uil-search text-base-content/75"></span>
  </label>
</template>
