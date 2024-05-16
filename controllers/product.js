const uuid = require("uuid");
const env = require("../env.js");
const { ddbClient } = require("../config/database.js");
const {
   ScanCommand,
   GetItemCommand,
   PutItemCommand,
   UpdateItemCommand,
   DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const table = env.aws.dynamodbTable;

exports.check = async (req, res) => {
   res.status(200).send("Its works!");
};

exports.get_all = async (req, res) => {
   try {
      const command = new ScanCommand({
         TableName: table,
      });

      const { Count, Items } = await ddbClient.send(command);
      if (Count > 0) {
         const result = Items.map((i) => {
            return unmarshall(i);
         });
         res.status(200).json({
            code: "200",
            status: "OK",
            data: result,
         });
      } else {
         res.status(404).json({
            code: "404",
            status: "NOT_FOUND",
            error: {
               message: "Data not found!",
            },
         });
      }
   } catch (e) {
      res.status(500).json({
         code: "500",
         status: "INTERNAL_SERVER_ERROR",
         error: {
            name: e.name,
            message: e.message,
         },
      });
   }
};

exports.get_by_id = async (req, res) => {
   try {
      const productId = req.params.id;
      const command = new GetItemCommand({
         TableName: table,
         Key: {
            productId: {
               S: productId,
            },
         },
      });

      const { Item } = await ddbClient.send(command);
      if (Item != undefined) {
         const result = unmarshall(Item);
         res.status(200).json({
            code: "200",
            status: "OK",
            data: result,
         });
      } else {
         res.status(404).json({
            code: "404",
            status: "NOT_FOUND",
            error: {
               message: "Data not found!",
            },
         });
      }
   } catch (e) {
      res.status(500).json({
         code: "500",
         status: "INTERNAL_SERVER_ERROR",
         error: {
            name: e.name,
            message: e.message,
         },
      });
   }
};

exports.create = async (req, res) => {
   try {
      const { productId, name, price } = req.body;

      const picture = req.files[0].location ? req.files[0].location : null;
      const data = {
         productId,
         name,
         price,
         picture,
      };

      console.log(data);

      // console.log("asdasdasdwds", data, marshall(data));

      const command = new PutItemCommand({
         TableName: table,
         Item: marshall(data),
      });

      await ddbClient.send(command);

      res.status(200).json({
         code: "200",
         status: "OK",
         data: data,
      });
   } catch (e) {
      const errorName = e.name ? e.name : "";
      if (errorName === "TypeError") {
         res.status(500).json({
            code: "400",
            status: "BAD_REQUEST",
            error: {
               name: e.name,
               message: e.message,
            },
         });
      } else {
         res.status(500).json({
            code: "500",
            status: "INTERNAL_SERVER_ERROR",
            error: {
               name: e.name,
               message: e.message,
            },
         });
      }
   }
};

exports.delete = async (req, res) => {
   try {
      const productId = req.params.id;
      const command = new DeleteItemCommand({
         TableName: table,
         Key: {
            productId: {
               S: productId,
            },
         },
      });

      await ddbClient.send(command);
      res.status(200).json({
         code: "200",
         status: "OK",
         message: `Delete Item with id ${productId} success.`,
      });
   } catch (e) {
      res.status(500).json({
         code: "500",
         status: "INTERNAL_SERVER_ERROR",
         error: {
            name: e.name,
            message: e.message,
         },
      });
   }
};
