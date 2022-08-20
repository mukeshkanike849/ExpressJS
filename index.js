const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 4000

const products = [
    {
        _id: 1,
        pName: "Laptop",
        pDesc: "For working",
        pPrice: 96000
    },
    {
        _id: 2,
        pName: "Mobile",
        pDesc: "For Calling",
        pPrice: 61000
    },
    {
        _id: 3,
        pName: "Watch",
        pDesc: "Smart watch",
        pPrice: 21000
    }
]

const app = express()

//Built in middlwaware URl encode middleware/body parser middleware
app.use(express.urlencoded({ extended: true }))

//SetUp template engine(Handlebars)
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('./landingPage.handlebars')
})

app.get('/products/products', (req, res) => {
    res.render('./products.handlebars', { products })
})

app.get('/products/add-product', (req, res) => {
    res.render('./addProduct.handlebars')
})

app.post('/products/add-product', (req, res) => {

    // console.log(req.body);
    let { _id, pName, pDesc, pPrice } = req.body
    console.log(_id);
    _id = parseInt(_id)
    pPrice = parseInt(pPrice)
    products.push({ _id, pName, pDesc, pPrice })
    res.redirect('/products/products')
})

app.get('/products/edit-product/:_id', (req, res) => {
    console.log(req.params._id);
    const index = products.findIndex((products) => {
        return parseInt(products._id) === parseInt(req.params._id)
    })
    const selectedProduct = products[index]
    res.render('./editProduct.handlebars', { selectedProduct })
})

app.post('/products/edit-product', (req, res) => {
    console.log(req.body)
    const index = products.findIndex((products) => {
        return parseInt(products._id) === parseInt(req.body._id)
    })
    products[index] = req.body
    res.redirect('/products/products')
})

app.get('/products/delete-product/:_id', (req, res) => {
    console.log(req.params._id)
    const index = products.findIndex((products) => {
        return parseInt(products._id) === parseInt(req.params._id)
    })
    products.splice(index, 1)
    res.redirect('/products/products')
})

app.listen(PORT, () => {
    console.log(`Server Listening at ${PORT}`)
})