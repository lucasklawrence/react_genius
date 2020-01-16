import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.artist.name}</h1>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { url } = context.query;
  console.log("id url", url);
  const res = await fetch("http://localhost:4000/api/${url]");
  const artist = await res.json();

  console.log(`Fetched artist: ${artist.name}`);

  return { artist };
};

export default Post;