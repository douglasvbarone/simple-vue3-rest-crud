<template>
  <form @submit.prevent="submitProduct">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" v-model="name" />
    </div>
    <div class="form-group">
      <label for="price">Price:</label>
      <input
        v-maska="'#*'"
        type="text"
        class="form-control"
        id="price"
        v-model="price"
      />
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea class="form-control" id="description" v-model="description" />

      <category-select v-model="category" />
    </div>
    <button type="submit" class="btn primary">Save</button>
  </form>
</template>

<script>
import CategorySelect from '../components/CategorySelect.vue'

export default {
  name: 'ProductForm',
  props: {
    product: {
      type: Object,
      required: false
    }
  },

  components: { CategorySelect },

  data: () => ({
    name: '',
    price: '',
    description: '',
    category: ''
  }),

  mounted() {
    this.name = this.product?.name
    this.price = this.product?.price
    this.description = this.product?.description
    this.category = this.product?.category
  },

  methods: {
    async submitProduct() {
      const product = {
        name: this.name,
        price: this.price,
        description: this.description,
        category: this.category
      }

      this.$emit('send', product)
    }
  }
}
</script>

<style></style>
