const Book = require("../models/book.model");

const getAllBooks = async () => Book.find({}).lean({ getters: true });

const getBookById = async (id) =>
  Book.findOne({ id }).lean({ getters: true });

const createBook = async (payload) => {
  const created = await Book.create(payload); // triggers schema validation
  // Return clean JSON (with getters)
  return created.toObject({ getters: true });
};

const updateBookById = async (id, payload) => {
  // runValidators enforces schema rules on update
  const updated = await Book.findOneAndUpdate(
    { id },
    payload,
    { new: true, runValidators: true, context: "query" }
  ).lean({ getters: true });

  return updated; // null if not found
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
};
