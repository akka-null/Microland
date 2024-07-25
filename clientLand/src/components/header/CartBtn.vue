<script setup lang="ts">
    /*
    TODO: - [ ] fix the size of the menuContent and the size of the scrollarea
          - [ ] fix the size fo the menuContenet when the cart is empty
    */

    import {ref} from 'vue'
    import {productStore} from '../../stores/products'
    const store = productStore();
    import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  X,
  ShoppingCart,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const akka = ()=> {
console.log('akka');
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
    <Button variant="outline" class="px-0 py-0">
        <div class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </g>
            </svg>
            <div class="rounded-full border-2 border-red-500 bg-red-500 text-xs font-semibold leading-4 text-white">
                        {{store.cart.length}}
                </div>
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent >
    <ScrollArea class="h-[150px] md:h-[250px] lg:h-[350px] w-[150px] md:w-[250px] lg:w-[350px] rounded-md border">
        <div v-for="item in store.cart" :key="item._id">
                    <div class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div class="shrink-0 relative">
                            <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                {{item.quantity}}
                            </span>
                            <img class="h-24 w-24 max-w-full rounded-lg object-cover" :src="item.image" :alt="item.name" />
                        </div>

                        <div class="relative flex flex-1 flex-col justify-between">
                            <div class="sm:col-gap-5 ">
                                <div class="pr-8 sm:pr-5">
                                    <p class="text-base font-semibold">{{item.name}}</p>
                                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">{{item.price}} DA</p>
                                </div>
                            </div>
    
                            <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button @click="store.removeFromCart(item._id)" type="button" class="flex rounded p-2 text-center text-yellow-600 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus">
                                        <path d="M5 12h14"/>
                                    </svg>
                                </button>
                                <button @click="store.addToCart(item)" type="button" class="flex rounded p-2 text-center text-green-600 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                                        <path d="M5 12h14"/>
                                        <path d="M12 5v14"/>
                                    </svg>
                                </button>
                                <button @click="store.removeItemFromCart(item._id)" type="button" class="flex rounded p-2 text-center text-red-600 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                </div>
        </div>
    </ScrollArea>
      <DropdownMenuSeparator />
      <!-- <DropdownMenuItem> -->
      <!-- <div class="mt-6 border-t border-b py-2"> -->
      <!--     <div class="flex items-center justify-between"> -->
      <!--         <p class="text-sm text-gray-400">Subtotal</p> -->
      <!--         <p class="text-lg font-semibold text-gray-900">$399.00</p> -->
      <!--     </div> -->
      <!--     <div class="flex items-center justify-between"> -->
      <!--         <p class="text-sm text-gray-400">Shipping</p> -->
      <!--         <p class="text-lg font-semibold text-gray-900">$8.00</p> -->
      <!--     </div> -->
      <!-- </div> -->
      <!-- </DropdownMenuItem> -->
      <div class="mt-6 flex items-center justify-between">
          <h1 class="text-sm font-medium ">Total</h1>
          <p class="text-2xl font-semibold ">
            <span class="text-xs font-normal ">DA</span>
            {{store.totalToPay}}
          </p>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <!-- <LogOut class="mr-2 h-4 w-4 inline-flex items-center justify-center" /> -->
        <button class="inline-flex items-center justify-center">Place Order</button>
        <X class="inline-flex items-center justify-center" />
        <!-- <span>Log out</span> -->
      </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>
</template>
