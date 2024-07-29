<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authStore } from '@/stores/auth'
const auth = authStore()
import AddProduct from '@/components/AddProduct.vue'

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

</script>

<template>
  <button @click="auth.logIn('akka@gmail.com', '{akka}')">login</button>
  <br />
  <button @click="auth.logOut()">logout</button>
  <br />
  <button @click="console.log(auth.user)">print user</button>
  <br />
  <p>saving the userinfo in the localStorage is a bad idea</p>
  <p>we want to always get the user info from the server</p>

  <div class="flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  </div>
        <div>
            <Dialog>

    <DialogTrigger as-child>
      <Button variant="outline">
        Share
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>

        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <Input
            id="link"
            default-value="https://shadcn-vue.com/docs/installation"
            read-only
          />
        </div>
        <Button type="submit" size="sm" class="px-3">
          <span class="sr-only">Copy</span>
          <CopyIcon class="w-4 h-4" />
        </Button>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>

  </Dialog>
        </div>
  <div>
      <!-- <AddProduct /> -->

            <Dialog>
                <DropdownMenu>
                <DropdownMenuTrigger as-child>
                <Button variant="outline">
                    Open
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">

                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
            <DialogTrigger as-child>
                <DropdownMenuItem>
                <span>Profile</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
            <DialogHeader>

            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
            Anyone who has this link will be able to view this.
            </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
                <div class="grid flex-1 gap-2">
                    <Label for="link" class="sr-only">
                        Link
                    </Label>
                    <Input
                    id="link"
                    default-value="https://shadcn-vue.com/docs/installation"
                    read-only
                    />
                </div>
                <Button type="submit" size="sm" class="px-3">
                    <span class="sr-only">Copy</span>
                    <CopyIcon class="w-4 h-4" />
                </Button>
            </div>
            <DialogFooter class="sm:justify-start">
            <DialogClose as-child>
            <Button type="button" variant="secondary">
                Close
            </Button>
            </DialogClose>
            </DialogFooter>
            </DialogContent>

               </DropdownMenuGroup>


                </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
  </div>

</template>
