import { gql } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import decodeCart from '../../lib/decodeCart';
import parseCookie from '../../lib/parseCookie';

const checkout = async (req, res) => {
  if (req.method === 'POST') {
    const { cart, token } = parseCookie(req);
    const items = decodeCart(cart);
    const apolloClient = initializeApollo();

    const itemArr = items.map((i) => {
      return i.id;
    });

    const { data } = await apolloClient.mutate({
      mutation: gql`
        mutation {
          createOrder(input: {
            data: {
              products: ${itemArr}
            }
          }) {
            order {
              id
            }
          }
        }
      `,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    return res.json({ id: data.createOrder.order.id });
  }
};

export default checkout;
