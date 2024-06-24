import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const usePageLoading = () => {
  const isLoading = ref(false)
  const router = useRouter()

  router.beforeEach((_, __, next) => {
    isLoading.value = true
    next()
  })

  router.afterEach(() => {
    isLoading.value = false
  })

  return isLoading
}
