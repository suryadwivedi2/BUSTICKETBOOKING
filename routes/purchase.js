const express = require('express')

const router = express.Router();

const purchasecontroller = require('../controller/purchase')
const auth = require('../middleware/auth')

router.post('/purchase-ticket', auth.autheticate, purchasecontroller.purchaseTickets)
router.post('/update-transaction', auth.autheticate, purchasecontroller.updatetransaction);
router.get('/get-order', purchasecontroller.getOrder)


module.exports = router;