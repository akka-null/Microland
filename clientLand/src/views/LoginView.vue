<template>
    <div class="login-page">
        <!-- <form @submit.prevent="login"> -->
            <label for="email">E-mail:</label>
            <input type="text" id="email" v-model="email" placeholder="email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="password" required>

            <button type="submit" @click="login">Login</button>
        <!-- </form> -->
    </div>
    <div>
        <button type="submit" @click="akka">akka</button>
    </div>
</template>

<script>
import axios from "axios";
// we need to include the coookies with this
export default {
    data() {
        return {
            email: '',
            password: '',
            FormData
        };
    },
    methods: {
        async login() {
            /* // Implement your login logic here
            console.log('Logging in...');
            console.log('E-mail:', this.email);
            console.log('Password:', this.password); */
            try {
                const FormData = { email: email.value, password: password.value };
                // const res = await axios.post('http://localhost:3030/login', { withCredentials: true }, FormData);
                alert('yo');
                axios.defaults.withCredentials = true;
                const res = await axios.post('http://localhost:3030/login', FormData, {withCredentials: true});
                alert(res.data);
                console.log(res.data);

            } catch (error) {
                console.log(error);
            }

            // You can add authentication logic, API calls, etc.
            // For simplicity, let's just log the credentials for now.
        },
        async akka() {
            try {
                // axios.defaults.withCredentials = true;
                alert('yo');
                axios.defaults.withCredentials = true;
                const res = await axios.get('http://localhost:3030/akka');
                console.log(res.data);

            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>
<style>
@media (min-width: 1024px) {
    .login-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

/* Add some basic styling if needed */
/* .login-page { */
/*   max-width: 300px; */
/*   margin: auto; */
/*   padding: 20px; */
/*   border: 1px solid #ccc; */
/*   border-radius: 5px; */
/* } */

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 8px;
}

input {
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a079;
}
</style>
