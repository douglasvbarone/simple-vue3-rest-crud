<template>
  <div>
    <h2>Edit product {{ name }}</h2>
    <product-form
      v-if="!loading"
      @send="editProduct"
      :product="{ name, price, description, category }"
    />
  </div>
</template>

<script>
import CategorySelect from '../components/CategorySelect.vue'
import ProductForm from '../components/ProductForm.vue'
export default {
  components: { CategorySelect, ProductForm },
  data: () => ({
    name: '',
    price: '',
    description: '',
    category: '',

    loading: true,
    error: null
  }),
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      try {
        this.loading = true
        const productResponse = await fetch(
          `http://localhost:3000/product/${this.$route.params.id}`
        )

        if (!productResponse.ok) {
          throw new Error(productResponse.statusText)
        }

        const product = await productResponse.json()
        this.name = product.name
        this.price = product.price
        this.description = product.description
        this.category = product.category.name
      } catch (e) {
        console.log(e)
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async editProduct(product) {
      try {
        const newProductResponse = await fetch(
          `http://localhost:3000/product/${this.$route.params.id}`,
          {
            method: 'PUT',
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
      } catch ({ message }) {
        this.error = message
      }
    }
  }
}
</script>

<style></style>
