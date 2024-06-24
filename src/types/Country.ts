export type CountryName = {
  common: string
  official: string
  vieName: string
}

export type CountryCurrency = {
  code: string
  name: string
  symbol: string
}

export type CountryCar = {
  signs: string[]
  side: 'left' | 'right'
}

export type CountryPopulation = {
  updatedAt: string
  total: number
}

export type CountryFifaMenWorldCup = {
  year: number
  place: 'champion' | 'runner-up' | 'third'
}

export enum Continent {
  Asia = 'Asia',
  Europe = 'Europe',
  Africa = 'Africa',
  NorthAmerica = 'North America',
  SouthAmerica = 'South America',
  Oceania = 'Oceania',
  Antarctica = 'Antarctica'
}

export enum Ocean {
  Atlantic = 'Atlantic',
  Pacific = 'Pacific',
  Indian = 'Indian',
  Southern = 'Southern',
  Arctic = 'Arctic'
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
  dialingCode: string // aka: calling code
  independent: boolean // If true, it's a country otherwise it's a territory (or disputed)
  languages: string[]
  latlng: [number, number] // Latitude and longitude
  name: CountryName
  population: CountryPopulation
  region: string
  startOfWeek: 'monday' | 'sunday' | 'saturday'
  subregion: string
  timezones: string[]
  tld: string[] // Top level domain
  unMember: boolean // United Nations member status
  unObserver: boolean // United Nations observer status
  wiki: string
  fifaMenWorldCup?: CountryFifaMenWorldCup[]
}

export type CountryMap = Record<string, Country>
