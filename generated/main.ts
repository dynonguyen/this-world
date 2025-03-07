/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import { omit } from 'lodash-es'
import path from 'path'
import { z } from 'zod'
import { Continent, Country } from '../src/types/Country'
import { countries } from './raw'

const stringRequired = z.string().trim().min(1)
const stringOptional = z.string().trim().default('')
const validationSchema = z.object({
  area: z.number(),
  borders: z.array(stringRequired).default([]),
  capital: stringRequired,
  car: z.object({
    signs: z.array(stringRequired),
    side: z.union([z.literal('left'), z.literal('right')])
  }),
  cca2: stringRequired,
  cca3: stringRequired,
  id: stringRequired,
  cioc: stringOptional,
  coatOfArms: stringOptional,
  continents: z.array(z.nativeEnum(Continent)),
  currencies: z.array(
    z.object({
      code: stringRequired,
      name: stringRequired,
      symbol: stringRequired
    })
  ),
  fifaCode: stringOptional,
  flag: stringRequired,
  flagSymbol: stringRequired,
  googleMap: stringRequired,
  dialingCode: stringOptional,
  independent: z.boolean(),
  languages: z.array(stringRequired).min(1),
  latlng: z.tuple([z.number(), z.number()]),
  name: z.object({
    common: stringRequired,
    official: stringRequired,
    vieName: stringRequired
  }),
  population: z.object({
    updatedAt: stringOptional,
    total: z.number()
  }),
  region: stringOptional,
  startOfWeek: z.union([z.literal('monday'), z.literal('sunday'), z.literal('saturday')]),
  timezones: z.array(stringRequired).min(1),
  tld: z.array(stringRequired),
  unMember: z.boolean(),
  unObserver: z.boolean(),
  wiki: stringOptional,
  gdp2022: z.number().optional().default(0),
  fifaMenWorldCup: z
    .array(
      z.object({
        year: z.number(),
        place: z.union([z.literal('champion'), z.literal('runner-up'), z.literal('third')])
      })
    )
    .optional(),
  fifaMenRanking: z.object({ points: z.number(), rank: z.number() }).optional()
})

const validateCountries = async () => {
  console.log('Validating ...')

  const promises: Array<Promise<any>> = []

  const errorCountries: [string, any][] = []
  const validCountries: Country[] = []

  countries.forEach(country =>
    promises.push(
      validationSchema
        .parseAsync(country)
        .then(validCountry => validCountries.push(validCountry as Country))
        .catch(error => errorCountries.push([country.cca2, error.message]))
    )
  )

  await Promise.all(promises)

  console.log(
    `Done: ${errorCountries.length + validCountries.length} => Error: ${errorCountries.length} - Valid: ${validCountries.length}`
  )
  if (!errorCountries.length) console.log('✅ Perfectly')

  return [errorCountries, validCountries]
}

function generateCountriesFile(data: any) {
  fs.writeFile(path.resolve(__dirname, './countries.json'), JSON.stringify(data), error => {
    error ? console.error('Write file error: ', error) : console.log('✅ The file was written successfully')
  })
}

async function validateAndRewrite(write = true) {
  const [errorCountries, validCountries] = await validateCountries()

  if (errorCountries.length) {
    const firstError = errorCountries[0]
    console.log(firstError[0])
    console.log(firstError[1])
  } else {
    write && generateCountriesFile(validCountries)
  }
}

function editData() {
  const data = countries.map(c => {
    return omit(c, 'subregion') as Country
  })

  generateCountriesFile(data)
}

validateAndRewrite(true)
// editData()
