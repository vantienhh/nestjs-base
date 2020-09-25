import { Mongoose, connect } from 'mongoose';

export const mongooseConnect = async (): Promise<Mongoose> => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs';

  return connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};
