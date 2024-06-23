import type { Directive } from 'vue'

export const vOutsideClick: Directive<HTMLElement & { clickOutsideEvent: (ev: MouseEvent) => void }, () => void> = {
  mounted(el, binding) {
    el.clickOutsideEvent = (ev: MouseEvent) => {
      const excludeElId = binding.arg
      const excludeEl = excludeElId ? document.getElementById(excludeElId) : null
      const target = ev.target as Node

      if (
        !(el == target || el.contains(target)) &&
        !(excludeEl && (target == excludeEl || excludeEl.contains(target)))
      ) {
        binding.value()
      }
    }
    window.addEventListener('click', el.clickOutsideEvent)
  },
  beforeUnmount(el) {
    window.removeEventListener('click', el.clickOutsideEvent)
  }
}
