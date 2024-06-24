<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from '~/components/Loading.vue'
import { usePageLoading } from '~/hooks/usePageLoading'
import { useCountriesStore } from '~/stores/countries'
import { useIsMobile } from '~/stores/is-mobile'
import BottomNavigation from './BottomNavigation.vue'
import FooterBar from './FooterBar.vue'
import TopBar from './TopBar.vue'

const isMobileStore = useIsMobile()
const store = useCountriesStore()
const isPageLoading = usePageLoading()
</script>

<template>
  <div class="flex flex-col h-dvh w-dvw overflow-hidden">
    <div class="w-dvw shrink-0">
      <TopBar />
    </div>

    <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <div class="grow mx-auto p-4 max-w-6xl w-full">
        <Loading v-if="!store.initialized || isPageLoading" />
        <RouterView v-else />
      </div>

      <div class="mt-auto">
        <FooterBar />
      </div>
    </div>

    <BottomNavigation v-if="isMobileStore.matched" />
  </div>
</template>
