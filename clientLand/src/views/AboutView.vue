<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
<div>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant="outile" className="h-8 w-8 p-0">
        open me
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>

    <Dialog>
        <DialogTrigger>
        <DropdownMenuItem :onSelect="(e) => e.preventDefault()">
        Update item
        </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>

        <DialogHeader>
        <DialogTitle>Update form</DialogTitle>
        <DialogDescription>
        Here you can add fields to update your form
        </DialogDescription>
        </DialogHeader>

        </DialogContent>
    </Dialog>

    <DropdownMenuSeparator />

    <Dialog>
        <DialogTrigger>
        <DropdownMenuItem :onSelect="(e) => e.preventDefault()">
        Delete item
        </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
        This action cannot be undone. This will permanently delete
        your account and remove your data from our servers.
        </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>

    </DropdownMenuContent>
    </DropdownMenu>
</div>
</template>
