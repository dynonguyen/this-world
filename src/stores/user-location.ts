import to from 'await-to-js'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import { LS_KEY, STORE_KEY } from '~/constants/key'
import { safeJsonParse } from '~/utils/helpers'

type UserLocation = {
  country: string
  countryCode: string
  isVie: boolean
}

const getUserLocation = async () => {
  const lsLocation = safeJsonParse<UserLocation>(localStorage.getItem(LS_KEY.LOCATION) || '')

  if (lsLocation && lsLocation.countryCode) return lsLocation

  const [_, response = {}] = await to(fetch('http://ip-api.com/json').then(res => res.json()))

  localStorage.setItem(LS_KEY.LOCATION, JSON.stringify(response))

  return response as UserLocation
}

export const useUserLocationStore = defineStore(STORE_KEY.USER_LOCATION, () => {
  const userLocation = ref<UserLocation>({ country: 'Viet Nam', countryCode: 'VN', isVie: true })

  getUserLocation().then(lo => {
    userLocation.value = { ...lo, isVie: lo.countryCode === 'VN' }
  })

  return { userLocation: readonly(userLocation) }
})
