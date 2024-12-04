import fs from 'fs'
import express from 'express'
import usersData from '../../data/users.json' assert { type: 'json' }
import { LOCAL_PATH } from '../constants/index.js'
import { handleGetAllUsers, handleFindUser, handleSetUser, handleUpdateUser, handleDeleteUser, handleFilterUsers } from '../controllers/userController.js'
import route from './route.json' assert { type: 'json' }

const userRouter = express.Router()

userRouter.route(route.HOME).get(handleGetAllUsers).post(handleSetUser)

/*I initially put the route below route.user and it did not work because route.user was 
getting executed and handleFindUser is getting called. After moving it up the correct 
route is getting calles */
userRouter.route(route.FILTER_USERS).get(handleFilterUsers)

userRouter.route(route.USER).get(handleFindUser).delete(handleDeleteUser).put(handleUpdateUser)

export default userRouter
