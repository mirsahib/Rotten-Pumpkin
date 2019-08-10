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
    for (let i = 0; i < 3; i++) {
      var npImgUrl =
        "http://image.tmdb.org/t/p/w780" + nowPlaying[i].poster_path;
      var npTitle = nowPlaying[i].original_title;
      var npMovId = nowPlaying[i].id;
      var list = $(
        '<li><a id="' +
          npMovId +
          '" href="#"><img style = "width:800px" src="' +
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
    //show upcomming movie
    for (let i = 0; i < 2; i++) {
      var upImgUrl =
        "http://image.tmdb.org/t/p/w185" + upComming[i].poster_path;
      var upTitle = upComming[i].original_title;
      var upMovId = upComming[i].id;
      var upMovgen = upComming[i].genre_ids;
      var upMovReleaseDate = upComming[i].release_date;
      var divCol = $('<div class="col-sm-6 col-md-12">');
      var divCard = $('<div class="card">');
      var img = $('<img class="card-img-top" src="' + upImgUrl + '" />');
      var cardBody = $('<div class="card-body">');
      var cardTitle = $('<h3 class="card-title">' + upTitle + "</h3>");
      var cardGenre = $('<h5 id = "genres">Genres: </h5>');
      var text = "";
      for (let j = 0; j < upMovgen.length; j++) {
        let singleGenId = upMovgen[j];
        text += genres[singleGenId] + ",";
      }
      cardGenre.append("<span>" + text + "</span>");
      var cardDate = $(
        '<h5 class="card-title"> Release Date: ' + upMovReleaseDate + "</h5>"
      );

      var cartBtn = $(
        '<button id="' +
          upMovId +
          '" class="btn btn-warning cardbtn" href="#" >Details</button>'
      );
      divCard.append(img);
      cardBody.append(cardTitle);
      cardBody.append(cardGenre);
      cardBody.append(cardDate);
      cardBody.append(cartBtn);
      divCard.append(cardBody);
      divCol.append(divCard);
      $("#Upcomming_Movie").append(divCol);

      //console.log(upImgUrl + " " + upTitle + " " + upMovId);
    }
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
