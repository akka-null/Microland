<script setup lang="ts">
import { productStore } from '../stores/products'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = productStore()
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'
const goToPage = (page) => {
  if (!route.params.type && !route.params.category) {
    store.getProducts(page, store.itemPerPage)
  } else if (route.params.type && !route.params.category) {
    store.getProductsByType(page, store.itemPerPage, route.params.type)
  } else if (route.params.type && route.params.category) {
    store.getProductsByCategory(page, store.itemPerPage, route.params.type, route.params.category)
  }
}
</script>

<template>
  <div class="flex items-center justify-center px-2">
    <Pagination
      v-slot="{ page }"
      :page="store.page"
      :itemsPerPage="store.itemPerPage"
      :total="store.total"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <!-- <Button @click="store.getProducts(item.value, store.itemPerPage)" class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'"> -->
            <Button
              @click="goToPage(item.value)"
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
      </PaginationList>
    </Pagination>
  </div>
</template>
