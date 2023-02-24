const express = require("express");
const mongoose = require("mongoose");
// const { MongoClient } = require('mongodb');
var cors = require('cors');
const bodyParser = require('body-parser');
const User = require("./models/User");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
function handle_url(url) {
    app.get(url, function (req, res) {
        res.send('Hellow' + url)
    })
}
app.get(`/`, function (req, res) {
    res.send('Hello Sir')

})
app.get('/all-users', async (req, res) => {
    try {
        const allData = await User.find()
        return res.json(allData)
    }
    catch (err) {
        console.log(err.message)
    }
})
// app.get('/:id', async (req, res) => {
//     // const allData = await User.find()
//     // handle_url(req.url)
//     // res.send('hello id:' + req.url)
//     try {
//         let idd = req.url.slice(1)
//         const users = await User.find()
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i]._id.toString())
//             if (users[i]._id.toString() === idd) {
//                 return res.json(users[i])
//             }
//         }
//         // return res.json('USER NOT FOUND')
//         res.redirect('/')
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
app.get("/rabee", (req, res) => {
    res.json({ message: "Hello from RABEEEEE" });
});
app.post('/data', (req, res) => {
    console.log('Got a request', req.body)
    let data = req.body;
    var user = new User(req.body)
    // var user = new User({ name: 'RabeeXX', mobile: '08888881' })
    user.save()
    res.send(JSON.stringify(data));
})


app.get('/user/:id', async (req, res) => {
    try {
        console.log('req.params.id', req.params.id)
        const user = await User.findById(req.params.id)
        return res.json(user)
    }
    catch (err) {
        console.log(err.message)
    }

})

mongoose.set('strictQuery', true);

const dbConnection = mongoose.connect("mongodb+srv://rabee:678081forever@cluster0.ravai.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
