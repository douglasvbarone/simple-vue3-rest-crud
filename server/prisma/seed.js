const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const productsTransaction = []

for (let i = 0; i < 20; i++) {
  productsTransaction.push(
    prisma.product.create({
      data: {
        name: `Product ${i + 1}`,
        description: `Description ${i + 1}`,
        price: (Math.random() * 100).toFixed(2).toString(),
        category: {
          connectOrCreate: {
            create: {
              name: `Category ${(i % 4) + 1}`
            },
            where: {
              name: `Category ${(i % 4) + 1}`
            }
          }
        }
      }
    })
  )
}

prisma.$transaction(productsTransaction).catch(console.error).then(console.log)
