<script setup lang="ts">
defineProps<{ title?: string }>()
defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div class="modal-box flex flex-col p-0 overflow-hidden">
    <div v-if="$props.title || $slots.title" class="border-b border-neutral-divider p-4 flex-v-center justify-between">
      <h3 class="font-semibold text-lg">
        <slot name="title">{{ $props.title }}</slot>
      </h3>
      <span class="icon ph-x size-5 cursor-pointer hover:opacity-85" @click="$emit('close')"></span>
    </div>

    <div class="overflow-auto grow">
      <slot></slot>
    </div>

    <div v-if="$slots.action" class="p-4 border-t border-neutral-divider">
      <slot name="action"></slot>
    </div>
  </div>
</template>
