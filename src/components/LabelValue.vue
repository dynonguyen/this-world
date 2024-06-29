<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

export type LabelValueProps = {
  label?: string | number
  value?: string | number
  isHtml?: boolean
  labelWidth?: number
  attrs?: { label?: HTMLAttributes; value?: HTMLAttributes }
}

withDefaults(defineProps<LabelValueProps>(), { labelWidth: 120 })
</script>

<template>
  <div v-if="Boolean(value)" class="label-value flex flex-col gap-1 sm:flex-row sm:gap-2">
    <div
      class="text-sm font-normal text-neutral-main shrink-0 break-words"
      :style="{ width: `${$props.labelWidth}px` }"
      v-bind="attrs?.label"
    >
      <slot name="label">{{ $props.label }}:</slot>
    </div>
    <div class="text-sm font-medium grow" v-bind="attrs?.value">
      <slot name="value">
        <div v-if="isHtml" v-html="value"></div>
        <template v-else>{{ value }}</template>
      </slot>
    </div>
  </div>
</template>
