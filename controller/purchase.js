require('dotenv').config();
const Razor = require('razorpay')
const Order = require('../models/order')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

function sendsms(name, source, destination, mobile, paymentid) {
    console.log(name, source, destination, mobile, paymentid);
    client.messages.create({
        from: +14049942227,
        to: `+91${mobile}`,
        body: `THANKS FOR USING PRATAP TRAVELS! YOUR TICKET IS BOOKED FROM ${source} TO ${destination} with paymentId-${paymentid}
        DATE ${new Date()}

        VISIT US  AGAIN`
    }).then((message) => console.log(message.sid));
}


exports.purchaseTickets = async (req, res, next) => {
    const amount = req.body.amount * 100;
    const seatname = req.body.seat;
    console.log(amount);
    const rzp = new Razor({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
        if (err) {
            throw new Error(err);
        }
        Order.create({ orderId: order.id, status: "PENDING", userId: req.user.id, seat: seatname })
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
    const { name, source, destination, Mobile } = req.body;



    if (payment_id == undefined) {
        Order.findOneAndUpdate({ orderId: order_id }, { paymentId: payment_id, status: "FAILED" })
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
        sendsms(name, source, destination, Mobile, payment_id)
    }
}
