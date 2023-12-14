const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

//======================= Controller ======================================================

const userControllers = require("../controllers/user.controllers.js");
const postControllers = require("../controllers/post.controllers.js");

const router = express.Router();

//============ Singnup and login =============

router.post("/Signup", userControllers.register);

router.post("/login", userControllers.login);

router.use(function (req, res, next) {
  if (!req.headers["authorization"])
    return res.status(401).json({ message: "user Unauthorized" });
  const authHeader = req.headers["authorization"];
  const secret = config.ACCESS_TOKEN_SECRET;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, secret, function (err, payload) {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return res.status(401).json({
        message: message,
      });
    }
    req.payload = payload;
    res.locals.id = payload.id;
    next();
  });
});

router.post("/addPost", postControllers.addPost);
router.get("/getPost", postControllers.getPost);
router.put("/updatePost/:id", postControllers.updatePost);
router.delete("/deletePost/:id", postControllers.deletePost);

module.exports = router;
