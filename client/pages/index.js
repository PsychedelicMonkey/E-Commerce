import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      slug
      name
      images {
        formats
      }
    }
  }
`;

const Home = () => {
  const { data } = useQuery(GET_PRODUCTS);
  const products = data ? data.products : null;

  return (
    <div className="container">
      <Head>
        <title>ECommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {products.map((prod) => (
          <div key={prod.id}>
            <Image
              src={`http://localhost:1337${prod.images[0].formats.medium.url}`}
              width={prod.images[0].formats.medium.width}
              height={prod.images[0].formats.medium.height}
            />
            <h3>{prod.name}</h3>

            <Link href={`/products/${prod.slug}`}>View</Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCTS,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
