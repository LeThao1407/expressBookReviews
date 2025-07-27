const express = require('express');
const router = express.Router();
const books = require('./booksdb');

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// ✅ Route: Tìm theo ISBN (phải đặt TRƯỚC /:id)
router.get('/isbn/:id', (req, res) => {
  const id = req.params.id;
  const book = books[id];

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Không tìm thấy sách với ISBN đó" });
  }
});

// GET book by ID
router.get('/:id', (req, res) => {
  const book = books[req.params.id];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// GET books by author
router.get('/author/:author', (req, res) => {
  const authorParam = decodeURIComponent(req.params.author).toLowerCase();
  const matchingBooks = {};

  for (const id in books) {
    if (books[id].author.toLowerCase() === authorParam) {
      matchingBooks[id] = books[id];
    }
  }

  if (Object.keys(matchingBooks).length > 0) {
    res.json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found for this author" });
  }
});

// GET books by title
router.get('/title/:title', (req, res) => {
  const titleParam = decodeURIComponent(req.params.title).toLowerCase();
  const matchingBooks = {};

  for (const id in books) {
    if (books[id].title.toLowerCase() === titleParam) {
      matchingBooks[id] = books[id];
    }
  }

  if (Object.keys(matchingBooks).length > 0) {
    res.json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found with this title" });
  }
});

// GET reviews of a book
router.get('/:id/review', (req, res) => {
  const id = req.params.id;
  const book = books[id];
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// POST review to a book
router.post('/:id/review', (req, res) => {
  const book = books[req.params.id];
  if (book) {
    const { username, review } = req.body;
    if (username && review) {
      book.reviews[username] = review;
      res.json({ message: "Review added successfully", book });
    } else {
      res.status(400).json({ message: "Missing username or review" });
    }
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE review
router.delete('/:bookId/review/:username', (req, res) => {
  const bookId = req.params.bookId;
  const username = req.params.username;

  const book = books[bookId];
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!book.reviews || !book.reviews[username]) {
    return res.status(404).json({ message: 'Review not found' });
  }

  delete book.reviews[username];
  res.json({ message: 'Review deleted successfully' });
});

module.exports = router;
