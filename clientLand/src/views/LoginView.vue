<template>
  <div class="login-page">
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Implement your login logic here
      console.log('Logging in...');
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // You can add authentication logic, API calls, etc.
      // For simplicity, let's just log the credentials for now.
    },
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
