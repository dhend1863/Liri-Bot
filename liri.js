require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let request = require('request');
let omdbAPI = "triology";
let moment = require("moment");


var getArtistNames = function(artist){
    return artist.name;
}


var getSpotify = function(songName) {

    var spotify = new Spotify({
        id: 'bb37c950259f4c9083adef4c55965611',
        secret: 'db7a1f7c7f194da08bcff709722b3cb3',
    });

    spotify.search({ type: 'track', query: songName, limit:1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(
                getArtistNames));
                console.log('song name: ' + songs[i].name);
                console.log('preview song: ' + songs[i].preview_url);
                console.log('album: ' + songs[i].album.name);
                console.log('------------------------------------------------------');
        }
            

    });

}

request('http://www.omdbapi.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

var pick = function(caseData, functionData){
    switch(caseData){
        case 'spotify-this-song':
        getSpotify(functionData);
        default:
            console.log('LIRI does not know that one, jabroni')
    }
}

var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);