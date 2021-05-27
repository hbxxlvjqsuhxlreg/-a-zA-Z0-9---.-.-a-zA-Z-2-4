require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

mongoose.connect('mongodb://localhost:27017/tradeOffDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log('Connected to DB');
});

app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use("/user", userRoutes);
app.use("/products", productRoutes);

app.get('/failed', (req, res) =>{
    res.send("failed")
})
app.get('/success', (req, res) => {
    res.send("success")
})




app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running on port " + process.env.PORT);
})
