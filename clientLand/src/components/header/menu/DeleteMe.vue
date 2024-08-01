<script setup lang="ts">

import { useForm } from 'vee-validate'
import { h } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useRoute, useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { Input } from '@/components/ui/input'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  CreditCard,
  LogOut,
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

const formSchema = toTypedSchema(
  z.object({
    password: z.string().min(5).max(50)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  const {  password } = values
  const res = await auth.DeleteMe(password)
  toast({
    title: res.status === 200 ? 'Deletion!' : 'Oops!',
    variant: res.status === 200 ? 'informative' : 'destructive',
    description: `${res.message}`
  })
  if (res.status === 200) {
    router.push({ name: 'Home' })
  }
})
</script>

<template>
        <Dialog>
            <DialogTrigger>
            <DropdownMenuItem class="text-red-500" :onSelect="(e) => e.preventDefault()">
            <UserX class="mr-2 h-4 w-4" />
            <span>Delete Profile</span>
            </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>

            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription class="text-red-600">
            This will permanently delete
            your account and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>

            <form  @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input type="password" placeholder="your Password..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
                </FormItem>
                </FormField>
                <dialogFooter>
                    <Button class="" variant="destructive" type="submit"> Delete My Account </Button>
                </dialogFooter>
            </form>
            </DialogContent>
        </Dialog>
</template>

