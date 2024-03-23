// const cors = require('cors');
// app.use(cors({ credentials: true, origin: "http://127.0.0.1:5501" }));

const express = require('express');
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akashbahri90:wi5ULQterlZTWkaN@cluster0.u97s9sw.mongodb.net/Node');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Configure the express-session middleware
const session = require('express-session'); 
const oneDay = 1000 * 30;
app.use(session({
    secret: '76597608687669757',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay, secure: false, httpOnly: true },
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
const userRoutes = require('./controller/routes/userRoutes');
const productRoutes = require('./controller/routes/productRoutes');
const cartRoutes = require('./controller/routes/cartRoutes');
const orderRoutes = require('./controller/routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.get('/', function(req, res) {
    res.render('index');
});


const port = 3001; 
const hostname = '127.0.0.1';

app.listen(port, hostname, () => console.log(`Example app listening on port http://${hostname}:${port}/`));