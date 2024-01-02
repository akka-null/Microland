<script setup lang='ts'>
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { ref } from 'vue'
const email = ref('');
const password = ref('');

async function login() {
    const res = await axios.post('https://microland.onrender.com/login', { email: email.value, password: password.value });
    console.log(res);
} 
</script>
<template>
    <form class="flex justify-center" @submit.prevent="login">
        <label for="email">email</label>
        <input v-model="email" for="email" type="email" id="email" required>
        <br>
        <label for="password">passwod</label>
        <input v-model="password" for="password" type="password" id="password" required>

        <Button type="submit">Submit</Button>
    </form>
</template>


