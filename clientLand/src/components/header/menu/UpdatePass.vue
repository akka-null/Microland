<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'


import {
  KeyRound
} from 'lucide-vue-next'
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const { toast } = useToast()
const auth = authStore()
const router = useRouter()
const route = useRoute()


  // toast({
  //   title: res.status === 200 ? 'Bye Bye' : 'Oops!',
  //   variant: res.status === 200 ? 'default' : 'destructive',
  //   description: `${res.message}`
  // })
</script>

<template>

    <Dialog>
        <DialogTrigger>
        <DropdownMenuItem  :onSelect="(e) => e.preventDefault()">
        <KeyRound class="mr-2 h-4 w-4" />
        <span>Change Password</span>
        </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>

        <DialogHeader>
        <DialogTitle>i forget to do that XD</DialogTitle>
        <DialogDescription class="text-red-600">
        need to add this logic in the backend (update password)
        </DialogDescription>
        </DialogHeader>

        </DialogContent>
    </Dialog>
</template>


