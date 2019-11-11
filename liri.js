require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const axios = require('axios')
const fs = require('fs')
const moment = require('moment')

const searchType = process.argv[2];
const searchTerm = process.argv.slice(3).join(' ')
let txtArr = []

// Switch function for user input
const searchSwitch = (switchTerm, functionData) => {

    switch (switchTerm) {
        case 'concert-this':
            logEntry(switchTerm, functionData);
            concertThis(functionData);
            break;
        case 'spotify-this-song':
            logEntry(switchTerm, functionData);
            getSpotify(functionData);
            break;
        case 'movie-this':
            logEntry(switchTerm, functionData);
            checkMovie(functionData);
            break;
        case 'do-what-it-says':
            doThing();
            break;
        default:
            console.log('IDK What you want dude');
    }
}
// ============================

// Concert Function
const concertThis = (band) => {
    let concertURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`

    axios.get(concertURL).then(function (response) {
        let concerts = response.data
        for (let i = 0; i < concerts.length; i++)
            console.log(`Venue: ${concerts[i].venue.name}
Location: ${concerts[i].venue.city}, ${concerts[i].venue.region}
Date: ${moment(concerts[i].datetime).format('MM/DD/YYYY')}
_________________________________
        `);
    })
}

// Spotify functions
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

// ==============================

// OMDB Functon 
const movieThis = (movie) => {
    let movieURL = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&tomatoes=true&apikey=trilogy`;
    axios.get(movieURL).then(
        function (response) {
            let newMovie = response.data
            console.log(`
Title: ${newMovie.Title}
Year: ${newMovie.Year}
IMDB Rating: ${newMovie.imdbRating}
Rotten Tomatoes Rating:${newMovie.Ratings[1].Value}
Country: ${newMovie.Country}
Language: ${newMovie.Language}
Plot: ${newMovie.Plot}
Actors: ${newMovie.Actors}
____________________________
    `);
        }
    );
}
const checkMovie = (movie) => {
    if (!movie) {
        movieThis('Mr. Nobody')
        console.log(`
If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!`)
    } else { movieThis(movie) }
}
// ============================

// Do a Thing Function

const doThing = () => {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return err
        }
        txtArr = data.split(', ');
        newType = txtArr[0];
        newSearch = txtArr.slice(1).join(' ')
        searchSwitch(newType, newSearch);
    })
}
// =============================

// Log function
const logEntry = (term1, term2) => {
    let newEntry = `${term1}, ${term2}\n`
    fs.appendFile('log.txt', newEntry, function (err) {
        if (err) {
            throw 'Error'
        }
    })
}
searchSwitch(searchType, searchTerm)