import fs from 'fs'
import express from 'express'
import route from './route.json' assert { type: 'json' }
import { handleUploadFile } from '../controllers/uploadFileController.js'
import { uploadStorage } from '../utils/upload.js'

const uploadRouter = express.Router()

uploadRouter.route(route.UPLOAD).post(uploadStorage.single('uploadFile'), handleUploadFile)

export default uploadRouter
