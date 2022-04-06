import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

const GET_PRODUCT = gql`
  query products($slug: String!) {
    products(where: { slug: $slug }) {
      name
      price
      description
      images {
        formats
      }
    }
  }
`;

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useQuery(GET_PRODUCT, { variables: { slug } });
  const product = data ? data.products[0] : null;

  return (
    <>
      {product ? (
        <section>
          <Head>
            <title>{product.name} - E-Commerce</title>
          </Head>

          <h1>{product.name}</h1>
          <h4>${product.price}</h4>

          <Image
            src={`http://localhost:1337${product.images[0].formats.medium.url}`}
            width={product.images[0].formats.medium.width}
            height={product.images[0].formats.medium.height}
          />
        </section>
      ) : null}
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCT,
    variables: { slug },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: gql`
      query {
        products {
          slug
        }
      }
    `,
  });

  const paths = data.products.map((prod) => {
    return { params: { slug: prod.slug.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Product;
