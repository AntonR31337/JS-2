const express = require('express');
const cors = require('cors');
const { addGood, getBasketGoods } = require('./helpers');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.get('/basketgoods', (req, res) => {
    getBasketGoods().then((data) => {
        res.send(data);
    });
});
app.get('/', (req, res) => {
    res.send('hello!');
});

app.post('/:id', (req, res) => {
    addGood(req.params.id).then(() => {
        getBasketGoods().then((data) => {
            res.send(data);
        });
    }).catch((err) => {
        res.send(err);
    })
});

app.listen('8000', () => {
    console.log('This server is run');
});