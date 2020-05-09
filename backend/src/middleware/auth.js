const jwt = require("jsonwebtoken");
const User = require("../models/User")


const auth = async(req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "")
    const data = jwt.verify(token, "myauthtoken007")   // myauthtoken is secret token

    try {
        const user = await User.fineone({ _id: data._id, "tokens.token": token })
        if(!user) {
            throw new Error()
        }
        res.user = user
        req.token = token
        next()
    } catch(error) {
        res.status(401).send({ error: "Not authorized to access this resource"})
    }
}
module.exports = auth