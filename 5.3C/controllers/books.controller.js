const booksService = require("../services/books.service");

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    return res.status(200).json({
      statusCode: 200,
      data: books,
      message: "Books retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error retrieving books",
    });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await booksService.getBookById(id);

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
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error retrieving book",
    });
  }
};
