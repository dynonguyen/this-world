import { defineStore } from 'pinia'
import { ref } from 'vue'
import { STORE_KEY } from '~/constants/key'

export const useCountryQuickView = defineStore(STORE_KEY.COUNTRY_QUICK_VIEW, () => {
  const code = ref<string>('')

  return { code }
})
