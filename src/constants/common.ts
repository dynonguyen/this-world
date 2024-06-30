import { PATH } from './path'

export const APP_NAME = 'This World'

export const NAVIGATION = [
  {
    label: 'Overview',
    to: PATH.OVERVIEW,
    icon: 'ph-chart-pie-slice',
    activeIcon: 'ph-chart-pie-slice-fill'
  },
  {
    label: 'Discovery',
    to: PATH.DISCOVERY,
    icon: 'ph-globe-hemisphere-east',
    activeIcon: 'ph-globe-hemisphere-east-fill',
    extendActivePaths: [PATH.COUNTRY.replace(':id', '')]
  },
  { label: 'Map', to: PATH.MAP, icon: 'ph-map-trifold', activeIcon: 'ph-map-trifold-fill' },
  { label: 'Game', to: PATH.GAME, icon: 'ph-game-controller', activeIcon: 'ph-game-controller-fill' }
]

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
