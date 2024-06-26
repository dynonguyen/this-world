type EnvKey = 'VITE_BASE_URL'
export function getEnv(key: EnvKey) {
  return import.meta.env[key] || ''
}

export function withAssets(path: string) {
  return `${getEnv('VITE_BASE_URL')}/${path}`
}

export function safeJsonParse<T extends object>(raw: string): T {
  try {
    return JSON.parse(raw)
  } catch (error) {
    return {} as T
  }
}

export function numberWithCommas(value: number, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}
