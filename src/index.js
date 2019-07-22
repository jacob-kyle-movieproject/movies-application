/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
let count = 0;
const $ = require("jquery");
const {getMovies,getMovieInfo,addMovie,updateMovie} = require('./api.js');
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  console.log('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
$("#search").on("click",function(){
  let movieTitle = $("#get-title");
  getMovies().then((data)=>{
      data.forEach(({title, rating,poster, id}) => {
        if(title.indexOf(movieTitle.val()) > -1) {
        movieTitle.val(title);
        $("#get-rate").val(rating);
        $(".picture").html(`<img src=${poster} alt="poster">`);
        console.log(title);
          console.log(id);
          count = id;
        }
      });
  });
});
$("#update").on("click",function(){
  getMovies().then(data => {
    updateMovie(data,count)
  })
});
$("#add").on("click",function(){
  let movieArr;
  getMovies().then(data =>{
    addMovie(data)
  })
});