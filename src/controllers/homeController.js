import usersData from '../../data/users.json' assert { type: 'json' }
import { JWT_TOKEN, LOCAL_PATH } from '../constants/index.js'
import User from '../models/Users.js'
import { getFilterUserObj } from '../utils/userFilters.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const handleHomePageResponse = (req, res) => {
  if (req.user) {
    console.log('User session found', req.user)
    res.render('dashboard', { user: req.user })
  } else {
    console.log('User session nil')
    res.redirect('/login')
  }
}

export const handleLogoutUser = (req, res) => {
  // req.session.destroy(err => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   res.clearCookie('conenct.sid').status(302).redirect('/login')
  // })
  res.clearCookie(JWT_TOKEN).status(302).redirect('/login')
}

export const handleShowAllUsersResponse = (req, res) => {
  const userList = `<ul>${usersData.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}</ul>`

  res.send(`
    <h1 style="text-align:center">User List </h1>
    <div>
        ${userList}
    </div>
    `)
}
const isEmptyObject = obj => {
  return Object.keys(obj).length === 0
}

export const handleSignupUser = async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT)
    const user = new User({
      first_name,
      last_name,
      age,
      email,
      password: hashedPassword,
    })
    await user.save()
    res.redirect('/login')
    //TODO : Show success message
  } catch (err) {
    console.log(err)
    res.status(500).send('Error creating user')
  }
}

export const handleDashboard = (req, res) => {
  console.log('handle dashboard called')
  if (req.user) {
    console.log('User session found', req.user)
    res.render('dashboard', { user: req.user })
  } else {
    console.log('User session nil')
    res.redirect('/login')
  }
}

export const handleLoginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).render('login', { error: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).render('login', { error: 'Incorrect Password' })
    }

    const userData = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }

    jwt.sign(userData, process.env.JWT_SECRET, { algorithm: 'HS256' }, (err, token) => {
      if (err) {
        console.log('Token generation error', err)
        return res.status(500).render('login', { error: 'Something went wrong, please try again later' })
      }
      console.log('Token is', token)
      res.cookie(JWT_TOKEN, token, { httpOnly: true })
      res.redirect('/dashboard')
    })
  } catch (err) {
    console.log('error in handle login user', err)
    res.status(500).render('login', { error: 'Something went wrong, please try again later' })
  }
}

export const handleFilterAllUsers = async (req, res) => {
  const { query: qs } = req
  console.log(qs)
  const dataModel = {}
  dataModel.qs = qs

  try {
    if (isEmptyObject(qs)) {
      // only show search filters
      dataModel.isSearchResult = false
      dataModel.isError = false
      console.log('Only show search filters')
    } else {
      const filters = getFilterUserObj(qs)
      console.log('Searching now')
      const users = await User.find(filters)
      if (users.length === 0) {
        throw new Error('No users found')
      }
      dataModel.isSearchResult = true
      dataModel.isError = false
      dataModel.users = users
    }
  } catch (error) {
    dataModel.isSearchResult = false
    dataModel.isError = true
    console.log('Filter failed', error)
  }
  console.log('rendering')
  res.render('userFilters', dataModel)
}
