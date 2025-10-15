exports.CheckAdmin = async (req, res, next) => {
    try {
                console.log("Check Admin Midd",req.user)


        // get the token

        const { role } = req.user;
        if (role === "admin") {
            next();
            return;
        }
        else {
            return res.status(500).json({
                success: false,
                message: `You are not a admin login with admin account`,
            });
        }


    }

    catch (error) {
        console.error("❌ Error in Check Admin Middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking the admin middleware.",
            error: error.message,
        });
    }
}