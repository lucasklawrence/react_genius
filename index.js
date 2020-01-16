const express = require('express');
const cors = require('cors');
const request = require('request')
var db = require('./queries.js');
const app = express();

var server_artists = {};
app.use(cors())
app.set('view engine', 'html');

app.get("/", (req, res) => {
    console.log("IN MAIN PAGE");
    res.render('index');
});
app.get("/api", (req, res) => {
	console.log("in api call")
	db.getArtistUrls(function(artists){
		//res.render(artists);
		//console.log(artists)
		final_url=""
		artists.forEach(function(artist){
			//console.log("artist url", artist.artist_url);
			final_url = final_url + artist.artist_url + "\n";
		});	
		res.send(JSON.stringify(artists));
		//var list = document.createElement('ul');
		//artists.forEach(function(artist){
		//	var item = document.createElement('li');
		//	item.appendChild(document.createTextNode(artist.artist_url));
		//	list.appendChild(item);
		//	});
		//res.render(list);
		//res.render("WOW");
	});
});

app.get("/p/:url", function (req, res, next) {
	var url = req.params.url;
	console.log("in api call 2");
	db.getArtistByUrl(url, function(Artist){
		res.send(JSON.stringify(artists));
	});
});

app.get("/artist", (req, res) => {
	console.log("in artist");
	//console.log("res", res)
	var url = req.query.url;
	///console.log("in api call 2");
	db.getArtistByUrl(url, function(Artist){
		//console.log(Artist)
		res.send(JSON.stringify(Artist));
	});
})

app.get("/api/:url", function (req, res, next) {
	console.log("in api call 2");
	var url = req.params.url;
	console.log("in api call 2");
	db.getArtistByUrl(url, function(Artist){
		res.send(JSON.stringify(artists));
	});
});

app.get("/Abba", (req, res) => {
	//console.log("req is", req);
	var url = "https://genius.com/artists/Abba";
	///console.log("in api call 2");
	db.getArtistByUrl(url, function(Artist){
		//console.log(Artist)
		res.send(JSON.stringify(Artist));
	});
})
const PORT = 4000;
app.listen(PORT, () => console.log("listening on port", PORT))