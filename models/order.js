const mongoose = require('mongoose')
const { TrustProductsEntityAssignmentsContextImpl } = require('twilio/lib/rest/trusthub/v1/trustProducts/trustProductsEntityAssignments')
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
  },
  seat: {
    type: String,
  },
  journeydate: {
    type: Date,
    reqiured: true,

  }
})


module.exports = mongoose.model('Order', orderSchema)