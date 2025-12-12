const booksService = require("../services/books.service");

// GET /api/books
exports.getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();

  res.status(200).json({
    statusCode: 200,
    data: books,
    message: "Books retrieved successfully",
  });
};

// GET /api/books/:id
exports.getBookById = (req, res) => {
  const { id } = req.params;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({
      statusCode: 404,
      data: null,
      message: `Book not found for id: ${id}`,
    });
  }

  return res.status(200).json({
    statusCode: 200,
    data: book,
    message: "Book retrieved successfully",
  });
};
