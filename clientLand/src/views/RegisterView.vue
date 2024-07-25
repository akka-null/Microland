<script setup lang="ts">
    import {useRoute, useRouter} from 'vue-router';
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
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {authStore} from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()
const route = useRoute()

const { toast } = useToast()
const auth = authStore();
const formSchema = toTypedSchema(z.object({
    username: z.string(),
    email: z.string().email().min(2).max(50),
    password: z.string().min(5).max(50),
    confirm: z.string().min(5).max(50),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
const {username, email, password, confirm} = values;
    const res = await auth.signUp(username, email, password, confirm)
    toast({
        title: res.status === 200 ? "Confirm your E-mail Adress": "Oops!",
        variant: res.status === 200 ? "default" : "destructive",
        description: `${res.message}`,
    })
    if (res.status === 200) {
        router.push({path: '/login'});
    }
})
</script>

<template>
    <div class="flex justify-center">
        <form class="w-2/3 space-y-6" @submit="onSubmit">

            <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="we should call you ? " v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

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
                        <Input type="password" placeholder="use a strong one at least 5 charaters" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirm">
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Confirm your password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit">
                Create your Account
            </Button>
        </Form>
    </div>
</template>

