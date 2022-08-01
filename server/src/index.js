import express from 'express'
import bodyParser from 'body-parser'

const PORT = process.env.port || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/product', (req, res) => {
  res.json({ products: [{ name: 'product 1' }, { name: 'product 2' }] })
})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
