/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const $ = require("jquery");
const {getMovies,getMovieInfo,addMovie,updateMovie,deleteMovie} = require('./api.js');

let count = 0;

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
            deleteMovie(data,deleted);
          $(this).parent().parent().html("");
        });
      });
};
buildHtml();

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rate, id}) => {
//   });
// }).catch((error) => {
//   console.log('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });
$("#search").on("click",function(){
  let movieTitle = $("#get-title");
  getMovies().then((data)=>{
      data.forEach((movie) => {
        if(movie.title.indexOf(movieTitle.val()) > -1) {
        movieTitle.val(movie.title);
        $("#get-rate").val(movie.rating);
        $(".picture").html(`<img id="poster-img" src=${movie.poster} alt="poster">`);
          count = data.indexOf(movie);
          console.log(count);
        }
      });
  });
});
$("#update").on("click",function(){
  getMovies().then(data => {
    updateMovie(data,count)
  }).then(buildHtml)
});
$("#add").on("click",function(){
  let movieArr;
  getMovies().then(data =>{
    addMovie(data);
  });
});
