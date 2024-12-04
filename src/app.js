import express, { json } from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import homeRouter from './routes/homeRoute.js'
import route from './routes/route.json' assert { type: 'json' }
import { handleLogging } from './middlewares/log.js'
import uploadRouter from './routes/fileUploadRoute.js'
import statusMonitor from 'express-status-monitor'
//import session from 'express-session'
import cookieParser from 'cookie-parser'
import { verifyJWT } from './middlewares/verifyJWT.js'

const app = express()

//Set ejs as the template engine
app.set('view engine', 'ejs')
//set the views directory
app.set('views', 'src/views')

//Section 2 - Attaching the middlewares

//Middleware to set the header for cors policy
app.use(
  cors({
    origin: process.env.SITE_ORIGIN,
  }),
)

/*express session middleware. 
This is for session management in express*/
//Commenting as we are going to use jwt
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     //resave: false,
//     saveUninitialized: true,
//     //cookie: { secure: true }, // Set secure to true in production for HTTPS
//   }),
// )
// Without this middleware the user data is not read from the cookie
app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(handleLogging)

app.use(verifyJWT)

app.use(express.static('public'))

app.use(statusMonitor())

//Section 3 - Attach the routes
app.use(route.HOME, homeRouter)

app.use(route.API_USER, userRouter)

app.post(route.UPLOAD, uploadRouter)

//export the app
export default app
