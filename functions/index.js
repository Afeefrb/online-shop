const functions = require('firebase-functions');

//Building an Express app and hosting on cloud functions
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_TbJGiz7ZfLvDhyQzhgAYHSah001D8pw1js");

//% API

//App Config
const app = express();


//Middlewares
app.use(cors({origin:true}))
app.use(express.json());

//API routes
app.get("/", (req,res) => {
    res.status(200).send("Hello, this is cloud functions")
})

app.post("/payments/create", async (req,res) => {
    const total = req.query.total;

    console.log("total",total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //subunits (ex: paise)
        currency:"inr"
    })

    res.status(200).send({
        clientSecret: paymentIntent.client_secret
    })
})



//Listen to the command from the app
exports.api = functions.https.onRequest(app);

// functions[api]: http function initialized  === API END POINT
//http://localhost:5001/online-shop-mall/us-central1/api