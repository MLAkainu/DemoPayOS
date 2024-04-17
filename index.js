const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS(
    "8112c4ad-43f5-4efe-9923-0f54f83b0784",
    "54ba451e-bdd2-4da8-900e-4473261e547c",
    "191a7a3f56a0facbafd26706ef4569b82d0365f50d21919b991ad17c001527f8"
);

const app = express();

app.use(express.static('public'));
app.use(express.json());

const DOMAIN = 'http://localhost:3000';

app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 10000,
        description: ' Thanh toan don hang',
        orderCode: 11,
        returnUrl: `${DOMAIN}/success.html`,
        cancelUrl: `${DOMAIN}/cancel.html`,
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);

});

// Webhook-url 
app.post("/receive-hook", async (req, res) => {
    console.log(req.body);
    res.json();


})

app.listen(3000, () => console.log('running on port 3000'));