import to from 'await-to-js'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import { LS_KEY, STORE_KEY } from '~/constants/key'
import { safeJsonParse } from '~/utils/helpers'

type UserLocation = {
  continentCode: string
  continentName: string
  countryCode: string
  countryName: string
  city: string
  isVie: boolean
}

const IP_API_URL = 'https://api.db-ip.com/v2/free/self'

const getUserLocation = async () => {
  const lsLocation = safeJsonParse<UserLocation>(localStorage.getItem(LS_KEY.LOCATION) || '')

  if (lsLocation && lsLocation.countryCode) return lsLocation

  const [_, response = {}] = await to(fetch(IP_API_URL).then(res => res.json()))

  localStorage.setItem(LS_KEY.LOCATION, JSON.stringify(response))

  return response as UserLocation
}

export const useUserLocationStore = defineStore(STORE_KEY.USER_LOCATION, () => {
  const userLocation = ref<Partial<UserLocation>>({ countryName: 'Viet Nam', countryCode: 'VN', isVie: true })

  getUserLocation().then(lo => {
    userLocation.value = { ...lo, isVie: lo.countryCode === 'VN' }
  })

  return { userLocation: readonly(userLocation) }
})
