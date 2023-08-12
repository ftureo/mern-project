import { Router } from 'express';

import {
    getBooks,
    createBook,
    deleteBook,
    getBookById,
    updateBook,
} from "../controllers/booksController.js";
import { verifyAccessToken } from '../middlewares/verifyToken.js';

const router = Router();

router.get("/books", getBooks)
router.get("/get-book/:bookId", getBookById)
router.post("/create-book", verifyAccessToken, createBook)
router.put("/update-book/:bookId", verifyAccessToken, updateBook)
router.delete("/delete-book/:bookId", verifyAccessToken, deleteBook)

export default router;