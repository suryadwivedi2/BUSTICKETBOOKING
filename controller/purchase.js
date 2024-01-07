require('dotenv').config();
const Razor = require('razorpay')
const Order = require('../models/order')



exports.purchaseTickets = async (req, res, next) => {
    const amount = req.body.amount * 100;
    console.log(amount)
    const rzp = new Razor({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
        if (err) {
            throw new Error(err);
        }
        Order.create({ orderId: order.id, status: "PENDING", userId: req.user.id })
            .then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id })
            })
    }).catch(err => {
        res.status(401).json({ message: 'something went wrong' })
    })
}


exports.updatetransaction = (req, res, next) => {
    const payment_id = req.body.payment_id;
    const order_id = req.body.order_id;
    const userId = req.user.id;

    if (payment_id == undefined) {
        Order.findOneAndUpdate({ orderId: order_id },{ paymentId: payment_id, status: "FAILED" })
                    .then(() => {
                        return res.status(201).json({ success: false, message: 'transaction failed' });
                    }).catch(err => {
                        console.log(err)
                    })
    } else {
        Order.findOneAndUpdate({ orderId: order_id }, { paymentId: payment_id, status: "SUCCESSFULL" })
            .then(() => {
                return res.status(201).json({ success: true, message: 'transaction successfull' });
            }).catch(err => {
                console.log(err)
            })
    }
}
