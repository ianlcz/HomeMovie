const mongoose = require("mongoose");
const logging = require("py-logging");
require("dotenv").config({ path: "../.env" });

logging.basicConfig({
  level: "DEBUG",
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  logging.log("connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  logging.error(err.message);
});
