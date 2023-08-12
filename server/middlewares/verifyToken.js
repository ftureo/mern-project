import jwt from "jsonwebtoken";

export const verifyAccessToken = async (request, response, next) => {
    console.log("Viendo las cookies", request.cookies);
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({ message: "Access token not found" });
    }

    console.log("token", token)

    try {
        const decodeUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "84600",
        });

        console.log("decodeUser", decodeUser);

        request.userId = decodeUser.id;
        next();
    } catch (error) {
        return response.status(403).json({ message: "Invalid token" });
    }
};
