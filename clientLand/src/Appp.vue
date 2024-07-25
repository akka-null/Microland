<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/Footer.vue'
import {productStore} from './stores/products'
const store = productStore();

/* 
- saving the cart itmes intolocalstorage
- pushing items into cart array
- having ref
*/


const cartitems = ref(store.cart);
onMounted(async() => {
store.getProducts();

})

const akka = () =>{
console.log(store.products)
console.log(store.cart)

}


</script>

<template>
    <div class="flex min-h-screen flex-col ">
        <Header />
        <div class="flex-1 bg-background">
            <div class="border-b">
                <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">

                    <RouterView />
                    <!-- main body -->
                    <div class="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
                        <div class="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
                            <div class="flex items-center justify-center [&>div]:w-full">
                                <!-- card -->
                                <!-- card -->
                                <h1>{{cartitems.length}}</h1>
                                <div>
                                    <Button @click="store.getProducts">akka</Button>
                                </div>
                                <div>
                                    <Button @click="store.addToCart(store.products[0])">pushToCart</Button>
                                </div>
                                <div>
                                    <Button @click="store.RemoveFromCart('65d3d3655c37d1892c715114')">RemoveFromCart</Button>
                                </div>

                                <div>
                                    <Button @click="akka">cart</Button>
                                </div>
                                <!-- <div class="product" v-for="product in store.products" :key="product.id" -->

                                <!-- used the toaster so we can display msgs  -->
                            </div>
                        </div>
                    </div>
                    <!-- main body -->


                </div>
            </div>
        </div>
  <Footer />
  </div>
</template>
