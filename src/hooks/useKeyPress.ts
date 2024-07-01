import { onMounted, onUnmounted } from 'vue'
import type { AllRef } from '~/types/common'

export const useKeyPress = (
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  shouldTrigger?: AllRef<boolean>
) => {
  const keyPressHandler = (ev: KeyboardEvent) => {
    if (shouldTrigger?.value && ev.key === targetKey) {
      ev.preventDefault()
      callback(ev)
    }
  }

  onMounted(() => document.body.addEventListener('keydown', keyPressHandler))

  onUnmounted(() => document.body.removeEventListener('keydown', keyPressHandler))
}
