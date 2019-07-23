const $ = require("jquery");
let buildHtml= function(){
    fetch('/api/movies')
        .then(response => response.json())
        .then(data =>{
            $("#content").removeClass("hidden");
            $(".loading").addClass("hidden");
            let list = $("#all-movie");
            const sort = (data.sort(function(a, b){
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            }));
            let row = "";
            for(let movie of sort){
                row += `<div class="main">`;
                row += `<div class="li1"><img class='li-img' src=${movie.poster} alt='poster'></div>`;
                row += `<p class="li">${movie.title}</p>`;
                row += `<p class="li">${movie.rating}</p>`;
                row += `<div class="li"><img class="delete" src="img/x.png" alt="x"></div>`;
                row += `</div>`;
                list.html(row);
            }
            $(".delete").on("click",function(){
                let deleted = $(this).parent().parent().children().first().next().html();
                deleteMovie(data,deleted)

            });
        });
};
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
            "poster": poster
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };
        fetch(url, options);
        buildHtml()
            });
    },
    updateMovie:  (arr,counter)=>{
        // let origin = $("#get-title").val();
        let rate = $('#get-rate').val();
        const url = `/api/movies/${counter}`;
        const movie = {
            "title": arr[counter].title,
            "rating": rate,
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
                let movieId = data.indexOf(movie);
                let url = `/api/movies/${movieId}`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie),
                };
                    fetch(url, options);
                data.forEach(function(movie,i){
                    if(i > movieId) {
                        const url2 = `/api/movies/${i}`;
                        const movieObj = {
                            "title": movie.title,
                            "rating": movie.rating,
                            "poster": movie.poster
                        };
                        const options2 = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(movieObj),
                        };
                        fetch(url2, options2);
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
