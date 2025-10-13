const express = require("express");
const router = express.Router();
const booklikesController = require("../controllers/booklikes");
const { authenticate } = require("../middlewares/auth");

router.post("/books/:bookId", authenticate, booklikesController.createBooklike);

module.exports = router;
