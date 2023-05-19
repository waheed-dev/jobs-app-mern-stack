const testUserMiddleware = (req, res, next) => {
    if (req.user.testUser) {
        const err = new Error('Test user Read only');
        err.status = 400;
        next(err);
    }
    next()
};

export default testUserMiddleware