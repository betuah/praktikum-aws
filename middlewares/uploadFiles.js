const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const env = require("../env.js");

const aws_s3 = new S3Client({
   // credentials: {
   //    accessKeyId: env.aws.accessKey,
   //    secretAccessKey: env.aws.secretKey,
   //    sessionToken: env.aws.token,
   // },
   region: env.aws.region,
});

const uploadToS3 = (req, res, next) => {
   const storageS3 = multerS3({
      s3: aws_s3,
      bucket: env.aws.bucketName,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
         if (file.fieldname == "picture") {
            const s3FileName = `${Date.now().toString()}-${file.originalname}`;
            req.fileName = s3FileName;
            callback(null, `${s3FileName}`);
         } else {
            callback("ERR_FIELDNAME", null);
         }
      },
   });

   const upload = multer({
      storage: storageS3,
      fileFilter: (req, file, cb) => {
         if (
            (file.fieldname === "coverImage" && file.mimetype == "image/png") ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
         ) {
            cb(null, true);
         } else if (
            file.fieldname === "document" &&
            file.mimetype == "application/pdf"
         ) {
            cb(null, true);
         } else {
            cb(
               {
                  code: "ERR_UPLOAD_FILE_TYPE",
                  msg: "Only .png, .jpg and .jpeg format are allowed!",
               },
               null
            );
         }
      },
   }).any();

   upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD",
            message: err.msg || "Upload Error Occured.",
         });
      } else if (err) {
         console.log(new Error(err));
         return res.status(200).json({
            success: false,
            error_code: err.code || "ERR_UPLOAD_ERROR",
            message: err.msg,
         });
      } else {
         next();
      }
   });
};

module.exports = uploadToS3;
