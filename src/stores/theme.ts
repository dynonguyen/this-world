import { defineStore } from 'pinia'
import { onMounted, readonly, ref } from 'vue'
import { LS_KEY, STORE_KEY } from '~/constants/key'

type Mode = 'light' | 'dark'

const changeAndPersistTheme = (mode: Mode) => {
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.classList.add(mode)
  document.documentElement.classList.remove(mode === 'dark' ? 'light' : 'dark')
  localStorage.setItem(LS_KEY.THEME, mode)
}

export const useThemeMode = defineStore(STORE_KEY.THEME, () => {
  const mode = ref<Mode>(localStorage.getItem(LS_KEY.THEME) === 'dark' ? 'dark' : 'light')

  onMounted(() => changeAndPersistTheme(mode.value))

  function setTheme(newMode: Mode) {
    if (newMode !== mode.value) {
      mode.value = newMode
      changeAndPersistTheme(newMode)
    }
  }

  function toggleTheme() {
    setTheme(mode.value === 'light' ? 'dark' : 'light')
  }

  return { mode: readonly(mode), setTheme, toggleTheme }
})
