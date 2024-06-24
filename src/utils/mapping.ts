import { Continent } from '~/types/Country'

export const continentMapping = (continent: Continent) => {
  switch (continent) {
    case Continent.Asia:
      return { icon: 'other-continent-asia', name: 'Asia', vieName: 'Châu Á' }
    case Continent.Oceania:
      return { icon: 'other-continent-oceania', name: 'Oceania', vieName: 'Châu Đại Dương' }
    case Continent.Africa:
      return { icon: 'other-continent-africa', name: 'Africa', vieName: 'Châu Phi' }
    case Continent.Europe:
      return { icon: 'other-continent-europe', name: 'Europe', vieName: 'Châu Âu' }
    case Continent.NorthAmerica:
      return { icon: 'other-continent-north-america', name: 'North America', vieName: 'Bắc Mỹ' }
    case Continent.SouthAmerica:
      return { icon: 'other-continent-south-america', name: 'South America', vieName: 'Nam Mỹ' }
    case Continent.Antarctica:
      return { icon: 'other-continent-antarctica', name: 'Antarctica', vieName: 'Châu Nam Cực' }
  }
}
