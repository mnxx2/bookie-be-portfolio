const express = require("express");
const router = express.Router();
const shelvesController = require("../controllers/bookshelves");
const { authenticate } = require("../middlewares/auth");

// 책장에 추가 : 로그인이 있어야 가능
router.post("/:bookId", authenticate, shelvesController.addBookToBookShelves);
router.get("/", authenticate, shelvesController.getShelvesAll);
router.put("/:id", authenticate, shelvesController.updateBookReport);
router.get("/books/:id", authenticate, shelvesController.getBookOne);
router.delete("/books/:id", authenticate, shelvesController.deleteBookshelf);

module.exports = router;
