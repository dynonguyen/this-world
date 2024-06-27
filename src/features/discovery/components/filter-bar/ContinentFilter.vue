<script lang="ts">
export const CONTINENT_FILTER_KEY = 'continent'
</script>

<script setup lang="ts">
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dropdown from '~/components/Dropdown.vue'
import { Continent } from '~/types/Country'
import { continentMapping } from '~/utils/mapping'
import FilterButton from './FilterButton.vue'
import FilterItem from './FilterItem.vue'

const open = ref(false)
const route = useRoute()
const router = useRouter()

type ContinentItem = { type: Continent; icon: string; label: string; active?: boolean }
const continent = computed<{ items: ContinentItem[]; current?: ContinentItem }>(() => {
  const query = route.query
  const filtered = query[CONTINENT_FILTER_KEY] || ''

  const items: ContinentItem[] = Object.values(Continent).map(c => {
    const mapping = continentMapping(c)
    return { label: mapping.name, icon: mapping.icon, type: c, active: filtered === c }
  })

  return { current: items.find(i => i.active), items }
})

const handleContinentChange = (type: Continent) => {
  if (continent.value.current?.type === type) {
    router.push({ query: omit(route.query, CONTINENT_FILTER_KEY) })
  } else {
    router.push({ query: { ...route.query, [CONTINENT_FILTER_KEY]: type } })
  }

  open.value = false
}
</script>

<template>
  <Dropdown v-model:open="open" class="dropdown-end" :menu-props="{ class: 'w-48' }">
    <template #action>
      <FilterButton
        :icon="continent.current ? continent.current.icon : 'ph-funnel-simple-bold'"
        :label="continent.current ? continent.current.label : 'Continent'"
        :active="Boolean(continent.current)"
        @click="open = !open"
        tooltip="Continent"
      />
    </template>
    <template #list>
      <li v-for="c in continent.items" :key="c.type" @click="handleContinentChange(c.type)">
        <FilterItem v-bind="c" />
      </li>
    </template>
  </Dropdown>
</template>
