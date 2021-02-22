const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const HttpException = require('./utils/HttpException.utils')
const errorMiddleware = require('./middleware/error.middleware')

const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const shopRoute = require('./routes/shop.route')
const driverRoute = require('./routes/driver.route')
const productTypeRoute = require('./routes/product_type.route')
const preProductRoute = require('./routes/pre_product.route')
const buyRoute = require('./routes/buy.route')
const bookRoute = require('./routes/book.route')
const paymentRoute = require('./routes/payment.route')
const sendProductRote = require('./routes/send_product.route')
const sendBookRoute = require('./routes/send_book.route')
const approveRoute = require('./routes/approve_store.route')
const promotionRoute = require('./routes/promotion.route')
const sentTypeRoute = require('./routes/sent_type.route')

const app = express()

dotenv.config()

app.use(express.json())

app.use(cors())

app.options("*", cors())

app.use('/user',userRoute)
app.use('/product', productRoute)
app.use('/product/type', productTypeRoute)
app.use('/pre', preProductRoute)
app.use('/shop', shopRoute)
app.use('/driver', driverRoute)
app.use('/buy', buyRoute)
app.use('/book', bookRoute)
app.use('/payment', paymentRoute)
app.use('/send/product', sendProductRote)
app.use('/send/book', sendBookRoute)
app.use('/approve/store', approveRoute)
app.use('/promotion', promotionRoute)
app.use('/sent/type', sentTypeRoute)

app.options("*", (req, res, next) => {
    const error = new HttpException(404, 'Endpoint Not Found')
    next(err)
})

app.use(errorMiddleware)

const port = Number(process.env.PORT || 3331)

app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
)