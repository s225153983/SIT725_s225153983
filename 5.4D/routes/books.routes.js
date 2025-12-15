const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Existing routes (keep)
router.get("/books", Controllers.booksController.getAllBooks);
router.get("/books/:id", Controllers.booksController.getBookById);

// Integrity check (keep)
router.get("/integrity-check42", (req, res) => res.status(204).send());

// Safe write routes (add)
router.post("/books", Controllers.booksController.createBook);
router.put("/books/:id", Controllers.booksController.updateBook);

module.exports = router;
