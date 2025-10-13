const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// router.post("/", userController.createUser);
router.get("/:email", userController.findUserByEmail);
router.put("/:id", userController.updateuser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
