const songTitle = document.querySelector('.songTitle'); // setting a const variable for the search class in our html
const artistName = document.querySelector('.artistName');
const searchForm = document.querySelector('form'); // setting a const variable for the form tag in our html
const section = document.querySelector('section');

const patternBaseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern='
const artistBaseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=';

let url;


// const Http = new XMLHttpRequest();
// const url = 'https://jsonplaceholder.typicode.com/posts';
// Http.open("GET", url);
// Http.send();

// Http.onreadystatechange=(e)=>{
//     console.log(Http.responseText)
// }


searchForm.addEventListener('submit', getRequest); // searchForm is the entire form (per html) (not a button). When submit button submits the form, fire off function fetchResults. This contains a function reference to fetchResults, not invocation.

function getRequest(e) { // fetchResults is called from the searchForm - fetchResults is an event handling function. Event handling functions receive an event object. Name the object "e" so we can process it.
    e.preventDefault();  // prevents the page from being refreshed; by default, any form submission will automatically refresh the page
    let songTitleEntered = e.target.elements[0].value;
    let artistNameEntered = e.target.elements[1].value;
    // console.log(songTitleEntered);
    // console.log(artistNameEntered);
    // if (songTitleEntered) {
    //     console.log("song title entered")
    // } else {
    //     console.log("no song title")
    // };
    // if (artistNameEntered) {
    //     console.log("artist name entered")
    // } else {
    //     console.log("no artist name")
    // };

    if (songTitleEntered) {
        if (artistNameEntered) {
            // both the song title and the artist name were provided. send this to html for execution
            let songArtistURL = "http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songTitleEntered + "&a=" + artistNameEntered;
            console.log("both  song", songTitleEntered, "artist", artistNameEntered);
            console.log(songArtistURL);
            window.open(songArtistURL);
        } else {   // only the song title / search pattern
            url = patternBaseURL+songTitleEntered;
            fetchTabs(url);
            console.log("only song title provided   song: ", songTitleEntered, "artist: ", artistNameEntered);
        }
    } else if (artistNameEntered) {   // only artist
        console.log("only artist provided   song: ", songTitleEntered, "artist: ", artistNameEntered);
        url = artistBaseURL+artistNameEntered;
        fetchTabs(url);
        // const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica,"Led%20Zeppelin"';

    }

}

function fetchTabs(fetchURL) {

    fetch(fetchURL).then(function (response) {
        let json = response.json()
        return json
    }).then(function(returned) {
        console.log(returned);
        console.log("length of list: ", returned.length)
        console.log(returned[0]);
        console.log("Song ID: ",returned[0].id)
        console.log("Artist ID: ", returned[0].artist.id)
        console.log(returned[0].title)
        console.log(returned[0].artist.nameWithoutThePrefix)
    
    })
    // }).then(json => console.log(json))
    
    // let songList = json
    // console.log(json.0.title)
    // console.log(json.0.artist.nameWithoutThePrefix)

}   





// function displaySongArtistCall(song, artist) {

//     while (section.firstChild) {  // clear out the <section> area by looping through until there are no more first records
//         section.removeChild(section.firstChild);  // while we are in the section and there is a child, remove the first one

    
//     }
// }



/*
Pull input from input fields:  song title  &  artist name

*** get the input, search for all matching songs, get the id's for the songs
*** create a list of all the songs via <p><a></a></p>. 
*** If we have a Youtube video for that song, put a button next to the name.
*** When a user clicks on the Youtube button, run the youtube video for the corresponding song
*** When user clicks on a song name, we go to that tab. in another window

IF song title and artist name have been entered, 
THEN
    If artist name field contains a comma, <<<<<<<<<<<<******************
    THEN
        ERROR - "Specify only 1 artist"
    ELSE 
        Create HTML to search for song & artist 
            ("http://www.songsterr.com/a/wa/bestMatchForQueryString?s=one&a=metallica")
    DONE
ELSE IF song title was entered
    THEN
        Search for the pattern in javascript
            (const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=YYZ')
            iterate song by song, send html to create rows of songs that match
    ELSE (only artists entered)
        parse the data entered in the artists field - at each comma
        IF there are more than 1 substring (if there are any commas), 
        THEN
            for each artist, replace any blank spaces with "%20"
            concatenate the new string to the assignment of baseURL to do the javascript search by artists
                (const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica,"Led%20Zeppelin"';)
        ELSE
            do the artists search for the 1 artist
                (const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica';)
)

do the search by artist name

*/

const searchTerm = document.querySelector('.search');


/*
API Endpoint  http://www.songsterr.com/a/rest/
API Portal / Home Page  http://www.songsterr.com/a/wa/api
Primary Category  Music
SSL Support No
Version status  Recommended (active, supported)
Terms Of Service URL  http://www.songsterr.com/a/wa/terms
Is the API Design/Description Non-Proprietary ? No
Scope Single purpose API
Device Specific No
Docs Home Page URL  http://www.songsterr.com/a/wa/api
Architectural Style REST
Supported Request Formats URI Query String/CRUD
Supported Response Formats  XML
Is This an Unofficial API?  No
Is This a Hypermedia API? No
Restricted Access ( Requires Provider Approval )  No
*/

/*
http://www.songsterr.com/a/rest/
Offers  Instrument (guitar, bass, drums) / Type (all, player, text) / Lyrics (all, with lyrics) / Vocals (all, with vocals)
Beginner level,  Instrument: drums, Type: all,  Sort by: popularity,  Lyrics: All,  Vocals: All
https://www.songsterr.com/a/wa/all?r=inst&lyrics=any&tuning=any&inst=drum&diff=Beginner&sort=p&vocals=any

Beginner level,  Instrument: guitar, Type: all,  Sort by: popularity,  Lyrics: All,  Vocals: All
https://www.songsterr.com/a/wa/all?r=inst&lyrics=any&tuning=any&diff=Beginner&inst=gtr&sort=p&vocals=any

Beginner level,  Instrument: guitar, Type: all,  Sort by: popularity,  Lyrics: All,  Vocals: All
https://www.songsterr.com/a/wa/all?r=inst&lyrics=any&tuning=any&diff=Beginner&inst=bass&sort=p&vocals=any
*/

/*
There are 3 versions 
 - Player version - the player will run through the tab and play associated audio
 - Text version - text version of the tab
 - Chords version - shows the lyrics with associated chords

*/

/*
Searches that work; they return objects
*/
// const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica,"Led%20Zeppelin"';
// const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica';
// const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=Marley'
// const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=one%20two'
// const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=eagles'
// const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=YYZ'

/*
Searches that don't work here. They return html. The URLs can be entered on the Chrome command line and produce the tab. So I could send these over to my html to display a tab.
*/
// song id 89235 = Swan Song by Led Zeppelin
// 'http://www.songsterr.com/a/wa/song?id=89235';
// song id 289 = AC/DC Highway to Hell
// 'http://www.songsterr.com/a/wa/song?id=289';
// "http://www.songsterr.com/a/wa/bestMatchForQueryString?s=one&a=metallica"
/*
You can construct URLs to a song or artist page once you know its id as returned by API calls above.

URL take the following format:

http://www.songsterr.com/a/wa/song?id={id}
http://www.songsterr.com/a/wa/artist?id={id}
*/

// const baseURL = 'http://www.songsterr.com/a/wa.json';
// const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json;
// const baseURL = 'http://www.songsterr.com/a/ra/songs/';
// const baseURL = 'http://www.songsterr.com/a/ra/songs/';
// const baseURL = 'http://www.songsterr.com/a/ra/';
// const baseURL = 'http://www.songsterr.com/a/rest/';


// fetch(baseURL).then(function (response) {
//     let json = response.json()
//     return json
// }).then(json => console.log(json))



/*
const baseURL = 'http://www.songsterr.com/a/ra/songs.json?pattern=Marley'

26:
id: 69222
type: "Song"
title: "Stir It Up"
artist:
id: 58
type: "Artist"
nameWithoutThePrefix: "Bob Marley"
useThePrefix: false
name: "Bob Marley"
__proto__: Object
chordsPresent: true
tabTypes: Array(4)
0: "PLAYER"
1: "TEXT_GUITAR_TAB"
2: "CHORDS"
3: "TEXT_BASS_TAB"
length: 4
__proto__: Array(0)
__proto__: Objec
*/

/*
const baseURL = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=Metallica,"Led%20Zeppelin"';

104:
id: 89235
type: "Song"
title: "Swan Song"
artist:
id: 25
type: "Artist"
nameWithoutThePrefix: "Led Zeppelin"
useThePrefix: false
name: "Led Zeppelin"
__proto__: Object
chordsPresent: false
tabTypes: Array(2)
0: "PLAYER"
1: "TEXT_GUITAR_TAB"
length: 2
__proto__: Array(0)
__proto__: Object
*/