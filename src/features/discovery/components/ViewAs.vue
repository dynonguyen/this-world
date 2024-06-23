<script lang="ts">
export enum ViewType {
  List = 'list',
  Gallery = 'gallery',
  Table = 'table'
}
export const VIEW_AS_PARAM_KEY = 'v'
export const DEFAULT_VIEW_AS = ViewType.Gallery
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dropdown from '~/components/Dropdown.vue'
import FilterButton from './FilterButton.vue'

const open = ref(false)
const route = useRoute()
const router = useRouter()

type ViewItem = { type: ViewType; icon: string; label: string; active?: boolean }
const viewAs = computed<{ current: ViewItem; views: ViewItem[] }>(() => {
  const query = route.query
  const filtered = query[VIEW_AS_PARAM_KEY] || DEFAULT_VIEW_AS

  const views: ViewItem[] = [
    { type: ViewType.Gallery, icon: 'uil-apps', label: 'Gallery' },
    { type: ViewType.List, icon: 'uil-list-ul', label: 'List' },
    { type: ViewType.Table, icon: 'ph-table', label: 'Table' }
  ].map(view => ({ ...view, active: view.type === filtered }))

  return { current: views.find(view => view.active) || views[0], views }
})

const handleChangeView = (type: ViewType) => {
  router.push({ query: { ...route.query, [VIEW_AS_PARAM_KEY]: type } })
  open.value = false
}
</script>

<template>
  <Dropdown v-model:open="open" class="dropdown-end" :menu-props="{ class: 'w-36' }">
    <template #action>
      <FilterButton :icon="viewAs.current.icon" :label="viewAs.current.label" tooltip="View as" @click="open = !open" />
    </template>
    <template #list>
      <li v-for="view in viewAs.views" :key="view.type" @click="handleChangeView(view.type)">
        <a class="flex-v-center gap-2" :data-active="view.active">
          <span class="icon" :class="view.icon"></span>
          <span>{{ view.label }}</span>
        </a>
      </li>
    </template>
  </Dropdown>
</template>
