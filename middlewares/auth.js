import jwt from "jsonwebtoken";

const authenticateUser = async (req,res,next) => {
    const authHeader= req.headers.authorization
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '64665dca00750586e15209fa'
        req.user = {userId: payload.userId,testUser}
        next()
    } catch (e) {
        next(e)
    }
}
export default authenticateUser