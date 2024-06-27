type EnvKey = 'VITE_BASE_URL'
export function getEnv(key: EnvKey) {
  return import.meta.env[key] || ''
}

export function withAssets(path: string) {
  return `${getEnv('VITE_BASE_URL')}/${path}`
}

export function safeJsonParse<T extends object>(raw: string | null | undefined, fallbackValue = {} as T): T {
  try {
    return raw ? JSON.parse(raw) : fallbackValue
  } catch (error) {
    return fallbackValue as T
  }
}

export function numberWithCommas(value: number, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export function textToSpeech(text: string, utteranceOpts?: Partial<SpeechSynthesisUtterance>) {
  if (speechSynthesis.speaking) return

  const utterance = new SpeechSynthesisUtterance(text)

  utterance.lang = 'en-US'
  if (utteranceOpts) Object.assign(utterance, utteranceOpts)

  speechSynthesis.speak(utterance)
}
