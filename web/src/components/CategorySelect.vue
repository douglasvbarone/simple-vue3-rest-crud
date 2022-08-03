<template>
  <div>
    <label for="category">Category: </label>
    <select id="category" v-model="category" @change="onChange">
      <option
        v-for="(categoryOption, index) in categories"
        :key="index"
        :value="categoryOption.name"
      >
        {{ categoryOption.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data: () => ({
    category: '',
    categories: []
  }),
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const categoriesResponse = await fetch('http://localhost:3000/category')
      const categories = await categoriesResponse.json()
      this.categories = categories
    },
    onChange() {
      this.$emit('update:modelValue', this.category)
    }
  }
}
</script>

<style></style>
