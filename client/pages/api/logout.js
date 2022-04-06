import { serialize } from 'cookie';
import parseCookie from '../../lib/parseCookie';

const logoutUser = (req, res) => {
  if (req.method === 'POST') {
    const { token } = parseCookie(req);

    if (token) {
      return res
        .setHeader(
          'Set-Cookie',
          serialize('token', null, { path: '/', maxAge: -1 })
        )
        .json({ msg: 'logout success' });
    }

    return res.status(401).json({ msg: 'logout' });
  }
};

export default logoutUser;
