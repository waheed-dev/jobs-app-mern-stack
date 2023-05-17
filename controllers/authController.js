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
const login = async (req, res,next) => {
    try {
    const {email,password} = req.body;
        if (!email || !password) {
            throw new Error('please email and password')
        }
        const user = await User.findOne({email }).select('+password')
        if (!user) {
            throw new Error('invalid credential')
        }
        const isPasswordCorrect = await user.comparePasswords(password)
        if (!isPasswordCorrect) {
            throw new Error('invalid credential')
        }
        const token = user.createJWT()
        console.log(token)
        user.password = undefined
        res.status(StatusCodes.OK).json({user,token,location : user.location})
    } catch (e) {
        next(e)
    }
};
const updateUser = async (req, res) => {
    console.log(req.body)
    const {name,lastName,email,location} = req.body
    const user = await User.findOne({_id : req.user.userId})
    user.name = name
    user.lastName = lastName
    user.email = email
    user.location = location
    await user.save()
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user,token,location : user.location})
};

export {register, login, updateUser};
