<script lang="ts">
export const SORT_PARAM_KEY = 's'
export const DEFAULT_SORT_ORDER = SortOrder.ASC
</script>

<script setup lang="ts">
import clsx from 'clsx'
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dropdown from '~/components/Dropdown.vue'
import { SortOrder } from '~/constants/common'
import type { Country } from '~/types/Country'
import FilterButton from './FilterButton.vue'

const open = ref(false)
const route = useRoute()
const router = useRouter()

type SortItem = { label: string; by: keyof Country; active?: boolean }
const sort = computed<{ hasSort: boolean; items: SortItem[] }>(() => {
  const query = route.query
  const filtered = ((query[SORT_PARAM_KEY] || '') as string).split(',').filter(Boolean)

  const items = [
    { label: 'Code', by: 'code' },
    { label: 'Name', by: 'name' },
    { label: 'Population', by: 'population' }
  ].map(item => ({ ...item, active: filtered.includes(item.by) })) as SortItem[]

  return { hasSort: filtered.length > 0, items }
})

const handleSortChange = (by: SortItem['by']) => {
  const query = omit(route.query, SORT_PARAM_KEY)
  const filtered = ((query[SORT_PARAM_KEY] || '') as string).split(',').filter(Boolean)

  if (filtered.includes(by)) filtered.splice(filtered.indexOf(by), 1)
  else filtered.push(by)

  const newSort = filtered.join(',')
  console.log(filtered)

  if (!newSort) delete query[SORT_PARAM_KEY]
  else query[SORT_PARAM_KEY] = newSort

  console.log(query)

  router.push({ query })
}
</script>

<template>
  <Dropdown v-model:open="open" class="dropdown-end" :menu-props="{ class: 'w-36' }">
    <template #action>
      <FilterButton :icon="clsx('uil-sort', { 'text-primary': sort.hasSort })" label="Sort" @click="open = !open" />
    </template>
    <template #list>
      <li v-for="s in sort.items" :key="s.by" @click="handleSortChange(s.by)">
        <a class="flex-v-center gap-2" :data-active="s.active">
          {{ s.label }}
        </a>
      </li>
    </template>
  </Dropdown>
</template>
