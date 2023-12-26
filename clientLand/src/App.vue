<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation.vue'
const hey = async () => {
    console.log('akka');
}
</script>

<template>
    <header class="flex justify-center">
        <Navigation />
    </header>
    <Button @click="hey" variant="outline"> click me </Button>

    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
</template>
