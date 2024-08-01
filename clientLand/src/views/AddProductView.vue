<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { h, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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

onMounted(() => {
// we need this for preving normal user from getting here we will think of another way to solve this
if (!auth.user || !auth.user.admin) {
router.push({name: 'Home'});
}
})

const formSchema = toTypedSchema(
  z.object({
    username: z.string(),
    email: z.string().email().min(2).max(50),
    password: z.string().min(5).max(50),
    confirm: z.string().min(5).max(50)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  const { username, email, password, confirm } = values
  console.log(values);
  const res = await auth.signUp(username, email, password, confirm)
  toast({
    title: res.status === 200 ? 'Confirm your E-mail Adress' : 'Oops!',
    variant: res.status === 200 ? 'informative' : 'destructive',
    description: `${res.message}`
  })
  if (res.status === 200) {
    router.push({ path: '/login' })
  }
})
</script>

<template>
    <div>
        <p>since we are not using any third party solution for image storing the best way for the cost is to use oudkniss cdn by providing the links of the images</p>
    </div>
  <div class="flex justify-center">
    <form class="w-2/3 space-y-6" @submit="onSubmit">

      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Product name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="how much" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="qunatity">
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <Input type="number" defaultValue="1" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="condition">
        <FormItem>
          <FormLabel>Condition</FormLabel>
          <FormControl>

          <RadioGroup default-value="new" :orientation="'vertical'" v-bind="componentField">
          <div class="flex items-center space-x-2">
              <RadioGroupItem id="r1" value="new" />
              <Label for="r1">New</Label>
          </div>
          <div class="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="old" />
              <Label for="r2">Old</Label>
          </div>
          </RadioGroup>

          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Input type="number"  placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="category">
        <FormItem>
          <FormLabel class="text-Bold">Category</FormLabel>
          <FormControl>
            <Input type="number"  placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="images">
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <Input type="number"  placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
        <div class="grid w-full gap-1.5">
            <Textarea
                placeholder="information about the product"
                v-bind="componentField"
                />
        </div>
        </FormControl>
        <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit"> Create your Account </Button>
    </form>
  </div>
</template>

