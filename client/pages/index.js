import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import api from '../lib/apolloClient';
import { gql } from '@apollo/client';

const Home = ({ products }) => {
  return (
    <div className={styles.container}>
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
          </div>
        ))}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data } = await api.query({
    query: gql`
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
    `,
  });

  return {
    props: { products: data.products },
  };
};

export default Home;
