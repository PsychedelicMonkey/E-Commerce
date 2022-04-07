import decodeCart from '../../../lib/decodeCart';
import parseCookie from '../../../lib/parseCookie';

const loadCart = (req, res) => {
  if (req.method === 'POST') {
    const { cart } = parseCookie(req);
    if (cart) {
      const items = decodeCart(cart);

      return res.json(items);
    }

    return res.json([]);
  }
};

export default loadCart;
