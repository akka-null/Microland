<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authStore } from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()
const route = useRoute()

const { toast } = useToast()
const auth = authStore()
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(5).max(50)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values
  const res = await auth.logIn(email, password)
  toast({
    title: res.status === 200 ? 'Welcome Back' : 'Oops!',
    variant: res.status === 200 ? 'informative' : 'destructive',
    description: `${res.message}`
  })
  if (res.status === 200) {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <div class="flex justify-center">
    <form class="w-2/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input type="text" placeholder="your email adress" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="your password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <router-link to="/forget">
        <h4 class="text-gray-500">forget password ?</h4>
      </router-link>
      <Button type="submit"> Login </Button>
      <router-link to="/register" class="px-2">
        <Button variant="outline" class="font-semibold text-blue-500"> Create an Account </Button>
      </router-link>
    </form>
  </div>
</template>
