<template>
    <!-- <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
        <div class="card" v-for="prod in data" :key="prod._id">
            <h3>{{ prod.title }}</h3>
            <h3>{{ prod.price }}</h3>
            <img class="card-image" :src="prod.image" alt="product image">
            <h3>{{ prod.quantity }}</h3>
            <h4>{{ prod.description }}</h4>
        </div>
    </div> -->
</template>

<script setup>

</script>
<style scoped>
h4 {
    color: lightslategray;
}

.loading {
    font-size: 18px;
    margin: 16px;
}

.card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    cursor: pointer;
}

.card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.card-image {
    width: 250px;
    height: 250px;
}
</style>

