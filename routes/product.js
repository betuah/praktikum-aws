const Product = require("../controllers/product");
const uploadToS3 = require("../middlewares/uploadFiles");

module.exports = (app) => {
   app.route("/").get(Product.check);

   app.route("/products").get(Product.get_all);

   app.route("/product/:id").get(Product.get_by_id);

   app.route("/product").post(uploadToS3, Product.create);

   app.route("/product/:id").delete(Product.delete);
};
