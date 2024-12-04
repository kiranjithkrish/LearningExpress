import mongoose from 'mongoose'

export const setupDataBaseConnection = () => {
  const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/?retryWrites=true&w=majority&appName=CodeLightCluster`

  const connectToDatabase = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
    }
  }

  connectToDatabase()
    .then(() => {
      console.log('Connect to Mongo DB for Kirankk105')
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error)
    })
}
