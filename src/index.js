/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const $ = require("jquery");
const {getMovies,getMovieInfo} = require('./api.js');
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
  let movieTitle = $("#title");
  getMovies().then((data)=>{
      data.forEach(({title, rating, id}) => {
        if(title.indexOf(movieTitle.val()) > -1) {
        movieTitle.val(title);
        console.log(title);
        }
      });
  });
});