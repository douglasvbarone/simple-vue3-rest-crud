<template>
  <div class="products">
    <h2>Products</h2>
    <router-link class="btn primary" :to="{ name: 'newProduct' }">
      Add
    </router-link>
    <a class="btn secondary" @click="fetchProducts">Refresh</a>
    <div v-if="loading">Loading...</div>
    <div v-if="products.length">
      <products-table
        :products="products"
        @delete="onDelete"
        @edit="e => $router.push({ name: 'editProduct', params: { id: e } })"
      />
    </div>
    <div v-if="error">Errors: {{ error }}</div>
  </div>
</template>

<script>
import ProductsTable from '../components/ProductsTable.vue'
export default {
  name: 'ProductsView',
  components: { ProductsTable },
  data: () => ({
    products: [],
    loading: true,
    error: null
  }),
  mounted() {
    this.fetchProducts()
  },

  methods: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      this.products = []

      try {
        const productsResponse = await fetch('http://127.0.0.1:3000/product')

        if (!productsResponse.ok) {
          throw new Error(productsResponse.statusText)
        }

        this.products = await productsResponse.json()
      } catch ({ message }) {
        this.error = message
      } finally {
        this.loading = false
      }
    },
    async onDelete(id) {
      try {
        const deleteResponse = await fetch(
          `http://localhost:3000/product/${id}`,
          {
            method: 'DELETE'
          }
        )

        if (!deleteResponse.ok) {
          throw new Error(deleteResponse.statusText)
        }

        this.fetchProducts()
      } catch ({ message }) {
        this.error = message
      }
    }
  }
}
</script>

<style></style>
