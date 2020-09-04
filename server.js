const { createServer } = require("http")
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
var router = express.Router();
var bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session')
const app = express();
const stripe = require('stripe')("sk_test_51H8IiNH2MzWviUMMhJlZZzGdRl0CIjsJJ0Ql8GZ9t3f8rTDhOmSPlPKu7NM0F5odMXyLMvBYgpoA0QqXI39MZB5J005HcPBglr")
const { uuid } = require('uuidv4');
const main = require('./src/mail')
const dev = app.get('env') !== 'production'
if (!dev) {
    app.disable('x-powered-by')
    app.use(compression())
    app.use(morgan('common'))
}

const uuidv4 = require('uuid/v4');

const port = process.env.PORT || 9000;
app.listen(port);
console.log('App is listening on port ' + port);

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var db;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rakesh:rocman911@turningpoint.j7v8f.mongodb.net/TurningPoint?retryWrites=true&w=majority', function (err, database) {
    if (err) return console.log("error ", err)
    db = database;
    console.log('App is listening on port ' + port);
})
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.post('/api/register', (req, res) => {
    var ObjectID = require('mongodb').ObjectID;
    var user = {
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.selectedValue,
        _id: new ObjectID()
    };
    const query = db.collection('Registration').find({ phone: req.body.phone }).toArray(function (err, result) {
        console.log(result);
        if (result.length > 0) return res.json({ data: 'already registered' })
        else {
            db.collection('Registration').insertOne(user);
            res.json({ data: 'record added' })
        }

    });
})

app.post('/api/login', (req, res) => {
    var ObjectID = require('mongodb').ObjectID;
    var role, phone, carDetails = "true"
    const query = db.collection('Registration').find({ phone: req.body.phone, password: req.body.password }).toArray(function (err, result) {
        console.log(result);
        if (result.length <= 0) return res.json({ data: 'no data' })
        // else return res.json({ data: 'data available' })
        else {
            result.map(data => {
                console.log("data.carDetails ", data.carDetails);
                if (data.carDetails === undefined) {
                    carDetails = "false"
                }
                role = data.role
                phone = data.phone
            })
        }
        console.log("undefined ", carDetails);
        if (role === "Admin") return res.json({ data: "Admin", phone: phone })
        if (role === "Driver") return res.json({ data: "Driver", phone: phone, carDetails: carDetails })
    })
});

app.post('/api/orderFood', (req, res) => {
    console.log(req.body);
    var ObjectID = require('mongodb').ObjectID;
    var today = new Date();
    main(req.body)
    var order = {
        phone: req.body.phone,
        address: req.body.address,
        quantity: req.body.quantity,
        amount: req.body.amount,
        date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        _id: new ObjectID()
    };

    const query = db.collection('Order').insertOne(order);
    res.json({ data: 'order added' })
});

app.post('/api/makePayment', (req, res) => {
    const { token, amount } = req.body
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id,
        name: token.card.name,
        address: {
            line1: token.card.address_line1,
            postal_code: token.card.address_zip,
            city: token.card.address_city,
            state: token.card.address_state,
            country: token.card.country,
        }
    }).then(customer => {
        stripe.charges.create({
            amount: amount,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: "donate for the cause!"
        }, { idempotencyKey })
    }).catch(err => console.log(err))
});

module.exports = router;


