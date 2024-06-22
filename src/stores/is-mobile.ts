import { debounce } from 'lodash-es'
import { defineStore } from 'pinia'
import { onMounted, onUnmounted, readonly, ref } from 'vue'
import { STORE_KEY } from '~/constants/key'

const isMobile = () => window.matchMedia('(max-width: 576px)').matches

export const useIsMobile = defineStore(STORE_KEY.IS_MOBILE, () => {
  const matched = ref(isMobile())

  const detectSize = debounce(() => {
    matched.value = isMobile()
  }, 200)

  onMounted(() => window.addEventListener('resize', detectSize))
  onUnmounted(() => window.removeEventListener('resize', detectSize))

  return { matched: readonly(matched) }
})
