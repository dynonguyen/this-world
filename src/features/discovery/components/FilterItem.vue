<script setup lang="ts">
defineProps<{ icon: string; label: string; active?: boolean }>()
</script>

<template>
  <a class="flex-v-center gap-2" :data-active="active">
    <span class="icon size-4" :class="icon"></span>
    {{ label }}
  </a>
</template>
