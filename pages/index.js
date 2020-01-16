import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Rap Genius Popular Artists</h1>
    <ul>
      {props.artists.map(artist => (
        <li key={artist.artist_url}>
          <Link href={`/post?url=${artist.artist_url}`}>
            <a>{artist.artist_url}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:4000/api');
  const data = await res.json();

  // <Link href="/p/[id]" as={`/api/${artist.artist_url}`}>


  console.log(`Show data fetched. Count: ${data.length}`);
  console.log(data);
  return {artists: data}
};

export default Index;