<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
// import { Button } from '@/components/ui/button'

// import { Separator } from '@/components/ui/separator'

import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const mode = useColorMode()

import Navigation from '@/components/header/Navigation.vue'
import Search from '@/components/header/Search.vue'
import DarkThemeBtn from '@/components/header/DarkThemeBtn.vue'
import CartBtn from '@/components/header/CartBtn.vue'
import AuthBtn from '@/components/header/AuthBtn.vue'
</script>

<template>
  <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <div class="mr-4 md:mr-1 hidden md:flex">
        <a href="/" class="mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2">
          <div class="flex-none w-16"><img src="/microland-removebg.png" alt="microland" /></div>
          <span class="font-bold">Microland Informatique</span>
        </a>
      </div>

      <!-- TODO: -->
      <!-- akka this will be used for mobile will learn that later -->
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 py-2 mr-2 px-2 text-base flex-shrink-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          strokewidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
        >
          <path
            d="M3 5H11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 12H16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M3 19H21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span class="sr-only">Toggle Menu</span>
      </button>

      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <Search />
        <nav class="flex items-center space-x-2">
          <DarkThemeBtn />
          <CartBtn />
          <AuthBtn />
        </nav>
      </div>
    </div>
  </header>
  <!-- <Separator class="my-4" /> -->
  <div class="flex justify-center"><Navigation /></div>

  <!-- this for mobile -->
</template>
