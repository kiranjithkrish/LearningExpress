import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../constants/index.js'

export const verifyJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1] || req.cookies?.[JWT_TOKEN]
  if (!token) {
    req.user = null
    return next()
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
  } catch (err) {
    req.user = null
  }
  next()
}
