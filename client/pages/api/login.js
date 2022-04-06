import { serialize } from 'cookie';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.mutate({
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(input: { identifier: $email, password: $password }) {
            jwt
            user {
              id
              username
            }
          }
        }
      `,
      variables: { email, password },
    });

    return res
      .setHeader(
        'Set-Cookie',
        serialize('token', data.login.jwt, { path: '/' })
      )
      .json(data.login);
  } catch (err) {
    return res.status(401).json({ msg: 'Incorrect credentials' });
  }
};

export default login;
