import parseCookie from '../../../lib/parseCookie';

const loadCart = (req, res) => {
  if (req.method === 'POST') {
    const { cart } = parseCookie(req);
    if (cart) {
      const buff = Buffer.from(cart, 'base64');
      const items = JSON.parse(buff.toString());

      return res.json(items);
    }

    return res.json([]);
  }
};

export default loadCart;
