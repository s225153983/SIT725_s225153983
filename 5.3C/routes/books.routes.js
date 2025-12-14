const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");

// Required routes only:
// GET /api/books -> getAllBooks
router.get("/books", Controllers.booksController.getAllBooks);

// GET /api/books/:id -> getBookById
router.get("/books/:id", Controllers.booksController.getBookById);

// GET /api/integrity-check42 -> 204 No Content
router.get("/integrity-check42", (req, res) => {
  return res.status(204).send();
});

module.exports = router;
