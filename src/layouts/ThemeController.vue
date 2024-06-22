<script setup lang="ts">
import ActionButton from '~/components/ActionButton.vue'
import { useThemeMode } from '~/stores/theme'

const theme = useThemeMode()
</script>

<template>
  <ActionButton :icon="theme.mode === 'dark' ? 'ph-sun' : 'ph-moon'" @click="theme.toggleTheme" />
</template>
