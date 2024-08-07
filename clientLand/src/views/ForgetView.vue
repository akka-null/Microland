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
    email: z.string().email().min(2).max(50)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  const { email } = values
  const res = await auth.forget(email)
  toast({
    title: res.status === 200 ? 'Reset Password' : 'Oops!',
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
      <Button type="submit"> Reset Password </Button>
    </form>
  </div>
</template>
