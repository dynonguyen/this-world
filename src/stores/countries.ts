import to from 'await-to-js'
import { defineStore } from 'pinia'
import { reactive, readonly, ref } from 'vue'
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
  const countries = reactive<Country[]>([])
  const countryByCode = reactive<CountryMap>({})
  const groupedByContinent = reactive<Record<string, string[]>>({})

  fetchCountries().then((data) => {
    initialized.value = true

    data.forEach((country) => {
      countries.push(country)
      countryByCode[country.code] = country

      country.continents.forEach((continent) => {
        !groupedByContinent[continent]
          ? (groupedByContinent[continent] = [country.code])
          : groupedByContinent[continent].push(country.code)
      })
    })
  })

  return readonly({ initialized, countries, countryByCode, groupedByContinent })
})
