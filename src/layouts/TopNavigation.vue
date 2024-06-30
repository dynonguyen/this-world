<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NAVIGATION } from '~/constants/common'

const route = useRoute()

const navItems = computed(() =>
  NAVIGATION.map(item => ({
    ...item,
    active: route.path.includes(item.to) || item.extendActivePaths?.some(p => route.path.includes(p))
  }))
)
</script>

<template>
  <ul class="flex-v-center gap-4">
    <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
      <li class="text-sm font-medium hover:text-primary transition-colors" :class="{ 'text-primary': item.active }">
        <div class="flex-v-center gap-1">
          <span class="icon size-4 hidden md:inline-block" :class="item.active ? item.activeIcon : item.icon"></span>
          <span>{{ item.label }}</span>
        </div>
      </li>
    </RouterLink>
  </ul>
</template>
