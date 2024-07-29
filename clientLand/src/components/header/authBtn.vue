<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { authStore } from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'
import AddProduct from '@/components/AddProduct.vue'

const { toast } = useToast()
const auth = authStore()
const router = useRouter()
const route = useRoute()

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
  Store,
  ShoppingBasket,
  UserCog,
  UserX,
  PackagePlus,
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

// onMounted(() => {
// auth.getUser();
// })

const logout = async () => {
  const res = await auth.logOut()
  toast({
    title: res.status === 200 ? 'Bye Bye' : 'Oops!',
    variant: res.status === 200 ? 'default' : 'destructive',
    description: `${res.message}`
  })
  if (res.status === 200) {
    router.push({ path: '/' })
  }
}
</script>

<template>
  <div v-if="!auth.user">
    <router-link to="/login">
      <Button variant="outline">
        <Icon icon="radix-icons:person" />
      </Button>
    </router-link>
  </div>
  <div v-else>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <div
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-9 h-9"
        >
          <Button variant="outline">
            <Icon icon="radix-icons:person" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <div v-if="auth.user.admin">
          <DropdownMenuLabel class="text-green-400">{{ auth.user.name }}</DropdownMenuLabel>
          <DropdownMenuGroup>

          <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>My Profile</span>
          </DropdownMenuItem>


          <DropdownMenuItem>
          <ShoppingBasket class="mr-2 h-4 w-4" />
          <span>My Orders</span>
          </DropdownMenuItem>

          <!-- <DropdownMenuItem> -->
          <!-- <CreditCard class="mr-2 h-4 w-4" /> -->
          <!-- <span>Add Orders</span> -->
          <!-- </DropdownMenuItem> -->


          <!-- <DropdownMenuItem> -->
          <!-- <CreditCard class="mr-2 h-4 w-4" /> -->
          <!-- <span>All Orders</span> -->
          <!-- </DropdownMenuItem> -->

        <DropdownMenuSeparator />

        <DropdownMenuItem>
        <!-- <PackagePlus class="mr-2 h-4 w-4" /> -->
            <!-- <button class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"> -->
        <!-- <AddProduct /> -->
        <!-- </div > -->
        <!-- <span>Add Product</span> -->
        </DropdownMenuItem>


          <DropdownMenuItem>
          <Store class="mr-2 h-4 w-4" />
          <span>All Products</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
          <Users class="mr-2 h-4 w-4" />
          <span>All Users</span>
          </DropdownMenuItem>

          </DropdownMenuGroup>
        </div>
        <div v-else>
          <DropdownMenuLabel>{{ auth.user.name }}</DropdownMenuLabel>

          <DropdownMenuGroup>
          <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <CreditCard class="mr-2 h-4 w-4" />
          <span>My Order</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <CreditCard class="mr-2 h-4 w-4" />
          <span>All My Orders</span>
          </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings class="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem  class="text-blue-500">
                  <UserCog class="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="text-red-500">
                  <!-- <MessageSquare class="mr-2 h-4 w-4" /> -->
                  <UserX class="mr-2 h-4 w-4" />
                  <span>Delete Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem @click="logout">
          <LogOut class="mr-2 h-4 w-4 text-red-500" />
          <span class="text-red-500">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
