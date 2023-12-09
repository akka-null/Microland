<template>
    <div class="shop">
        <Card class="card" v-for="prod in products" :key="prod._id" :product="prod" />
    </div>
</template>
<script>
import Card from '../components/Card.vue';
import axios from 'axios';
export default {
    name: 'shop',
    components: {
        Card
    },
    data() {
        return {
            products: null
        }
    },
    created() {
        axios.get('http://localhost:3030/products')
            .then(res => {
                this.products = res.data;
            });
    }
}
</script>
<style>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (min-width: 1024px) {
    .shop {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>

