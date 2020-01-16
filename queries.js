const 
	Pool = require('pg').Pool
 	//bcrypt = require('bcrypt');

const DATABASE_URL = "postgres://ebtzwwiuflwbfx:1b59b8c5cb23dbfd0fd03c826fcf99eb75cc3c9f8a786051cd8479ec8f3c26f4@ec2-107-22-211-248.compute-1.amazonaws.com:5432/d5pr45m9vbispq";
const pool = new Pool({
	// user : 'me',
	// host: 'localhost',
	// database: 'user',
	// password: '',
	// port: 5432
	//connectionString: process.env.DATABASE_URL,
	connectionString: DATABASE_URL,
  	ssl: true
});

const getArtistUrls = (cbfunc) => {
	query = "SELECT artist_url FROM genius_artists";
	pool.query(query, (error, results) =>{
		if(results != null){
			cbfunc(results.rows)
		}
	});
}

const getArtistByUrl = (artist_genius_url, cbfunc) => {
	query = "SELECT artist_json FROM genius_artists where artist_url=$1";
	pool.query(query, [artist_genius_url], (error, results)=>{
		cbfunc(results.rows[0])
	});
}

const getArtists = (cbfunc) => {
	query = "SELECT * FROM genius_artists";
	pool.query(query, (error, results) =>{
		if(results != null){
			cbfunc(results.rows)
		}
	});
}

const doesArtistExist = (artist_genius_url, cb) =>{
	query = "SELECT * FROM genius_artists where artist_url=$1";
	pool.query(query, [artist_genius_url], (error, results)=>{
		if(results != null && results.rows[0] != undefined){
			cb(true)
		}	
		else{
			cb(false)
		}
	});
}
//Add a new user to the DB
const addArtist = (artist_genius_url, artist_genius_json) =>{

	pool.query('INSERT INTO genius_artists (artist_url, artist_json) VALUES ($1, $2)', [artist_genius_url, artist_genius_json], (error, results) =>{
		if(error)
		{
			console.log("Error queries.js: Could not add a new artist to the DB");
			throw error;
		}
		console.log("added artist", artist_genius_url);
	});
}

//update artist on DB
const updateArtist = (artist_genius_url, artist_genius_json) =>{
	var query = "UPDATE genius_artists SET artist_json=$2 WHERE artist_url=$1";
	pool.query(query, [artist_genius_url, artist_genius_json], (error, results)=>{
		if(error){
			console.log("Error queries.js: Could not update an artist on DB")
			throw error;
		}
	});
}

module.exports = {
	addArtist,
	getArtistUrls,
	updateArtist,
	doesArtistExist,
	getArtists,
	getArtistByUrl
}