<script lang="ts"></script>

<script setup lang="ts">
type Statistic = Record<'icon' | 'value' | 'label' | 'color', string>

const statistics: Statistic[] = [
  { label: 'Population', value: '8.118 Billion', icon: 'ph-users-three', color: 'primary' },
  { label: 'Countries', value: '195', icon: 'ph-map-trifold', color: 'orange-500' }
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="s in statistics"
      :key="s.label"
      :class="`flex p-3 rounded-2xl bg-${s.color}/15 border border-${s.color}/25`"
    >
      <div class="flex-v-center gap-4">
        <div :class="`flex-center size-10 rounded-full border border-${s.color}/50 bg-${s.color}/25`">
          <span :class="`icon size-5 text-${s.color} ${s.icon}`"></span>
        </div>

        <div class="flex flex-col gap-0.5">
          <h3 class="text-2xl font-medium">{{ s.value }}</h3>
          <span class="text-sm text-neutral-content">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
