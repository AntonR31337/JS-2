const fs = require('fs');

const writeFromAllFile = (data) => new Promise((resolve, reject) => {
    fs.writeFile('./static/basket-goods.json', JSON.stringify(data), (err) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

const getAllFromFile = () => new Promise((resolve, reject) => {
    fs.readFile('./static/basket-goods.json', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(data));
        }
    });
});

module.exports = {

}