<template>
  <div>
    <h2>Add product</h2>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" v-model="price" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="description"
        ></textarea>

        <category-select v-model="category" />
      </div>
      <button type="submit" class="btn primary">Add</button>
    </form>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import CategorySelect from '../components/CategorySelect.vue'
export default {
  components: { CategorySelect },
  data() {
    return {
      name: '',
      price: '',
      description: '',
      category: '',

      error: null
    }
  },
  mounted() {},
  methods: {
    async addProduct() {
      const product = {
        name: this.name,
        price: this.price,
        description: this.description,
        category: this.category
      }

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
      } catch ({ message }) {
        this.error = message
      }
    }
  }
}
</script>

<style></style>
