import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import {
    encryptPass,
    createAccessToken,
    comparePass,
} from "../utils/protect-data.js";

export const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        if (!users)
            return response.status(404).json({ message: "Users not found" });
        return response.status(200).json(users);
    } catch (error) {
        return response
            .status(500)
            .json({
                message:
                    "Is not possible retrieve users. Try again and apology us about this problem",
            });
    }
};

export const register = async (request, response) => {
    const { username, email, password, roles } = request.body;
    try {
        const newUser = new User({
            username,
            email,
            password: await encryptPass(password),
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        if (!savedUser)
            return response.status(500).json({ message: "User not saved" });

        const accessToken = await createAccessToken(savedUser._id);
        response.cookie("access_token", accessToken);

        response.json({
            message: "User registered successfully",
            id: savedUser._id,
            createdAt: savedUser.createdAt,
            accessToken,
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const login = async (request, response) => {
    const { email, password } = request.body;

    console.log(email, password);

    try {
        const userExists = await User.findOne({ email }).populate("roles");

        if (!userExists) {
            return response.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePass(password, userExists.password);
        if (!isMatch)
            return response
                .status(401)
                .json({ message: "Invalid credentials" });

        const accessToken = await createAccessToken(userExists._id);
        response.cookie("access_token", accessToken);

        response.status(200).send({
            message: "User logged successfully",
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
