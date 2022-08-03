<template>
  <div>
    <h2>Add product</h2>
    <product-form @send="addProduct" />
    <div v-if="error">Errors: {{ error }}</div>
  </div>
</template>

<script>
import CategorySelect from '../components/CategorySelect.vue'
import ProductForm from '../components/ProductForm.vue'
export default {
  components: { CategorySelect, ProductForm },
  data() {
    return {
      name: '',
      price: '',
      description: '',
      category: '',

      error: null
    }
  },

  methods: {
    async addProduct(product) {
      try {
        const newProductResponse = await fetch(
          'http://localhost:3000/product',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          }
        )

        if (!newProductResponse.ok) {
          throw new Error(newProductResponse.statusText)
        }

        this.$router.push({ name: 'product' })
      } catch (e) {
        console.log(e)
        this.error = e
      }
    }
  }
}
</script>

<style></style>
