import to from 'await-to-js'
import { defineStore } from 'pinia'
import { readonly, ref, shallowRef } from 'vue'
import { ENDPOINT } from '~/constants/endpoint'
import { STORE_KEY } from '~/constants/key'
import { type Country, type CountryMap } from '~/types/Country'
import { withAssets } from '~/utils/helpers'

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(withAssets(ENDPOINT.COUNTRIES))
  const [_, data] = await to(response.json())
  return data || []
}

export const useCountriesStore = defineStore(STORE_KEY.COUNTRIES, () => {
  const initialized = ref(false)
  const countries = shallowRef<Country[]>([])
  const countryByCode = shallowRef<CountryMap>({})
  const groupedByContinent = shallowRef<Record<string, string[]>>({})

  fetchCountries().then(data => {
    const _countryByCode: CountryMap = {}
    const _groupedByContinent: Record<string, string[]> = {}

    data.forEach(country => {
      _countryByCode[country.code] = country

      country.continents.forEach(continent => {
        !_groupedByContinent[continent]
          ? (_groupedByContinent[continent] = [country.code])
          : _groupedByContinent[continent].push(country.code)
      })
    })

    initialized.value = true
    countries.value = data
    countryByCode.value = _countryByCode
    groupedByContinent.value = _groupedByContinent
  })

  return {
    initialized: readonly(initialized),
    countries: readonly(countries),
    countryByCode: readonly(countryByCode),
    groupedByContinent: readonly(groupedByContinent)
  }
})
