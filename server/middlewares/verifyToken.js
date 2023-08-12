import jwt from "jsonwebtoken";

export const verifyAccessToken = async (request, response, next) => {
    const token = request.cookies.access_token;

    if (!token) {
        return response.status(401).json({ message: "Access token not found" });
    }
    try {
        const decodeUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "84600",
        }); 
        
        request.body.userCreatorId = decodeUser.id;
        next();
    } catch (error) {
        return response.status(403).json({ message: "Invalid token" });
    }
};
