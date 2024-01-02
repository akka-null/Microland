<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import Toaster from '@/components/ui/toast/Toaster.vue'
import Navigation from '@/components/Navigation.vue'
import axios from 'axios';

const hey = async () => {
    // console.log('akka');
    // const x = await axios.get('https://microland.onrender.com/products', {withCredentials: true});
    const x = await axios.get('https://microland.onrender.com/products');
    console.log(x.data);

}
</script>

<template>
    <header class="flex justify-center">
        <Navigation />
    </header>
    <Button @click="hey" variant="outline"> imad me </Button>

    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

    <!-- used the toaster so we can display msgs  -->
    <Toaster /> 
    <RouterView />
</template>
