import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.ACCESS_TOKEN_SECRET)

export const encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const comparePass = async (password, receivedPassword) => {

    console.log({password, receivedPassword})

    return await bcrypt.compare(password, receivedPassword)
}

export const createAccessToken = async (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "84600" // 24 hours
    })
}
