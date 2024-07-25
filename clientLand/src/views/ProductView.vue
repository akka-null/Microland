<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { watchOnce } from '@vueuse/core'
import {useRoute,  useRouter} from 'vue-router'
import {productStore} from '../stores/products'

import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const route = useRoute(); 
const router = useRouter(); 
const store = productStore();
const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

onMounted(() => {
store.getProductById(route.params.productId);
})

function onSelect() {
if (!emblaMainApi.value || !emblaThumbnailApi.value)
return
selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
if (!emblaMainApi.value || !emblaThumbnailApi.value)
return
emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
if (!emblaMainApi)
return

onSelect()
emblaMainApi.on('select', onSelect)
emblaMainApi.on('reInit', onSelect)
})


</script>
<template>
<!-- <section class="py-12 sm:py-16"> -->
<section class="py-12 ">
    <div class="container mx-auto ">

        <div class="lg:col-gap-2 xl:col-gap-2 mt-8 grid grid-cols-8 gap-2 lg:mt-12 lg:grid-cols-8 lg:gap-2">
            <div class="lg:col-span-4 lg:row-span-1 lg:row-end-1">
                <h1 class="sm: text-2xl font-bold sm:text-3xl">{{store.product.title}}</h1>

                <div class="mt-5 flex items-center">
                    <div class="flex items-center" v-for="i in 5" :key="i">
                        <div v-if="i <= Math.floor(store.product.rating)">

                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                        </div>
                        <div v-else>
                            <svg class="block h-4 w-4 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                            </svg>
                        </div>

                    </div>
                    <p class="ml-2 text-sm font-medium ">{{store.product.reviewsCount}} Reviews</p>
                </div>

                <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
                    <div class="flex items-end">
                        <h1 class="text-3xl font-bold">{{store.product.price}} DA</h1>
                        <!-- <span class="text-base">/month</span> -->
                    </div>

                    <!-- <label for="qnty">Quantity name:</label> -->
                    <!-- <input type="number" id="qnty" name="qnty" min="1" max="9" value="1"> -->

                    <button @click='store.addToCart(store.product, getQnty())' type="submit" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to cart
                    </button>
                </div>
                <div class="lg:col-span-3">
                    <h1 class="text-3xl font-bold">Description</h1>
                </div>
                <div class="mt-2 flow-root sm:mt-2">
                    <p class="mt-4">{{store.product.description}}</p>
                </div>
            </div>


            <div class="pl-20 lg:col-span-5 lg:row-end-1">
                <div class="lg:flex lg:items-start">
                    <!-- <div class="lg:order-2 lg:ml-5"> -->
                    <!-- <div class="max-w-xl overflow-hidden rounded-lg"> -->
                    <!-- </div> -->
                    <!-- </div> -->
                    <!-- carousel -->
                    <div class="w-full sm:w-auto">
                        <Carousel
                        class="relative w-full max-w-xs"
                        @init-api="(val) => emblaMainApi = val"
                        >
                        <CarouselContent>
                        <CarouselItem v-for="(image, index) in store.product.images" class="h-full w-full max-w-full object-cover" :key="index">
                        <div class="p-1">
                            <!-- <Card> -->
                            <!-- <CardContent class="flex aspect-square items-center justify-center p-6"> -->
                            <img class="hover:scale-125 transition-all duration-500 cursor-pointer" :src="image" alt="">
                            <!-- </CardContent> -->
                            <!-- </Card> -->
                        </div>
                        </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                        </Carousel>

                        <Carousel
                        class="relative w-full max-w-xs"
                        @init-api="(val) => emblaThumbnailApi = val"
                        >
                        <CarouselContent class="flex gap-1 ml-0">
                        <!-- <CarouselItem v-for="(image, index) in store.product.images" :key="index" class="pl-0 basis-1/4 cursor-pointer" @click="onThumbClick(index)"> -->
                        <CarouselItem v-for="(image, index) in store.product.images" :key="index" class="pl-0 basis-1/4 cursor-pointer" @click="onThumbClick(index)">
                        <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
                            <!-- <Card> -->
                            <!-- <CardContent class="flex aspect-square items-center justify-center p-6"> -->
                            <img class="hover:scale-125 transition-all duration-500 cursor-pointer" :src="image" alt="">
                            <!-- </CardContent> -->
                            <!-- </Card> -->
                        </div>
                        </CarouselItem>
                        </CarouselContent>
                        </Carousel>
                    </div>
                    <!-- carousel -->

                </div>
            </div>

        </div>
        <!-- // reviews and shit -->



        <div class="col-span-3">
            <div class="border-b ">
                <div class="flex gap-4">

                    <div  class="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium ">
                        <h1>Reviews</h1>
                        <span class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">{{store.product.reviewsCount}}</span>
                        <span class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">Login To Add Yours</span>
                    </div>
                </div>
            </div>
            <div>
                <ScrollArea class="h-96 rounded-md border">
                <!-- scroll -->
                <ul class="" v-for="review in store.product.reviews" :key="review._id">

                    <li class="m-2 border px-2 py-2 text-left">
                        <div class="flex items-start">
                            <!-- <img class="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle" src="" alt="" /> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>

                            <div class="ml-3">
                                <h1>{{review.username}}</h1>
                                <div class="flex items-center">
                                    <div v-for="i in 5" :key="i">
                                        <div v-if="i <= Math.floor(review.rate)">

                                            <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <svg class="block h-4 w-4 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                                <p class="mt-2 text-base">
                                {{review.comment}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
                </ScrollArea >
            </div>

        </div>
    </div>
</section>
</template>

