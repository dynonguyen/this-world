<script lang="ts"></script>

<script setup lang="ts">
import { useCountriesStore } from '~/stores/countries'
import { Continent, Ocean } from '~/types/Country'
const { countries } = useCountriesStore()

const statistics = [
  {
    label: 'Population',
    value: '8.1 B', // Cannot compute the exact number, view in generated/population.ts
    icon: 'ph-users-three',
    colors: ['bg-primary/15', 'border-primary/25', 'bg-primary/25', 'text-primary']
  },
  {
    label: 'Surface Area (km²)',
    value: '510.1 M',
    icon: 'uil-vector-square',
    colors: ['bg-green-500/15', 'border-green-500/25', 'bg-green-500/25', 'text-green-500']
  },
  {
    label: 'Continents',
    value: Object.keys(Continent).length,
    icon: 'other-sharp-landside',
    colors: ['bg-teal-500/15', 'border-teal-500/25', 'bg-teal-500/25', 'text-teal-500']
  },
  {
    label: 'Oceans',
    value: Object.keys(Ocean).length,
    icon: 'other-ocean',
    colors: ['bg-blue-500/15', 'border-blue-500/25', 'bg-blue-500/25', 'text-blue-500']
  },
  {
    label: 'Countries & Territories',
    value: countries.length,
    icon: 'ph-island',
    colors: ['bg-orange-500/15', 'border-orange-500/25', 'bg-orange-500/25', 'text-orange-500']
  },
  {
    label: 'Countries',
    value: countries.filter(c => c.independent).length,
    icon: 'ph-flag-fill',
    colors: ['bg-amber-500/15', 'border-amber-500/25', 'bg-amber-500/25', 'text-amber-500']
  },
  {
    label: 'UN Member States',
    value: countries.filter(c => c.unMember).length,
    icon: 'other-unitednations',
    colors: ['bg-violet-500/15', 'border-violet-500/25', 'bg-violet-500/25', 'text-violet-500']
  },
  {
    label: 'UN Observers',
    value: countries.filter(c => c.unObserver).length,
    icon: 'other-unitednations',
    colors: ['bg-purple-500/15', 'border-purple-500/25', 'bg-purple-500/25', 'text-purple-500']
  }
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="s in statistics"
      :key="s.label"
      :class="`flex md:min-h-[84px] p-3 rounded-2xl border ${s.colors[0]} ${s.colors[1]}`"
    >
      <div class="flex-v-center gap-4">
        <div :class="`flex-center size-10 rounded-full ${s.colors[2]} shrink-0`">
          <span :class="`icon size-5 ${s.colors[3]} ${s.icon}`"></span>
        </div>

        <div class="flex flex-col grow">
          <h3 class="text-xl md:text-2xl font-medium">{{ s.value }}</h3>
          <span :title="s.label" class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
