const express = require("express");
const router = express.Router();

router.all("/", async (req, res) => {
  try {
    res.json({
      server_name: "HomeMovie API Server",
      description: "A Web Application to manage your movies collection.",
      author: {
        name: "Yann Le Coz",
        username: "ianlcz",
        github_url: "https://github.com/ianlcz",
      },
    });
  } catch (err) {
    logging.error(err.message);
  }
});
