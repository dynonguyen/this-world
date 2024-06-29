<script setup lang="ts">
defineProps<{ title?: string }>()
defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div class="modal-box flex flex-col p-0">
    <div v-if="$props.title || $slots.title" class="border-b base-border p-4 flex-v-center justify-between">
      <h3 class="font-semibold text-lg">
        <slot name="title">{{ $props.title }}</slot>
      </h3>
      <span class="icon ph-x size-5 cursor-pointer hover:opacity-85" @click="$emit('close')"></span>
    </div>

    <div class="overflow-auto grow">
      <slot></slot>
    </div>
  </div>
</template>
