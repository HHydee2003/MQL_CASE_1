const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');
const ProdModel = require('./Products');
const bcrypt = require('bcrypt');
var cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost/Case_1', {})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

// User routes
app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    if (updatedData.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updatedData.password, salt, (err, hash) => {
                if (err) throw err;
                updatedData.password = hash;
                UserModel.findByIdAndUpdate(id, updatedData, { new: true })
                    .then(user => res.json(user))
                    .catch(err => res.json(err));
            });
        });
    } else {
        UserModel.findByIdAndUpdate(id, updatedData, { new: true })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    }
});

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    res.json({ user, message: 'Login Successful' });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            });
        })
        .catch(err => res.json(err));
});

// Product routes
app.get('/products', (req, res) => {
    ProdModel.find()
        .then(products => res.json(products))
        .catch(err => res.json(err));
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    ProdModel.findById(id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ message: "Product not found" }));
});

app.post('/products', (req, res) => {
    ProdModel.create(req.body)
        .then(product => res.json(product))
        .catch(err => res.json(err));
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    ProdModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => res.json(product))
        .catch(err => res.json(err));
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    ProdModel.findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

app.get('/chart-data', async (req, res) => {
    try {
        const salesData = await ProdModel.find({}, { productName: 1, sales: 1, _id: 0 });
        const chartData = salesData.map((data) => ({
            productName: data.productName,
            sales: data.sales,
        }));
        res.json(chartData);
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost/Case_1";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
