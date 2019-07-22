const $ = require("jquery");
module.exports = {
    getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
    },
    getMovieInfo: (title) => {
    return fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=e66939d3`)
        .then(response => response.json())
    },
    addMovie: (arr) =>{
        let origin = $("#post-title").val();
        let rate = $('#post-rate').val();
        let title;
        let poster;
            fetch( `http://www.omdbapi.com/?s=${origin}&r=json&type=movie&apikey=e66939d3`)
            .then(response => response.json())
            .then(movies =>{
                console.log(movies);
                poster = movies.Search[0].Poster;
                title = movies.Search[0].Title;

        const url = '/api/movies';
        const movie = {
            "title": title,
            "rating": rate,
            "id": (arr.length),
            "poster": poster
        };
        // console.log(url);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options)
            })
    },
    updateMovie:  (arr,counter)=>{
        // let origin = $("#get-title").val();
        let rate = $('#get-rate').val();
        console.log(rate);
        console.log(arr);
        const url = `/api/movies/${counter}`;
        const movie = {
            "title": arr[counter].title,
            "rating": rate,
            "id": arr[counter].id,
            "poster": arr[counter].poster
        };
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options)
    }
};
