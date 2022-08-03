import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/product'
    },
    {
      path: '/product',
      name: 'product',
      component: ProductsView
    },
    {
      path: '/product/new',
      name: 'newProduct',
      component: () => import('../views/NewProductView.vue')
    },
    {
      path: '/product/:id',
      name: 'singleProduct',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/product/:id/edit',
      name: 'editProduct',
      component: () => import('../views/EditProductView.vue')
    }
  ]
})

export default router
