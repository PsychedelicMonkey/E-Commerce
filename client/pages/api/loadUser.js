import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import parseCookie from '../../lib/parseCookie';

const loadUser = async (req, res) => {
  try {
    const { token } = parseCookie(req);
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: gql`
        query {
          me {
            id
            username
          }
        }
      `,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    return res.json(data.me);
  } catch (err) {
    return res.status(401).json({ msg: 'Incorrect credentials' });
  }
};

export default loadUser;
