import { Account } from '@data/types/account';
import type { AstroCookies } from 'astro/dist/core/cookies';
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'fraps-api-as;jrkqoq;jfkdkfkwpqoejfkljjf';

export const authenticate = (cookies: AstroCookies): Omit<Account, 'password'> | null => {
  try {
    const token = cookies.get('token').value
    if (!token) return null
    const account = jwt.verify(token, JWT_SECRET)
    return account as Omit<Account, 'password'>
  } catch (err) {
    console.error(err)
    return null
  }
}

export const verifyToken = (token: string) => {
  if (!token) return null
  try {
    const account = jwt.verify(token, JWT_SECRET)
    return account as Omit<Account, 'passowrd'>
  } catch (err) {
    return null
  }
}

export const createToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '1yr',
  })
}
