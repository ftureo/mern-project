import { Router } from 'express';

import { getBooks, createBook, deleteBook, getBookById } from '../controllers/booksController.js';

const router = Router();

router.get("/books", getBooks)
router.post("/create-book", createBook)
router.get("/get-book/:bookId", getBookById)
router.put("/update-book/:id")
router.delete("/delete-book/:bookId", deleteBook)

export default router;