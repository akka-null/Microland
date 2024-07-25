import { defineStore } from "pinia";
import axios from "axios"
import { useRoute, useRouter } from 'vue-router'
import { BASE_URL, PRODUCTS_URL, PRODUCT_URL } from "@/constants";
const cart = localStorage.hasOwnProperty('cart') ? JSON.parse(localStorage.cart) : [];

export interface Items {
    name: string;
    quantity: number | null,
    qnty: number;
    price: number;
    image: string;
    _id: string;
}

export const productStore = defineStore("products", {
    state: () => ({
        products: [],
        product: {},
        cart: cart,
        page: 1,
        itemPerPage: 12,
        pages: 0,
        total: 0,
        totalToPay: cart.reduce((accum, item) => accum + (item.price * item.quantity), 0/* 0 is the initial value*/,),
    }),
    actions: {
        getProductById(id: string) {
            axios.get(`${BASE_URL}${PRODUCT_URL}/${id}`)
                .then((item) => {
                    this.product = item.data.product;
                });
        },
        getProducts(page: number, itemPerPage: number) {
            axios.get(`${BASE_URL}${PRODUCTS_URL}/?page=${page}&itemPerPage=${itemPerPage}`)
                .then((items) => {
                    this.products = items.data.products;
                    this.total = items.data.total;
                    this.page = items.data.page;
                    this.pages = items.data.pages;
                });
        },
        getProductsByType(page: number, itemPerPage: number, type: string) {

            axios.get(`${BASE_URL}${PRODUCTS_URL}/${type}?page=${page}&itemPerPage=${itemPerPage}`)
                .then((items) => {
                    this.products = items.data.products;
                    this.total = items.data.total;
                    this.page = items.data.page;
                    this.pages = items.data.pages;
                });
        },
        getProductsByCategory(page: number, itemPerPage: number, type: string, category: string) {

            axios.get(`${BASE_URL}${PRODUCTS_URL}/${type}/${category}?page=${page}&itemPerPage=${itemPerPage}`)
                .then((items) => {
                    this.products = items.data.products;
                    this.total = items.data.total;
                    this.page = items.data.page;
                    this.pages = items.data.pages;
                });
        },
        // getLatest() {
        //     axios.get("http://localhost:3030/api/latest")
        //         .then((items) => {
        //             console.log(items.data.prods)
        //         });
        // },
        // getLatest() {
        //     axios.get("http://localhost:3030/api/latest")
        //         .then((items) => {
        //             console.log(items.data.prods)
        //         });
        // },
        addToCart(product, quantity: number | null) {
            const index = this.cart.findIndex((e) => e._id === product._id)
            if (index === -1) {
                const prod = {
                    name: product.title,
                    quantity: quantity? quantity: 1,
                    price: product.price,
                    image: product.images[0],
                    _id: product._id
                }
                this.cart.push(prod);
                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.totalToPay += (prod.quantity * prod.price);
            }
            else {
                this.cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.totalToPay += this.cart[index].price;
            }
        },
        removeFromCart(id: string) {
            const index = this.cart.findIndex((e) => e._id === id)
            if (this.cart[index].quantity === 1) {
                this.totalToPay -= this.cart[index].price;
                this.removeItemFromCart(id)
            }
            else {
                this.cart[index].quantity--;
                this.totalToPay -= this.cart[index].price;
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },
        removeItemFromCart(id: string) {
            const array = this.cart.filter((prod) => prod._id !== id)
            localStorage.setItem('cart', JSON.stringify(array));
            this.cart = array;
            this.totalToPay = this.cart.reduce((accum, item) => accum + (item.price * item.quantity), 0,);
        },
    },
});
