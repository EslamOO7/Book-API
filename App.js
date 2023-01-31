//setup server 
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { Server } = require("socket.io");

app.use(cors()); 
//parse application/json
app.use(express.json());
// parse application/x-www-urlencoded
app.use(express.urlencoded({ extended:false}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Routes
const StoreRoute = require('./Router/store.Route');
app.use("/",StoreRoute);
const BookRoute = require('./Router/Book.Route');
app.use("/books",BookRoute);
const UserRoute = require('./Router/user.Route');
app.use("/users",UserRoute);
const LoginRoute = require('./Router/login.route');
app.use("/user",LoginRoute);
const uploadRoute = require('./Router/Upload.router');
app.use("/",uploadRoute);
const exportRoute = require('./Router/export.route');
app.use("/",exportRoute);
const payment = require('./Router/paypal.route');
app.use('/',payment);



app.get("/", function (req, res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/index.html');
});

app.get("/payment", function (req, res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/payment.html');
});

// success page 
app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});
// error page 
app.get('/err', (req, res) => {
    res.sendFile(__dirname + '/error.html');
})



// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/static', express.static('node_modules'));

app.get("/", function (req, res) {
    // res.send("Server started ........");
    res.sendFile(__dirname + '/index.html');
});

app.get('/',(req,res,next) => {
    res.send('main page for Books App');
});



// app.listen(3000,()=>{
//     console.log('listening on port 3000......');
// });

const server = app.listen(3000, () => {
    console.log(`Server start 3000....... `);
});

// initialize & listen to server
const io = new Server(server);
// Handle connection
io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");

    setInterval(function () {
        var news = getNews();
        // Send news on the socket
        socket.emit('news', news);
    }, 5000);


    socket.on('my other event', function (data) {
        console.log(data);
    });
});

function getNews() {
    var length = Math.floor(Math.random() * 21);
    var news = [];
    for (var i = 0; i < length; i++) {
        var val = { id: i, title: 'The cure of the Sadness is to play Videogames' + i, date: new Date() };
        news.push(val);
    }
    return news;
}

module.exports = app;
