import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apolloClient';

const Product = ({ product }) => {
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

  const { data } = await apolloClient.query({
    query: gql`
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
    `,
    variables: { slug },
  });

  return {
    props: { product: data.products[0] },
  };
};

export const getStaticPaths = async () => {
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
