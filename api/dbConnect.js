const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

logging.basicConfig({
  level: "DEBUG",
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

mongoose.connection.on("connected", () => {
  logging.log("connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  logging.error(err.message);
});
