<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { Frown } from 'lucide-vue-next'
import { productStore } from '../stores/products'
const route = useRoute()
const router = useRouter()
const store = productStore()
ref(store.products)

const goToProductPage = async (productId) => {
  router.push({ name: 'ProductDetail', params: { productId } })
}
</script>

<template>
  <div v-for="prod in store.products" :key="prod._id">
    <div class="rounded-xl border bg-card text-card-foreground shadow">
      <!-- <a @click="goToProductPage(prod._id)" class="relative flex h-60 overflow-hidden" href="#"> -->
      <a @click="goToProductPage(prod._id)" class="relative flex h-60 overflow-hidden">
        <img
          @click="goToProductPage(prod._id)"
          class="absolute top-0 right-0 h-full w-full object-cover"
          v-bind:src="prod.images[0]"
          alt="product image"
        />
      </a>

      <div class="mt-4 px-5 pb-5">
        <h5 @click="goToProductPage(prod._id)" class="text-xl tracking-tight">{{ prod.title }}</h5>
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span class="text-3xl font-bold">{{ prod.price }} DA</span>
            <!-- <span class="text-sm line-through">$sold</span> -->
          </p>
        </div>
        <button
          @click="store.addToCart(prod)"
          class="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
