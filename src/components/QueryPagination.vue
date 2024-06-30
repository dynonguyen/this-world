<script setup lang="ts">
import { uniq } from 'lodash-es'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FILTER_QUERY_KEY } from '~/constants/key'
import { toNumber } from '~/utils/helpers'

const DOT_PAGE = 0

const props = withDefaults(defineProps<{ total: number; pageSize?: number }>(), { pageSize: 10 })
const route = useRoute()
const router = useRouter()

const getPagination = () => {
  const pageSize = props.pageSize
  const totalPage = Math.ceil(props.total / pageSize)
  const page = toNumber(Number(route.query[FILTER_QUERY_KEY.PAGE]), 1, { min: 1, max: totalPage })

  const items: number[] = uniq([1, page - 1, page, page + 1, totalPage]).filter(item => item > 0 && item <= totalPage)
  const pages: number[] = [items[0]]

  for (let i = 1; i < items.length; i++) {
    if (items[i] - items[i - 1] > 1) pages.push(DOT_PAGE)
    pages.push(items[i])
  }

  return { totalPage, page, pageSize, pages }
}

const pagination = computed(getPagination)

// Auto fix page number when page number is out of range
watch(
  [() => route.query[FILTER_QUERY_KEY.PAGE], () => props.total],
  () => {
    const _page = route.query[FILTER_QUERY_KEY.PAGE]

    const { page } = getPagination()
    if (_page && Number(_page) !== page) {
      router.push({ query: { ...route.query, [FILTER_QUERY_KEY.PAGE]: page } })
    }
  },
  { immediate: true }
)

const handleChangePage = (page: number) => {
  router.push({ query: { ...route.query, [FILTER_QUERY_KEY.PAGE]: page } })
}
</script>

<template>
  <div
    v-if="total > 0"
    class="flex-v-center gap-2 py-4 flex-wrap justify-center flex-col md:flex-row md:justify-between"
  >
    <div class="md:text-sm">
      <span class="hidden md:inline">Showing&nbsp;</span>
      <b>{{ (pagination.page - 1) * pagination.pageSize + 1 }}</b
      >-<b>{{ pagination.page * pagination.pageSize > total ? total : pagination.page * pagination.pageSize }}</b> of
      <b>{{ total }}</b>
      <span class="hidden md:inline">&nbsp;results</span>
    </div>

    <div class="flex-v-center gap-1">
      <!-- Previous -->
      <button
        class="btn btn-sm btn-square"
        :class="{ 'btn-disabled': pagination.page <= 1 }"
        @click="handleChangePage(pagination.page - 1)"
      >
        <span class="icon uil-angle-left-b"></span>
      </button>

      <template v-for="page in pagination.pages" :key="page">
        <button v-if="page === DOT_PAGE" class="btn btn-sm btn-square btn-ghost pointer-events-none">
          <span class="icon ph-dots-three-outline-fill text-neutral-main"></span>
        </button>
        <button
          v-else
          class="btn btn-sm btn-square"
          :class="page === pagination.page ? 'btn-primary' : 'btn-ghost'"
          @click="handleChangePage(page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button
        class="btn btn-sm btn-square"
        :class="{ 'btn-disabled': pagination.page >= pagination.totalPage }"
        @click="handleChangePage(pagination.page + 1)"
      >
        <span class="icon uil-angle-right-b"></span>
      </button>
    </div>
  </div>
</template>
