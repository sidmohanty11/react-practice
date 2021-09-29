const express = require('express');
const mongoose = require('mongoose');
const Cards = require('./Models/dbCard');
const Cors = require('cors');

//APP CONFIG
const app = express();
const port = process.env.PORT || 8000;
const db_url = 'mongodb+srv://new_user:BkCeTvGtvTJg51aF@cluster0.2w9pe.mongodb.net/tinderdb?retryWrites=true&w=majority';

//MIDDLEWARES
app.use(express.json());
app.use(Cors());

//DB CONFIG
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//API ENDPOINTS
app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });

});

app.get('/tinder/cards', (req, res) => {

    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });

});

//LISTENER
app.listen(port, () => console.log(`listening on port ${port}`));

