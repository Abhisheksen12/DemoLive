const Address = require("../modals/AddressModal.js");
const User = require("../modals/UserModal.js");

// ✅ Create a new address
exports.createAddress = async (req, res) => {
    try {
        const { addressType, streetAddress, city, state, pincode, country } = req.body;

        const isAddressExist = await Address.findOne();
        if (isAddressExist) {
            return res.status(400).json({
                success: false,
                message: "You hyave already created address can not create address again",
            });
        }

        // Optional: validate manually before creating
        if (!addressType || !streetAddress || !city || !state || !pincode || !country) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled",
            });
        }


        // 1st we have to create the address 
        const address = await Address.create({ addressType, streetAddress, city, state, pincode, country });

        //get the user id from the token or token ko hamne req.user ke andar set keaya hai
        const { id } = req.user;
        // 2nd we have to insert address id into User schema
        //update the category Schema
        await User.findByIdAndUpdate({ _id: id }, {
            Address: address._id
        }

        )



        return res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create address",
            error: error.message,
        });
    }
};

// ✅ Get all addresses
exports.getAddresses = async (req, res) => {
    try {
        const address = await Address.findOne();
        if (!address) {
            return res.status(200).json({
                success: false,
                message: "You didnot create the address please create",

            });
        }
        return res.status(200).json({
            success: true,
            message: "All addresses fetched successfully",
            data: address,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error fetching addresses",
            error: error.message,
        });
    }
};



// ✅ Update address by ID
exports.updateAddress = async (req, res) => {


    try {


        const { addressType, streetAddress, city, state, pincode, country } = req.body;

        const { aid } = req.params;
        if (!aid) {
            return res.status(400).json({
                success: false,
                message: "address id is invalid",
            });
        }
        // Optional: validate manually before creating
        if (!addressType || !streetAddress || !city || !state || !pincode || !country) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled",
            });
        }
        const updatedAddress = await Address.findByIdAndUpdate({ _id: aid },
            { $set: { addressType, streetAddress, city, state, pincode, country } });

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",

        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating address",
            error: error.message,
        });
    }
};

// ✅ Delete address by ID
exports.deleteAddress = async (req, res) => {
    try {
        const { aid } = req.params;
        if (!aid) {
            return res.status(400).json({
                success: false,
                message: "address id is invalid",
            });
        }


        // agar mera address id shi hai to me sabse pahle user schemha se address ki id ko hataunga than address ko delete karunga 

        const { id } = req.user;
        const isLoginUser=await User.findById(id);
        isLoginUser.Address = null;
        isLoginUser.save();
        

        // delete  kar do address ko
        await Address.findByIdAndDelete(aid);
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting address",
            error: error.message,
        });
    }
};
