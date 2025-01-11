import jwt from "jsonwebtoken"

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
       
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode.email!== process.env.ADMIN_EMAIL) {
            console.log('atoken',token_decode)
             console.log(process.env.ADMIN_EMAIL ,process.env.ADMIN_PASSWORD,process.env.JWT_SECRET,atoken)
            return res.status(404).json({ success: false, message: 'Not Authorized Login Againnn' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin;