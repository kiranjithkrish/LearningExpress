import express from 'express'
import route from './route.json' assert { type: 'json' }
import { handleFilterAllUsers, handleSignupUser, handleHomePageResponse, handleShowAllUsersResponse, handleLoginUser, handleDashboard, handleLogoutUser } from '../controllers/homeController.js'
import { privatepage, redirectToDashboard } from '../middlewares/privatePage.js'
const homeRouter = express.Router()

homeRouter.route(route.HOME).get(handleHomePageResponse)

homeRouter.route(route.LOGIN).get(redirectToDashboard, (req, res) => {
  res.render('logIn')
})

homeRouter.route(route.DASHBOARD).get(privatepage, handleDashboard)

homeRouter.route(route.LOGOUT).get(handleLogoutUser)

homeRouter.route(route.LOGIN).post(handleLoginUser)

homeRouter.route(route.SIGNUP).get(redirectToDashboard, (req, res) => {
  res.render('signUp')
})

homeRouter.route(route.SIGNUP).post(handleSignupUser)

homeRouter.route(route.FILTER_USERS).get(privatepage, handleFilterAllUsers)

homeRouter.route(route.USERS).get(privatepage, handleShowAllUsersResponse)

export default homeRouter
