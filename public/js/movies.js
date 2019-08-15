$(document).ready(() => {
  loadData(function() {
    //console.log("show function");
    toprated = JSON.parse(localStorage.getItem("toprated"));
    console.log(toprated);
    // <div class="movie">
    //   <figure class="movie-poster">
    //     <img src="dummy/thumb-3.jpg" alt="#" />
    //   </figure>
    //   <div class="movie-title">
    //     <a href="single.html">Maleficient</a>
    //   </div>
    // </div>;
    for (var i = 0; i < toprated.length; i++) {
      var topImgUrl =
        "http://image.tmdb.org/t/p/w185" + toprated[i].poster_path;
      var topTitle = toprated[i].original_title;
      var topMovId = toprated[i].id;

      var movieClass = $('<div class="movie">');
      var img = $('<img src="' + topImgUrl + '" alt="#" />');
      var figClass = $('<figure class="movie-poster">');
      var titleClass = $('<div class="movie-title">');
      var titleLink = $(
        '<a href="/single/' + topMovId + '">' + topTitle + "</a>"
      );
      var recombtn = ejs.render();

      figClass.append(img);
      titleClass.append(titleLink);
      movieClass.append(figClass);
      movieClass.append(titleClass);
      movieClass.append(recombtn);
      $("#movie_list").append(movieClass);
    }
  });
});

async function loadData(callback) {
  //console.log("load function");
  if (localStorage != 4) {
    const url1 =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";

    try {
      fetch(url1)
        .then(result => {
          return result.json();
        })
        .then(data => {
          var item = [];
          for (var i = 0; i < data["results"].length; i++) {
            item.push(data["results"][i]);
          }
          localStorage.setItem("toprated", JSON.stringify(item));
        })
        .catch(error => {
          console.log(error);
        });
      callback();
    } catch (error) {
      console.log(error);
    }
  } else {
    callback();
  }
}
