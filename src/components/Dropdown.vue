<script setup lang="ts">
import { uniqueId } from 'lodash-es'
import type { HTMLAttributes, OlHTMLAttributes } from 'vue'
import { vOutsideClick } from '~/directives/v-outside-click'

defineProps<{ menuProps?: OlHTMLAttributes; actionProps?: Omit<HTMLAttributes, 'id'> }>()
const open = defineModel<boolean>('open')

const actionId = uniqueId('dropdown-')
</script>

<template>
  <div class="dropdown dropdown-bottom" :class="{ 'dropdown-open': open }">
    <div :id="actionId" v-bind="actionProps">
      <slot name="action"></slot>
    </div>

    <ul
      v-outside-click:[actionId]="() => (open = false)"
      class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box gap-1"
      v-bind="menuProps"
    >
      <slot name="list"></slot>
    </ul>
  </div>
</template>
