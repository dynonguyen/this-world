<script setup lang="ts">
defineProps<{ icon: string; label: string; tooltip?: string }>()
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="tooltip" :data-tip="tooltip">
    <div class="btn btn-sm size-10 p-1 md:px-3 md:size-auto" v-bind="$attrs">
      <span class="icon size-5 md:size-4" :class="icon"></span>
      <span class="hidden md:inline-block">{{ label }}</span>
    </div>
  </div>
</template>
