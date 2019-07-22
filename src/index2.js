const { , } = require('/index2.js');

const movie = {
    "title": ,
    "rating": ,
    "id":
};
const url = '../db.json';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
};
fetch(url, options)
    .then(/* post was created successfully */)
    .catch(/* handle errors */);

