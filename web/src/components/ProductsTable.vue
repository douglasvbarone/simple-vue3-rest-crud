<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.category.name }}</td>
        <td>
          <a class="btn secondary" @click="$emit('delete', product.id)">
            Delete
          </a>
          <a class="btn secondary" @click="$emit('edit', product.id)"> Edit </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
table {
  width: 100%;
}

thead {
  background-color: #23262c;
  color: #e6e6e6;
}

td {
  padding: 6px;
}

tr:nth-child(2n) {
  background-color: #e0e0e0;
}
</style>
