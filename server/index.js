const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'));

app.get('/', (req, res) => {
    res.send('hello!');
});

app.post('/:id', (req, res) => {
    console.log(req.params.id);
});

app.listen('8000', () => {
    console.log('This server is run');
});