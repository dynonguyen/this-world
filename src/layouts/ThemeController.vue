<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ActionButton from '~/components/ActionButton.vue'
import { useThemeMode } from '~/stores/theme'

const themeStore = useThemeMode()
const { toggleTheme } = themeStore

const mode = storeToRefs(themeStore).mode
</script>

<template>
  <ActionButton :icon="mode === 'dark' ? 'ph-sun' : 'ph-moon'" @click="toggleTheme" />
</template>
