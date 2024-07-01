<script setup lang="ts">
import { uniqueId } from 'lodash-es'
import { ref, watch, type HTMLAttributes, type OlHTMLAttributes } from 'vue'
import { vOutsideClick } from '~/directives/v-outside-click'
import { useKeyPress } from '~/hooks/useKeyPress'

defineProps<{ menuProps?: OlHTMLAttributes; actionProps?: Omit<HTMLAttributes, 'id'> }>()
const open = defineModel<boolean>('open')
const list = ref<HTMLUListElement | null>(null)

const actionId = uniqueId('dropdown-')
const FOCUSED_CLASS = 'focused'

const handleFocus = (ev: KeyboardEvent, up: boolean) => {
  ev.stopPropagation()
  ev.preventDefault()

  if (!list.value) return
  const items = list.value.querySelectorAll('li')

  if (!items.length) return

  let focusedIndex = -1
  const len = items.length

  for (let i = 0; i < len; ++i) {
    if (items[i].classList.contains(FOCUSED_CLASS)) {
      focusedIndex = i
      items[i].classList.remove(FOCUSED_CLASS)
      break
    }
  }

  if (up) {
    focusedIndex--
    focusedIndex < 0 && (focusedIndex = len - 1)
  } else {
    focusedIndex++
    focusedIndex > len - 1 && (focusedIndex = 0)
  }

  items[focusedIndex].classList.add(FOCUSED_CLASS)
}

const handleEnter = () => {
  const focused = list.value?.querySelector(`li.${FOCUSED_CLASS}`) as HTMLElement | null
  if (focused) focused.click()
}

useKeyPress('ArrowDown', ev => handleFocus(ev, false), open)
useKeyPress('ArrowUp', ev => handleFocus(ev, true), open)
useKeyPress('Enter', handleEnter, open)

watch(open, () => {
  if (open.value && !list.value?.querySelector(`li.${FOCUSED_CLASS}`)) {
    list.value?.querySelector('li')?.classList.add(FOCUSED_CLASS)
  }
})
</script>

<template>
  <div class="dropdown dropdown-bottom" :class="{ 'dropdown-open': open }">
    <div :id="actionId" v-bind="actionProps">
      <slot name="action"></slot>
    </div>

    <ul
      ref="list"
      v-outside-click:[actionId]="() => (open = false)"
      class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box gap-1"
      v-bind="menuProps"
    >
      <slot name="list"></slot>
    </ul>
  </div>
</template>
