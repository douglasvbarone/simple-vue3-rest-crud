<template>
  <div>
    <label for="category">Category: </label>
    <select
      v-if="categories.length > 0"
      id="category"
      v-model="category"
      @change="onChange"
    >
      <option
        v-for="(categoryOption, index) in categories"
        :key="index"
        :value="categoryOption.name"
      >
        {{ categoryOption.name }}
      </option>
    </select>
    <button @click.prevent="addCategory">+ New</button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },

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

      this.category = this.modelValue
    },

    onChange() {
      this.$emit('update:modelValue', this.category)
    },

    async addCategory() {
      const newCategory = prompt('New category name:')

      if (newCategory) {
        const categoryResponse = await fetch('http://localhost:3000/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newCategory
          })
        })

        const category = await categoryResponse.json()

        await this.fetchCategories()

        this.category = category.name
        this.$emit('update:modelValue', this.category)
      }
    }
  }
}
</script>

<style></style>
