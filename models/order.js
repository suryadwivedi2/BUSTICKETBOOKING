const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new schema({
    paymentId: {
        type: String,
      },
      orderId: {
        type: String,
      },
      status: {
        type: String,
      },
      userId: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    })


module.exports = mongoose.model('Order', orderSchema)