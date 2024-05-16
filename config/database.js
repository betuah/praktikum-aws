const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const config = {
   // credentials: {
   //    accessKeyId: process.env.AWS_ACCESS_KEY,
   //    secretAccessKey: process.env.AWS_SECRET_KEY,
   //    sessionToken: process.env.AWS_SESSION_TOKEN,
   // },
   region: process.env.AWS_REGION,
};

const client = new DynamoDBClient(config.credentials);
const ddbClient = DynamoDBDocumentClient.from(client);

module.exports = { ddbClient };
