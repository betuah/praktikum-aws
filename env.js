require("dotenv").config();

module.exports = {
   node_env: process.env.NODE_ENV,
   port: process.env.PORT,
   aws: {
      region: process.env.AWS_BUCKET_REGION,
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY,
      token: process.env.AWS_SESSION_TOKEN,
      bucketName: process.env.AWS_BUCKET_NAME,
      dynamodbTable: process.env.AWS_TABLE,
   },
};
