<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import Header from '@/components/header/Header.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'
import { productStore } from '../stores/products'
import { authStore } from '../stores/auth'
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

const router = useRouter()
const route = useRoute()
const store = productStore()
const auth = authStore()
ref(store.products)

onMounted(async () => {
  store.search(route.params.term, 1, store.itemPerPage)
})
const goToPage = (page) => {
  store.search(route.params.term, page, store.itemPerPage)
}
</script>

<template>
  <section>
    <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div class style="position: relative">
        <!-- <div class="hidden flex-col md:flex"> -->
        <!-- removed hidden and i can see with my phone -->
        <div class="flex-col md:flex">
          <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card />
            </div>

            <!-- <Pagination /> -->
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
                    <PaginationListItem
                      v-if="item.type === 'page'"
                      :key="index"
                      :value="item.value"
                      as-child
                    >
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
            <!-- <Pagination /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
