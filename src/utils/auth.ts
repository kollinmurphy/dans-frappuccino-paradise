import { Account } from '@data/types/account';
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'fraps-api-as;jrkqoq;jfkdkfkwpqoejfkljjf';

const getCookies = (cookie: string) => {
  if (!cookie) return {};
  const pairs = cookie.split(";")
  const splitPairs = pairs.map((c) => c.split('='))
  return splitPairs.reduce((cookies, cookie) => {
    cookies[decodeURIComponent(cookie[0].trim())] = decodeURIComponent(cookie[1].trim())
    return cookies
  }, {})
};

export const authenticate = (req: Request) => {
  try {
    const token = getCookies(req.headers.get('cookie'))['token']
    if (!token) return null
    const account = jwt.verify(token, JWT_SECRET)
    return account as Omit<Account, 'password'>
  } catch (err) {
    console.error(err)
    return null
  }
}

export const createToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '1yr',
  })
}
