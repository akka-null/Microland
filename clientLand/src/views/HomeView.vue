<script setup lang="ts">
import {onMounted, onBeforeMount, ref} from 'vue';

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import Header from '@/components/header/Header.vue'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import Footer from '@/components/Footer.vue'
import { productStore } from '../stores/products'
import { authStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const store = productStore();
const auth = authStore();
ref(store.products);


onMounted(async() => {
// console.log(auth.user);
if (!route.params.type && !route.params.category) {
store.getProducts(1, store.itemPerPage);
}
else if ( route.params.type && !route.params.category) {
store.getProductsByType(1, store.itemPerPage, route.params.type);

}
else if (route.params.type && route.params.category) {
store.getProductsByCategory(1, store.itemPerPage, route.params.type, route.params.category);
}




})


</script>

<template>
    <section>
        <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div class style="position: relative;">
                <!-- <div class="hidden flex-col md:flex"> -->
                <!-- removed hidden and i can see with my phone -->
                <div class="flex-col md:flex">
                    <div class="flex-1 space-y-4 p-8 pt-6">
                        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card />
                        </div>
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
