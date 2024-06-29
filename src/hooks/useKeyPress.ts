import { onMounted, onUnmounted, type Ref } from 'vue'

export const useKeyPress = (targetKey: string, callback: () => void, shouldTrigger: Ref<boolean>) => {
  const keyPressHandler = (event: KeyboardEvent) => {
    if (shouldTrigger.value && event.key === targetKey) callback()
  }

  onMounted(() => document.body.addEventListener('keydown', keyPressHandler))

  onUnmounted(() => document.body.removeEventListener('keydown', keyPressHandler))
}
