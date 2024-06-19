<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterBar from './FooterBar.vue'
import TopBar from './TopBar.vue'
</script>

<template>
  <div class="flex flex-col h-dvh w-dvw overflow-hidden">
    <div class="w-dvw shrink-0">
      <TopBar />
    </div>

    <div class="flex-1 overflow-auto">
      <RouterView />
    </div>

    <div class="w-dvw shrink-0">
      <FooterBar />
    </div>
  </div>
</template>
