import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const usePageLoading = () => {
  const isLoading = ref(false)
  const router = useRouter()

  router.beforeEach((to, from, next) => {
    if (to.path !== from.path) isLoading.value = true
    next()
  })

  router.afterEach(() => {
    isLoading.value = false
  })

  return isLoading
}
