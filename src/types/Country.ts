export type CountryName = {
  common: string
  official: string
  vieName: string
  nativeName: Record<string, { official: string; common: string }>
}

export type CountryCurrency = {
  code: string
  name: string
  symbol: string
}

export type CountryIDD = {
  root: string
  suffixes: string[]
}

export type CountryCar = {
  signs: string[]
  side: 'left' | 'right'
}

export type CountryLanguage = {
  code: string
  name: string
}

export enum Continent {
  Asia = 'Asia',
  Europe = 'Europe',
  Africa = 'Africa',
  NorthAmerica = 'North Americas',
  SouthAmerica = 'South Americas',
  Oceania = 'Oceania',
  Antarctica = 'Antarctica'
}

export type Country = {
  area: number // Geographical size by km2
  borders: string[] // Border countries
  capital: string
  car: CountryCar
  cca2: string // ISO 3166-1 alpha-2 two-letter country codes
  cca3: string // ISO 3166-1 alpha-3 three-letter country codes
  code: string // Equivalent cca2
  cioc: string // Code of the International Olympic Committee
  coatOfArms: string
  continents: Continent[]
  currencies: CountryCurrency[]
  fifaCode: string
  flag: string
  flagSymbol: string
  googleMap: string
  idd: CountryIDD // International direct dialing - aka: calling code
  independent: boolean
  languages: CountryLanguage[]
  latlng: [number, number] // Latitude and longitude
  name: CountryName
  population: number
  region: string
  startOfWeek: 'monday' | 'sunday' | 'saturday'
  subregion: string
  timezones: string[]
  tld: string[] // Top level domain
  unMember: boolean // United Nations member status
  wiki: string
}

export type CountryMap = Record<string, Country>
