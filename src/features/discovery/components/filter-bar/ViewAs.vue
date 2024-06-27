<script lang="ts">
export enum ViewType {
  List = 'list',
  Gallery = 'gallery',
  Table = 'table'
}
export const DEFAULT_VIEW_AS = ViewType.Gallery
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dropdown from '~/components/Dropdown.vue'
import { FILTER_QUERY_KEY } from '~/constants/key'
import FilterButton from './FilterButton.vue'
import FilterItem from './FilterItem.vue'

const open = ref(false)
const route = useRoute()
const router = useRouter()

type ViewItem = { type: ViewType; icon: string; label: string; active?: boolean }
const view = computed<{ items: ViewItem[]; current: ViewItem }>(() => {
  const query = route.query
  const filtered = query[FILTER_QUERY_KEY.VIEW_AS] || DEFAULT_VIEW_AS

  const items: ViewItem[] = [
    { type: ViewType.Gallery, icon: 'uil-apps', label: 'Gallery' },
    { type: ViewType.List, icon: 'uil-list-ul', label: 'List' },
    { type: ViewType.Table, icon: 'ph-table', label: 'Table' }
  ].map(view => ({ ...view, active: view.type === filtered }))

  return { current: items.find(view => view.active) || items[0], items }
})

const handleViewChange = (type: ViewType) => {
  router.push({ query: { ...route.query, [FILTER_QUERY_KEY.VIEW_AS]: type } })
  open.value = false
}
</script>

<template>
  <Dropdown v-model:open="open" :menu-props="{ class: 'w-44' }">
    <template #action>
      <FilterButton :icon="view.current.icon" :label="view.current.label" tooltip="View as" @click="open = !open" />
    </template>
    <template #list>
      <li v-for="v in view.items" :key="v.type" @click="handleViewChange(v.type)">
        <FilterItem v-bind="v" />
      </li>
    </template>
  </Dropdown>
</template>
