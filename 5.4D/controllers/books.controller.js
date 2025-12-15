const booksService = require("../services/books.service");

const ALLOWED_FIELDS_CREATE = ["id", "title", "author", "year", "genre", "summary", "price"];
const ALLOWED_FIELDS_UPDATE = ["title", "author", "year", "genre", "summary", "price"]; // id immutable

function pick(obj, allowed) {
  const out = {};
  for (const k of allowed) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
  }
  return out;
}

function findExtraFields(obj, allowed) {
  const allowedSet = new Set(allowed);
  return Object.keys(obj || {}).filter((k) => !allowedSet.has(k));
}

function mongooseValidationToMessage(err) {
  // Flatten per-field validation messages
  const msgs = Object.values(err.errors || {}).map((e) => e.message);
  return msgs.length ? msgs.join("; ") : "Validation failed";
}

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    return res.status(200).json({
      statusCode: 200,
      data: books,
      message: "Books retrieved successfully",
      developedBy: "s225153983", // <- put your student id here
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, data: null, message: "Server error" });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ statusCode: 404, data: null, message: "Book not found" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: book,
      message: "Book retrieved successfully",
      developedBy: "s225153983",
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, data: null, message: "Server error" });
  }
};

// POST /api/books (create)
exports.createBook = async (req, res) => {
  try {
    // Reject extra fields
    const extra = findExtraFields(req.body, ALLOWED_FIELDS_CREATE);
    if (extra.length) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: `Unexpected fields: ${extra.join(", ")}`,
      });
    }

    const payload = pick(req.body, ALLOWED_FIELDS_CREATE);
    const created = await booksService.createBook(payload);

    return res.status(201).json({
      statusCode: 201,
      data: created,
      message: "Book created",
      developedBy: "s225153983",
    });
  } catch (err) {
    // Duplicate key => 409
    if (err && err.code === 11000) {
      return res.status(409).json({
        statusCode: 409,
        data: null,
        message: "Duplicate id (primary key) already exists",
      });
    }

    // Validation => 400
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: mongooseValidationToMessage(err),
      });
    }

    return res.status(500).json({ statusCode: 500, data: null, message: "Server error" });
  }
};

// PUT /api/books/:id (update)
exports.updateBook = async (req, res) => {
  try {
    // Reject any attempt to change id
    if (Object.prototype.hasOwnProperty.call(req.body || {}, "id")) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: "id is immutable and cannot be updated",
      });
    }

    // Reject extra fields
    const extra = findExtraFields(req.body, ALLOWED_FIELDS_UPDATE);
    if (extra.length) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: `Unexpected fields: ${extra.join(", ")}`,
      });
    }

    const payload = pick(req.body, ALLOWED_FIELDS_UPDATE);

    const updated = await booksService.updateBookById(req.params.id, payload);

    if (!updated) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: updated,
      message: "Book updated",
      developedBy: "s225153983",
    });
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: mongooseValidationToMessage(err),
      });
    }

    return res.status(500).json({ statusCode: 500, data: null, message: "Server error" });
  }
};
