const express = require("express");
const app = express();
const cors = require("cors");
const logging = require("py-logging");
const api = require("./routes/index");
const account = require("./routes/account");
const collection = require("./routes/collection");
const PORT = process.env.PORT || 8080;
require("./dbConnect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);
app.use("/api/account", account);
app.use("/api/collection", collection);

app.listen(PORT, (err) => {
  if (err) throw err;
  logging.info(`listenning on http://localhost:${PORT}`);
});
