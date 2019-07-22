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
            let list = $("#all-movie");
            let row = "";
            row += `<div class="li1"><img id="li-img" src=${poster} alt="poster"></div>`;
            row += `<p class="li">${title}</p>`;
            row += `<p class="li">${rate}</p>`;
            row += `<div class="li"><img class="delete" src="img/x.png" alt="x"></div>`;
            list.append(row).scrollTop(999999999999999999999);
        // console.log(url);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options)
            });

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
    },
    deleteMovie: (data,title)=> {
        data.forEach(function(movie){
            if(movie.title === title){
                let url = `/api/movies/${movie.id}`;
                let movieId = movie.id;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie),
                };
                    fetch(url, options);
                data.forEach(function(movie,i){
                    if(i >= movieId) {
                        const url2 = `/api/movies/${i}`;
                        const movieObj = {
                            "title": movie.title,
                            "rating": movie.rate,
                            "id": (movie.id - 1),
                            "poster": data[1].poster
                        };
                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(movieObj),
                        };
                        fetch(url2, options);
                    }
            });
            }
        });
    }
    //     const url = `/api/movies/${counter}`;
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(movie),
    //     fetch(url, options)
    // }
};
