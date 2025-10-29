import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({ success: false, message: "No authentication token, access denied" });
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecode.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token, access denied" });
    }


}


export default authMiddleware;
