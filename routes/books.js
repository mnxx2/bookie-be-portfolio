const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");

router.get("/", bookController.searchBooks);
router.post("/:isbn", bookController.addBook);
router.get("/detail", bookController.getBook);

module.exports = router;
