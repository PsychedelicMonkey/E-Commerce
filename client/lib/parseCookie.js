import { parse } from 'cookie';

const parseCookie = (req) => {
  return parse(req ? req.headers.cookie || '' : document.cookie);
};

export default parseCookie;
