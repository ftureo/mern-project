import fs from "fs-extra";

import { uploadImageToCloudinary } from "../utils/cloudinary.js";

export const getBooks = (request, response) => {
    response.send("This route will show all books");
};

export const createBook = async (request, response) => {
    console.log({ body: request.body });
    console.log({ files: request.files }); // express-fileupload

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
        await fs.remove(bookImage.tempFilePath)
        console.log({ resultUpload });
    }

    response.send({
        message: "Book created successfully",
        newBook: {
            title: bookName,
            author,
            image,
        },
    });
};

export const deleteBook = (request, response) => {
    console.log({ params: request.params });

    const { bookId } = request.params;

    response.send({
        message: `Book with id ${bookId} deleted successfully`,
    });
};
