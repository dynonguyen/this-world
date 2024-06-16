type EnvKey = 'VITE_BASE_URL'
export function getEnv(key: EnvKey) {
  return import.meta.env[key] || ''
}

export const withAssets = (path: string) => `${getEnv('VITE_BASE_URL')}/${path}`
