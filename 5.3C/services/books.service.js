const Book = require("../models/book.model");

// data access only
const getAllBooks = async () => {
  return Book.find({}).lean({ getters: true });
};

const getBookById = async (id) => {
  return Book.findOne({ id }).lean({ getters: true });
};

module.exports = {
  getAllBooks,
  getBookById,
};
