<<<<<<< 2604b60b08b6db0722f2e8e862f8e289b22bf928
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var getMyTweets = function() {

    var client = new Twitter (keys.twitterKeys);

    var params = {
        screen_name: 'findtyler3'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
    //    console.log(tweets);
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);
            }
        }  
    });
}

var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {
    var spotify = new Spotify({
        id: '500a39e058874b0b8fda2fc1e9f7499f',
        secret: '5b5c9990784d4e12a7d4671b8bccf0bd'
      });
    spotify.search({ 
        type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items; 
        for (let i = 0; i < songs.length; i++) {
            console.log (i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-------------------------------------------');
        }
    });
}

var getMeMovie = function (movieName) {
    request('http://wwww.omdapi.com/?t=', function (error, response, body) {
        if (!error && response.statuscode == 200) {
            var jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: '+ jsonData.Rated); 
            console.log('IMDB Rating: ' + jsonData.imbdRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language' + jsonData.Language); 
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomoatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err,data) {
        if (err) throw err;
        var dataArr = data.split(',');
        if (dataArr.length == 2) {
            pick(dataArr.length == 1) 
                pick(dataArr[0]);
        }   
    });
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song': 
            getMeSpotify(functionData);  
        case 'movie-this' :
            getMeMovie(functionData); 
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log('liri does not know that');  
    }
}

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
=======
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var getMyTweets = function() {
// console.log("moreTweets")
    var client = new Twitter (keys);

    var params = {
        screen_name: 'findtyler3'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        // console.log("sometweets");
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(" ");
                console.log(tweets[i].text);
            }
        } else {
            console.log(error)
        } 
    });
}

var getArtistNames = function(artist) {
    return artist.name;
}
var spotify = new Spotify({
    id: '500a39e058874b0b8fda2fc1e9f7499f',
    secret: '5b5c9990784d4e12a7d4671b8bccf0bd'
  });

var getMeSpotify = function(songName) {
    // console.log("this is song name", songName)
    spotify.search({ 
        type: 'track', 
        query: songName 
    }, 
    function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items; 
        for (let i = 0; i < songs.length; i++) {
            console.log (i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-------------------------------------------');
        }
    });
}

var getMeMovie = function (movieName) {
    console.log(movieName)
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=full&tomatoes=true&apikey=trilogy', function (error, response, body) {
        console.log(request.statusCode)
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: '+ jsonData.Rated); 
            console.log('IMDB Rating: ' + jsonData.imbdRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language' + jsonData.Language); 
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomoatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        } else {
            console.log("tweets")
        }
    });
}

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err,data) {
        if (err) throw err;
        var dataArr = data.split(',');
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]) 
        }   
    });
}

function pick (caseData, functionData) {
    // console.log("running", caseData, functionData)
    switch (caseData) {
        case 'my-tweets':
        // console.log("tweets")
            getMyTweets();
            break;
        case 'spotify-this-song': 
            getMeSpotify(functionData); 
            break;
        case 'movie-this' :
            getMeMovie(functionData); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
        default:
        console.log('liri does not know that');  

    }
}

// var runThis = function (argOne, argTwo) {
//     pick(argOne, argTwo);
// };
// console.log()
pick(process.argv[2], process.argv[3]);
>>>>>>> final update
