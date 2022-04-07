const decodeCart = (cart) => {
  const buff = Buffer.from(cart, 'base64');
  const items = JSON.parse(buff.toString());

  return items;
};

export default decodeCart;
