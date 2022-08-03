import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const PORT = process.env.port || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Product index
app.get('/product', async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true }
  })

  res.json(products)
})

// Product create
app.post('/product', async (req, res) => {
  const { name, description, price, category } = req.body

  if (!name || !price || !category) {
    res.status(400).json({
      error: 'Missing required fields'
    })
    return
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category: {
          connectOrCreate: {
            create: {
              name: category
            },
            where: {
              name: category
            }
          }
        }
      }
    })

    res.json(product)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
})

// Product update
app.put('/product/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, price, category } = req.body

  const product = await prisma.product.update({
    where: { id: +id },
    data: {
      name,
      description,
      price,
      category: {
        connectOrCreate: {
          create: {
            name: category
          },
          where: {
            name: category
          }
        }
      }
    }
  })

  res.json(product)
})

// Product single
app.get('/product/:id', async (req, res) => {
  const { id } = req.params

  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { category: true }
  })

  res.json(product)
})

// Product delete
app.delete('/product/:id', async (req, res) => {
  const { id } = req.params

  const product = await prisma.product.delete({
    where: { id: +id }
  })

  res.json(product)
})

// Category index
app.get('/category', async (req, res) => {
  const categories = await prisma.category.findMany()

  res.json(categories)
})

// 404
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
