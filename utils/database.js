import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  console.log('connecting to DB')

  if (isConnected) {
    console.log('MongoDB is connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'aitj_database',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('MongoDB is connected')
  } catch (error) {
    console.error(error)
  }
}
