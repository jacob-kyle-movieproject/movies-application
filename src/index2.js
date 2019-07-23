const {addMovie, } = require('/index.html');

let addMovie= function() {
    let origin = $("#post-title").val()
    let rate = $('#post-rate').val()

    const movie = {
        "title": origin,
        "rating": rate,
        "id": (movies.length + 1)
    };
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then(console.log("whoo..."))
        .catch(console.log("boo..."));

};

