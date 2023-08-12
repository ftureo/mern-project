import fs from "fs-extra";

import {
    uploadImageToCloudinary,
    deleteImageFromCloudinary,
} from "../utils/cloudinary.js";
import Book from "../models/book.model.js";

export const getBooks = async (request, response) => {
    const books = await Book.find();

    response.send({
        message: "Books retrieved successfully",
        books,
    });
};

export const getBookById = async (request, response) => {
    const { bookId } = request.params;
    const book = await Book.findById(bookId);

    if (!book)
        return response
            .status(404)
            .send({ message: `Book with id ${bookId} not was found` });

    response.send({
        message: "Book retrieved successfully",
        book,
    });
};

export const createBook = async (request, response) => {
    const { bookName, author } = request.body;
    let image;

    try {
        if (request.files?.bookImage) {
            const { bookImage } = request.files;
            const resultUpload = await uploadImageToCloudinary(
                bookImage.tempFilePath
            );
            image = {
                urlImage: resultUpload?.secure_url,
                publicId: resultUpload?.public_id,
            };
            await fs.remove(bookImage.tempFilePath);
        }

        const newBook = new Book({
            bookName,
            author,
            image,
        });

        const newBookSaved = await newBook.save();

        response.send({
            message: "Book created successfully",
            id: newBookSaved._id,
            title: newBookSaved.bookName,
            author: newBookSaved.author,
            image: newBookSaved.image,
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

export const deleteBook = async (request, response) => {
    const { bookId } = request.params;
    try {
        const removedBook = await Book.findByIdAndDelete(bookId);
        if (!removedBook)
            return response
                .status(404)
                .send({ message: `Book with id ${bookId} not was found` });

        if (removedBook?.image?.publicId) {
            await deleteImageFromCloudinary(removedBook.image.publicId);
        }

        response.status(204).send({
            message: `Book with id ${bookId} deleted successfully`,
            removedBook,
        });
    } catch (error) {
        console.log(error);
        throw new Error(`Error deleting book with id ${bookId}`);
    }
};

export const updateBook = async (request, response) => {
    // TODO: Build this function
}