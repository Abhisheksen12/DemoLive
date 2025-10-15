const jwt = require("jsonwebtoken");
exports.CheckLogin = async (req, res, next) => {
    try {

        // get the token

        const { token } = req.cookies || req.body;

        //check token is null or not 
        if (token === null || token === "" || token === undefined) {
            res.status(400).json({
                success: false,
                message: `Token value is geting ${token}.`,
                error: "Please Login !!!!"
            });
        }




        // agar shi token hai to aap token ko verify karo

        const payload = jwt.verify(token, process.env.JWT_SECRET);



        // if token verify so set our payload in request object
        req.user = payload;
        // console.log("Check lOgin Midd",req.user)

        next();

    }

    catch (error) {
        console.error("❌ Error in Check Login Middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking the check login middleware.",
            error: error.message,
        });
    }
}