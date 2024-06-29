<script setup lang="ts">
import { useRoute } from 'vue-router'
import DataNotFound from '~/components/DataNotFound.vue'
import PageTitle from '~/components/PageTitle.vue'
import { PATH } from '~/constants/path'
import CountryInfo from '~/features/country/components/CountryInfo.vue'
import CountryActions from '~/features/discovery/components/CountryActions.vue'
import { useCountriesStore } from '~/stores/countries'
import type { Country } from '~/types/Country'

const countryByCode = useCountriesStore().countryByCode
const route = useRoute()
const country = countryByCode[(route.params.code as string)?.toUpperCase()] as Country
</script>

<template>
  <div v-if="Boolean(country)" class="flex flex-col">
    <PageTitle>
      <div class="flex flex-col gap-4">
        <div class="flex-v-center gap-2">
          <img :src="country.flag" class="size-7 rounded-full object-cover object-center" />
          {{ country.name.common }}
        </div>

        <CountryActions v-bind="country" class="!justify-start" hide-show-detail hide-quick-view>
          <template #start>
            <div class="tooltip flex-v-center" data-tip="Go back">
              <RouterLink :to="PATH.DISCOVERY">
                <span class="icon ph-arrow-left"></span>
              </RouterLink>
            </div>
          </template>
        </CountryActions>
      </div>
    </PageTitle>
    <CountryInfo v-bind="country" />
  </div>
  <DataNotFound v-else />
</template>
