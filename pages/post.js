import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';

const Page = props => {
  
  return (
    <Layout>
    <h1>{props.artist.name}</h1>
    <ul>
      {props.artist.albums.map(album => (
        <li key={album.title}>
          {album.title}
        </li>
      ))}
    </ul>
    <ul>
      {props.songs.songs.map(song => (
        <li key={song.title}>
          {song.title}
        </li>
      ))}
    </ul>
  </Layout>
  );
};

Page.getInitialProps = async function(context) {
  //const router = useRouter();
  //console.log(this);
  const { url } = context.query;
  console.log("id url", url);
  var fetch_url = 'http://localhost:4000/artist?url=' + url;
  console.log("here");
  const res = await fetch(fetch_url);
  //const res = await fetch('http://localhost:4000/Abba');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  var all_songs = {};
  all_songs.songs = [];

  data.artist_json.albums.forEach(function(wow){
  	console.log("here in album");
  	wow.songs.forEach(function(song){
  		//console.log(song.title);
  		all_songs.songs.push(song)
  	});
  });
  //console.log(data);
  return {artist: data.artist_json,
          songs: all_songs}
};

export default Page;