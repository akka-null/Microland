<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {authStore} from '@/stores/auth'
const auth = authStore();
</script>

<template>

    <button @click="auth.logIn('akka@gmail.com', '{akka}')">login</button>
    <br>
    <button @click="auth.logOut()">logout</button>
    <br>
    <button @click="console.log(auth.user)">print user</button>
    <br>
    <p>saving the userinfo in the localStorage is a bad idea </p>
    <p>we want to always get the user info from the server</p>
</template>
