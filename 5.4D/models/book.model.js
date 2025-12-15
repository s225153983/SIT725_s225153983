const mongoose = require("mongoose");

const GENRES = [
  "Science Fiction",
  "Classic",
  "Historical Fiction",
  "Fantasy",
  "Other",
];

const BookSchema = new mongoose.Schema(
  {
    // Primary key – immutable in updates (enforced in controller/service)
    id: {
      type: String,
      required: [true, "id is required"],
      unique: true,
      index: true,
      trim: true,
      match: [/^b[0-9A-Za-z]+$/, "id must look like b1, b2, bX etc."],
      minlength: [2, "id must be at least 2 characters"],
      maxlength: [20, "id must be at most 20 characters"],
    },

    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [1, "title cannot be empty"],
      maxlength: [120, "title must be at most 120 characters"],
    },

    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      minlength: [2, "author must be at least 2 characters"],
      maxlength: [80, "author must be at most 80 characters"],
    },

    year: {
      type: Number,
      required: [true, "year is required"],
      min: [1450, "year must be >= 1450"],
      max: [new Date().getFullYear(), "year cannot be in the future"],
      validate: {
        validator: Number.isInteger,
        message: "year must be an integer",
      },
    },

    genre: {
      type: String,
      required: [true, "genre is required"],
      trim: true,
      enum: {
        values: GENRES,
        message: `genre must be one of: ${GENRES.join(", ")}`,
      },
    },

    summary: {
      type: String,
      required: [true, "summary is required"],
      trim: true,
      minlength: [10, "summary must be at least 10 characters"],
      maxlength: [800, "summary must be at most 800 characters"],
    },

    // Stored as Decimal128; validated > 0 and formatted as string in JSON.
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "price is required"],
      get: (v) => (v ? v.toString() : v),
      validate: {
        validator: (v) => {
          if (v == null) return false;
          const n = parseFloat(v.toString());
          return Number.isFinite(n) && n > 0 && n < 10000;
        },
        message: "price must be a number > 0 and < 10000",
      },
    },

    currency: {
      type: String,
      required: true,
      default: "AUD",
      enum: { values: ["AUD"], message: "currency must be AUD" },
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: false,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { getters: true, virtuals: false },
  }
);

module.exports = mongoose.model("Book", BookSchema);
