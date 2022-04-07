import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Markdown from 'markdown-to-jsx';

import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import CartForm from '../../components/CartForm';
import ProductSwiper from '../../components/product/ProductSwiper';

const GET_PRODUCT = gql`
  query products($slug: String!) {
    products(where: { slug: $slug }) {
      id
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
        <div className="container">
          <section>
            <Head>
              <title>{product.name} - E-Commerce</title>
            </Head>

            <section className="product-head">
              <ProductSwiper images={product.images} />

              <div className="product-detail">
                <h1>{product.name}</h1>

                <Markdown
                  options={{ disableParsingRawHTML: true }}
                  className="description"
                >
                  {product.description}
                </Markdown>

                <h4>${product.price}</h4>

                <CartForm product={product} />
              </div>
            </section>
          </section>
        </div>
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
