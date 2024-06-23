<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NAVIGATION } from '~/constants/common'

const route = useRoute()
const navItems = computed(() => NAVIGATION.map(item => ({ ...item, active: route.path.includes(item.to) })))
</script>

<template>
  <ul class="flex-v-center gap-2 p-3 justify-around border-t border-neutral-divider border-solid">
    <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
      <li class="flex-center flex-col gap-1" :class="{ 'text-primary': item.active }">
        <span class="icon size-6" :class="item.active ? item.activeIcon : item.icon"></span>
        <span class="text-xs">{{ item.label }}</span>
      </li>
    </RouterLink>
  </ul>
</template>
