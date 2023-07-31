import { Router } from 'express';

import { getBooks, createBook, deleteBook } from '../controllers/booksController.js';

const router = Router();

router.get("/books", getBooks)
router.post("/create-book", createBook)
router.put("/update-book/:id")
router.delete("/delete-book/:bookId", deleteBook)

export default router;