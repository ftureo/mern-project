import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // this is to make sure that there is no duplicate email
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        roles: [
            {
                ref: "Role",
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
