import { defineStore } from 'pinia'
import { ref } from 'vue'
import { STORE_KEY } from '~/constants/key'

export const useCountryQuickView = defineStore(STORE_KEY.COUNTRY_QUICK_VIEW, () => {
  const id = ref<string>('')

  return { id }
})
