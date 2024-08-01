<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import Pagination from '@/components/Pagination.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />

    <div class="flex-1 bg-background">
      <div class="container relative">
        <routerView />
      </div>
    </div>
    <Toaster />
    <Footer />
  </div>
</template>
