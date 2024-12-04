import usersData from '../../data/users.json' assert { type: 'json' }
import fs from 'fs'
import { LOCAL_PATH } from '../constants/index.js'
import { checkEmailIdFormat, checkOnlyAphabets } from '../utils/validators.js'
import User from '../models/Users.js'
import { getFilterUserObj } from '../utils/userFilters.js'
import bcrypt from 'bcryptjs'

export const handleGetAllUsers = async (req, res) => {
  // res.setHeader('X-user-name', 'Kiran')
  // res.removeHeader('X-Powered-By')
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'rejected' })
  }
}

export const handleSetUser = async (req, res) => {
  const newUser = req.body
  if (newUser.first_name && newUser.last_name && newUser.age && newUser.age >= 18 && newUser.email && newUser.password && newUser.avatar && checkEmailIdFormat(newUser.email) && checkOnlyAphabets(newUser.first_name) && checkOnlyAphabets(newUser.last_name)) {
    try {
      console.log('Loggng the user pass', newUser.password)
      const hashedPassword = await bcrypt.hash(newUser.password, +process.env.SALT)
      const userModel = new User({ ...newUser, password: hashedPassword })
      console.log('Print new userModel', userModel)
      const savedData = await (await userModel.save()).toObject()
      delete savedData.password /*Even without this line the response object
      sent did not have the password fields. Not sure how?*/
      res.status(201).json({ status: 'Success', response: savedData })
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        res.status(409).json({ message: 'Email already exists' })
      } else {
        console.error('There is an error in create', err)
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  } else {
    res.status(400).json({ status: 'Rejected' })
  }
}

const getUser = (users, userId) => users.find(user => user.id == userId)

export const handleFindUser = async (req, res) => {
  console.log('handleFindUser called')
  const { userID } = req.params
  try {
    const userFromList = await User.findById(userID)
    if (userFromList) {
      res.json(userFromList)
    } else {
      res.status(404).json({})
    }
  } catch (error) {
    res.status(500).json({ status: 'Errror', error: error, message: 'Internal server error' })
  }
}
export const handleUpdateUser = async (req, res) => {
  console.log('handleUpdateUser called')
  const { userID } = req.params
  const updatedUserData = req.body

  try {
    const userUpdated = await User.findByIdAndUpdate(userID, updatedUserData, {
      new: true,
      runValidators: true,
    })
    if (userUpdated) {
      res.json(userUpdated)
    } else {
      res.status(404).json({})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}

export const handleDeleteUser = async (req, res) => {
  console.log('handleDeleteUser called')
  const { userID } = req.params
  console.log('userId is', LOCAL_PATH)
  try {
    const userDeleted = await User.findByIdAndDelete(userID)
    if (userDeleted) {
      res.status(204).json(userDeleted)
    } else {
      res.status(404).json({})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}

export const handleFilterUsers = async (req, res) => {
  console.log('handleFilterUsers called')
  const { query: qs } = req
  const filters = getFilterUserObj(qs)
  // TO DO: Validate this query string
  try {
    const users = await User.find(filters)
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', status: 'Rejected' })
  }
}
