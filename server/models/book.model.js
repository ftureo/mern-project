import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        urlImage: {
            type: String,
            required: true
        }, 
        publicId: {
            type: String,
            required: true
        }
    }
})

export default mongoose.model("Book", bookSchema)