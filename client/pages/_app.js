import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Layout from '../components/Layout';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../styles/style.scss';

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;
