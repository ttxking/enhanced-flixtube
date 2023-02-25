const express = require('express')
const mongodb = require('mongodb')

const app = express()
const PORT = process.env.PORT
const DBHOST = process.env.DBHOST
const DBNAME = process.env.DBNAME

let advertisingDb

mongodb.MongoClient.connect(DBHOST, { useUnifiedTopology: true })
    .then((client) => {
        advertisingDb = client.db(DBNAME)
    })

app.get('/advertising', (req, res) => {
    const products = advertisingDb.collection('products')
    products.find().toArray().then((products) => {
        const product = products[Math.floor(Math.random() * products.length)];
        res.json(product)
    })
})

app.listen(PORT, () => {
    console.log('Advertising service is running on port ' + PORT)
})