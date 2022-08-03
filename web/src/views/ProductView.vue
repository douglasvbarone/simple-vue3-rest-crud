<template>
  <div v-if="product">
    <a class="btn primary" href="#" @click="$router.back()">Back</a>
    <a
      class="btn secondary"
      href="#"
      @click="$router.push({ name: 'editProduct', params: { id: product.id } })"
    >
      Edit
    </a>
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <p>Category: {{ product.category.name }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: 'ProductView',
  data: () => ({
    product: undefined
  }),
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      const productResponse = await fetch(
        'http://localhost:3000/product/' + this.$route.params.id
      )
      const product = await productResponse.json()
      this.product = product
    }
  }
}
</script>

<style></style>
