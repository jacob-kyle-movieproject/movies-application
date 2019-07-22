module.exports = {
    getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
    },
    getMovieInfo: (title) => {
    return fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=e66939d3`)
        .then(response => response.json())
    }
};
