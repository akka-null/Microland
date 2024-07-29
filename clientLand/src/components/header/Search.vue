<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MagnifyingGlassIcon } from '@radix-icons/vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { productStore } from '@/stores/products'

const router = useRouter()
const route = useRoute()
const store = productStore()
const searchQuery = ref('')

const search = async () => {
  // store.search(searchQuery.value, null, null);
  router.push({ name: 'Search', params: { term: searchQuery.value } })
  // searchQuery.value = ''
}
</script>

<template>
  <form class="flex w-full max-w-sm items-center gap-1.5" v-on:submit.prevent="search">
    <Input v-model="searchQuery" id="search" type="text" placeholder="Search..." />
    <Button variant="outline" @click="search" type="submit">
      <MagnifyingGlassIcon class="size-5 text-muted-foreground" />
    </Button>
  </form>
</template>
