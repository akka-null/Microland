<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

// from akka
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { productStore } from '../../stores/products'
import { NavigationItems } from '@/constants'

const items = NavigationItems
// const route = useRoute();
// const router = useRouter();
const store = productStore()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuItem v-for="item in items" :key="item.type.path" class="list-none">
      <router-link
        @click="store.getProductsByType(1, store.itemPerPage, item.type.path)"
        :to="item.type.href"
      >
        <NavigationMenuTrigger>{{ item.type.title }}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <li v-for="subItem in item.category" :key="subItem.path">
              <NavigationMenuLink as-child>
                <router-link
                  @click="
                    store.getProductsByCategory(1, store.itemPerPage, item.type.path, subItem.path)
                  "
                  :to="subItem.href"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div class="text-sm font-medium leading-none">{{ subItem.title }}</div>
                </router-link>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </router-link>
    </NavigationMenuItem>
  </NavigationMenu>
</template>
