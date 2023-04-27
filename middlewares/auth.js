import jwt from "jsonwebtoken";

const authenticateUser = async (req,res,next) => {
    const authHeader= req.headers.authorization
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        console.log(req.user,)
        next()
    } catch (e) {
        next(e)
    }
}
export default authenticateUser