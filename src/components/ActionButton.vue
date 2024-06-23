<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

type Size = 'small' | 'medium' | 'large'
interface ActionButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  size?: Size
  icon: string
}

/* @vue-ignore */

const props = withDefaults(defineProps<ActionButtonProps>(), { size: 'medium' })
defineOptions({ inheritAttrs: false })

const sizeMapping: Record<Size, [string, string]> = {
  small: ['size-6', 'size-3'],
  medium: ['size-8', 'size-4'],
  large: ['size-10', 'size-5']
}
</script>

<template>
  <button
    class="flex-center base-border rounded-lg transition-colors hover:bg-base-200"
    :class="sizeMapping[props.size][0]"
    v-bind="$attrs"
  >
    <span class="icon text-base-content" :class="`${sizeMapping[props.size][1]} ${props.icon}`"></span>
  </button>
</template>
