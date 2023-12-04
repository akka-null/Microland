<template>
    <div class="card">
        <h2>{{ product.title }}</h2>
        <h3>{{product.price}}</h3>
        <h3>{{product.qunatity}}</h3>
        <p>{{product.description}}</p>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        product: Object,
    }
}
</script>

<style scoped>
.card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
}

card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

</style>
