<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import { h, onMounted } from 'vue'
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
    password: z.string().min(5).max(50),
    confirm: z.string().min(5).max(50),
 
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})


const onSubmit = handleSubmit(async (values) => {
const {password, confirm} = values;

    const res = await auth.reset(password, confirm, route.params.token)
    toast({
        title: res.status === 200 ? "Password updated": "Oops!",
        variant: res.status === 200? "default" : "destructive",
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

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="new password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirm">
                <FormItem>
                    <FormLabel>confirm password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="confrim your new password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit">
                Update Password
            </Button>
        </Form>
    </div>
</template>

