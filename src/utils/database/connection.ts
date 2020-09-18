import * as mongoose from 'mongoose'

export const mongooseConnect = async (): Promise<mongoose.Mongoose> => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'

  return mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}
