import { serialize } from 'cookie';

const addToCart = (req, res) => {
  if (req.method === 'POST') {
    const { items } = req.body;

    const buff = Buffer.from(JSON.stringify(items)).toString('base64');

    return res
      .setHeader('Set-Cookie', serialize('cart', buff, { path: '/' }))
      .json(items);
  }
};

export default addToCart;
