const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const env = require("./env");

const app = express();
const port = env.port || 3000;

app.use(helmet());
app.use(compression());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw()); // Public directory

/* Dynamic CORS */
app.use(
   cors({
      origin: "*",
   })
);
/* End Dynamic CORS */

/* Start Cookie Settings */
app.use(cookieParser());
/* End Cookie Settings */

/* Start of Routing Modules */
const productRoute = require("./routes/product");

productRoute(app);
/* End of Routing Modules */

/* Check database connection */

app.listen(port, "0.0.0.0", () => {
   console.log(`Server API listen on port ${port}`);
});

module.exports = app;
