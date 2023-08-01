import fs from "fs-extra";

import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../utils/cloudinary.js";
import Book from "../models/book.model.js";

export const getBooks = async (request, response) => {
    const books = await Book.find()

    response.send({
        message: "Books retrieved successfully",
        books
    })
};

export const createBook = async (request, response) => {
    const { bookName, author } = request.body;
    let image;

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
        console.log({ resultUpload });
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
};

export const deleteBook = async (request, response) => {
    const { bookId } = request.params;
    console.log({ bookId });

    try {
        const removedBook = await Book.findByIdAndDelete(bookId);
        if(!removedBook) return response.status(404).send({ message: `Book with id ${bookId} not was found` });

        console.log({ removedBook });

        if(removedBook?.image?.publicId){
            await deleteImageFromCloudinary(removedBook.image.publicId);
        }

        response.status(204).send({
            message: `Book with id ${bookId} deleted successfully`,
            removedBook
        })


    } catch (error){
        console.log(error);
        throw new Error(`Error deleting book with id ${bookId}`);
    }
};
