import 'dotenv/config.js'
import app from './src/app.js'
import { setupDataBaseConnection } from './src/db/index.js'

setupDataBaseConnection()

app.listen(process.env.PORT, () => {
  console.log(`server started successfully at http://${process.env.HOSTNAME}:${process.env.PORT}`)
})
//Index file should do only these three things
