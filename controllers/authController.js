import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";

const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name
            }, token, location: user.location
        });
    } catch (e) {
        next(e);
    }
};
const login = async (req, res) => {
    res.send("login");
};
const updateUser = async (req, res) => {
    res.send("updateUser");
};

export {register, login, updateUser};
