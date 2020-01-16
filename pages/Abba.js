import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Abba = props => (
  <Layout>
    <h1>Artist Albums</h1>
    <h1>{props.artist.name}</h1>
    <ul>
      {props.artist.albums.map(album => (
        <li key={album.title}>
          {album.title}
        </li>
      ))}
    </ul>
    <h1>Artist Songs</h1>
    <ul>
      {props.songs.songs.map(song => (
        <li key={song.title}>
          {song.title}
        </li>
      ))}
    </ul>
  </Layout>

);

Abba.getInitialProps = async function() {
  console.log("here");
  const res = await fetch('http://localhost:4000/Abba');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  var all_songs = {};
  all_songs.songs = [];

  data.artist_json.albums.forEach(function(wow){
  	console.log("here in album");
  	wow.songs.forEach(function(song){
  		console.log(song.title);
  		all_songs.songs.push(song)
  	});
  });
  console.log(data);
  return {artist: data.artist_json,
          songs: all_songs}
};

export default Abba;