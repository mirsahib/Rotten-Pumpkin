$(document).ready(function() {
  var genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  loadData(function() {
    nowPlaying = JSON.parse(localStorage.getItem("nowPlaying"));
    upComming = JSON.parse(localStorage.getItem("upcomming"));
    popular = JSON.parse(localStorage.getItem("popular"));
    //show nowPlaying
    for (var i = 0; i < 3; i++) {
      npImgUrl = "http://image.tmdb.org/t/p/w780" + nowPlaying[i].poster_path;
      npTitle = nowPlaying[i].original_title;
      npMovId = nowPlaying[i].id;
      var list = $(
        '<li><a id="' +
          npMovId +
          '" href="#"><img style = "width:800px;height:720px" src="' +
          npImgUrl +
          '" alt="' +
          npTitle +
          '"title="' +
          npTitle +
          '"></a></li>'
      );
      $("#slides").append(list);
    }
    $(".slider").flexslider({
      controlNav: false,
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>'
    });
    var x = nowPlaying[0].genre_ids;
    console.log(x[0]);
  });
});

async function loadData(callback) {
  if (localStorage != 3) {
    const url1 =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";
    const url2 =
      "https://api.themoviedb.org/3/movie/upcoming?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";

    const url3 =
      "https://api.themoviedb.org/3/movie/popular?api_key=c438d70b1fcbf9e8f9852482df70fa5f&language=en-US&page=1";

    var fileName = ["nowPlaying", "upcomming", "popular"];
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all([
        fetch(url1).then(response => response.json()), // parse each response as json
        fetch(url2).then(response => response.json()),
        fetch(url3).then(response => response.json())
      ]);
      var count = 0;
      for (var i of data) {
        var items = [];
        for (var j = 0; j < 5; j++) {
          items.push(i["results"][j]);
        }
        localStorage.setItem(fileName[count], JSON.stringify(items));
        count++;
      }
      callback();
    } catch (error) {
      console.log(error);
    }
  } else {
    callback();
  }
}
