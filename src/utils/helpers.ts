import type { Country } from '~/types/Country'

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

export function countrySearch(c: Country, keyword: string): boolean {
  const lowerKeyword = keyword.toLowerCase()

  return (
    c.cca3.toLowerCase().includes(lowerKeyword) ||
    c.cca2.toLowerCase().includes(lowerKeyword) ||
    c.name.common.toLowerCase().includes(lowerKeyword) ||
    c.name.official.toLowerCase().includes(lowerKeyword) ||
    c.capital.toLowerCase().includes(lowerKeyword) ||
    c.fifaCode.toLowerCase().includes(lowerKeyword) ||
    c.cioc.toLowerCase().includes(lowerKeyword) ||
    c.name.vieName.toLowerCase().includes(lowerKeyword)
  )
}

export function toNumber(value: any, fallbackValue: number, opts?: { min?: number; max?: number }) {
  const num = Number(value)

  if (isNaN(num)) return fallbackValue

  if (opts?.min !== undefined && num < opts.min) return fallbackValue
  if (opts?.max !== undefined && num > opts.max) return fallbackValue

  return num
}
