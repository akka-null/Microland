<template>
    <div class="shop">
        <Card class="card" v-for="prod in products" :key="prod.id" :product="prod"/>
    </div>
</template>
<script>
import Card from '../components/Card.vue';
export default {
    name: 'shop',
    components: {
        Card
    },
    data() {
        return {
            products: [
                {
                    id: 123123123,
                    title: 'GPU 980',
                    price: 2123
                },
                {
                    id: 123123123,
                    title: 'GPU 980',
                    price: 2123
                },
                {
                    id: 123123123,
                    title: 'GPU 980',
                    price: 2123
                },
                {
                    id: 123123123,
                    title: 'GPU 980',
                    price: 2123
                },
            ]
        }
    },

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

