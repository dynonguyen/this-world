<script setup lang="ts">
import ActionButton from '~/components/ActionButton.vue'
import GlobalSearch from '~/features/search/GlobalSearch.vue'
import { useIsMobile } from '~/stores/is-mobile'
import AppLogo from './AppLogo.vue'
import ThemeController from './ThemeController.vue'
import TopNavigation from './TopNavigation.vue'

const isMobileStore = useIsMobile()
</script>

<template>
  <div class="flex-v-center h-14 justify-between px-4 base-border-bottom gap-2">
    <div class="flex-v-center gap-2 md:gap-4 grow">
      <div class="shrink-0">
        <AppLogo />
      </div>
      <div class="grow w-full md:max-w-80">
        <GlobalSearch />
      </div>
    </div>

    <div class="flex-v-center gap-2">
      <div class="hidden sm:flex-v-center gap-4" v-if="!isMobileStore.matched">
        <TopNavigation />
        <div class="w-[1px] h-5 bg-neutral-divider mr-2"></div>
      </div>

      <ThemeController />

      <a href="https://github.com/dynonguyen/this-world" target="_blank">
        <ActionButton icon="uil-github" />
      </a>
    </div>
  </div>
</template>
