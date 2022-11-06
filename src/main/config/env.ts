export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://root:docker@mongo-container/clean-node-api?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '1$f56svfh&'
}
