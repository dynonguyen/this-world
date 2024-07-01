import { onMounted, onUnmounted } from 'vue'
import type { AllRef } from '~/types/common'

export const useKeyPress = (
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  shouldTrigger: AllRef<boolean>
) => {
  const keyPressHandler = (event: KeyboardEvent) => {
    if (shouldTrigger.value && event.key === targetKey) callback(event)
  }

  onMounted(() => document.body.addEventListener('keydown', keyPressHandler))

  onUnmounted(() => document.body.removeEventListener('keydown', keyPressHandler))
}
