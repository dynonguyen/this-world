<script setup lang="ts">
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dropdown from '~/components/Dropdown.vue'
import { SortOrder } from '~/constants/common'
import { FILTER_QUERY_KEY } from '~/constants/key'
import FilterButton from './FilterButton.vue'
import FilterItem from './FilterItem.vue'

const open = ref(false)
const route = useRoute()
const router = useRouter()

type SortItem = { label: string; by: string; order: SortOrder; active?: boolean }
const sort = computed<{ items: SortItem[]; current?: SortItem }>(() => {
  const query = route.query
  const sortedField = query[FILTER_QUERY_KEY.SORT_BY] || ''
  const sortedOrder = query[FILTER_QUERY_KEY.SORT_ORDER] || ''

  const items = [
    { label: 'Name', by: 'name.common', order: SortOrder.ASC },
    { label: 'Name', by: 'name.common', order: SortOrder.DESC },
    { label: 'Population', by: 'population.total', order: SortOrder.ASC },
    { label: 'Population', by: 'population.total', order: SortOrder.DESC },
    { label: 'Area', by: 'area', order: SortOrder.ASC },
    { label: 'Area', by: 'area', order: SortOrder.DESC }
  ].map(item => ({ ...item, active: sortedField === item.by && item.order === sortedOrder }))
  const sortedItem = items.find(item => item.active)

  return { items, current: sortedItem }
})

const handleSortChange = (item: SortItem) => {
  if (sort.value.current && sort.value.current.by === item.by && sort.value.current.order === item.order) {
    router.push({
      query: omit(route.query, [FILTER_QUERY_KEY.SORT_BY, FILTER_QUERY_KEY.SORT_ORDER])
    })
  } else {
    router.push({
      query: { ...route.query, [FILTER_QUERY_KEY.SORT_BY]: item.by, [FILTER_QUERY_KEY.SORT_ORDER]: item.order }
    })
  }

  open.value = false
}

const getSortIcon = (order: SortOrder) => (order === SortOrder.ASC ? 'uil-sort-amount-up' : 'uil-sort-amount-down')
</script>

<template>
  <Dropdown v-model:open="open" class="dropdown-end" :menu-props="{ class: 'w-44' }">
    <template #action>
      <FilterButton
        :icon="sort.current ? getSortIcon(sort.current.order) : 'uil-sort'"
        :label="sort.current ? sort.current.label : 'Sort'"
        :active="Boolean(sort.current)"
        @click="open = !open"
        tooltip="Sort"
      />
    </template>
    <template #list>
      <li v-for="s in sort.items" :key="s.by" @click="handleSortChange(s)">
        <FilterItem v-bind="s" :icon="getSortIcon(s.order)" />
      </li>
    </template>
  </Dropdown>
</template>
