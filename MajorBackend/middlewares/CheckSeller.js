exports.CheckSeller = async (req, res, next) => {
    try {

        // get the token
        console.log("Check Seller Midd", req.user)

        const { role } = req.user;
        if (role === "seller") {
            next();
            return;
        }
        else {
            return res.status(500).json({
                success: false,
                message: `You are not a seller login with seller account`,
            });
        }


    }

    catch (error) {
        console.error("❌ Error in Check Admin Middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking the seller middleware.",
            error: error.message,
        });
    }
}