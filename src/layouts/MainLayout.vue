<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCountriesStore } from '~/stores/countries'
import { useIsMobile } from '~/stores/is-mobile'
import BottomNavigation from './BottomNavigation.vue'
import FooterBar from './FooterBar.vue'
import TopBar from './TopBar.vue'

const isMobileStore = useIsMobile()
const store = useCountriesStore()
</script>

<template>
  <div class="flex flex-col h-dvh w-dvw overflow-hidden">
    <div class="w-dvw shrink-0">
      <TopBar />
    </div>

    <div class="flex-1 flex flex-col overflow-auto">
      <div class="grow mx-auto p-4 max-w-6xl w-full">
        <RouterView v-if="store.initialized" />
        <div v-else class="flex-center my-10">
          <span class="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>

      <div class="mt-auto">
        <FooterBar />
      </div>
    </div>

    <BottomNavigation v-if="isMobileStore.matched" />
  </div>
</template>
