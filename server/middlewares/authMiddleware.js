import JWT from "jsonwebtoken"

export const userAuth = (res,req,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        next('Auth Failed')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = {userId : payload.userId}
    } catch (error) {
        next('Auth Failed')
    }
}

export default userAuth;