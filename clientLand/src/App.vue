<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Button } from '@/components/ui/button'
import Header from '@/components/header/Header.vue'
import Card from '@/components/Card.vue'
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
