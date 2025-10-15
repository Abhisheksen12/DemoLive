const express = require("express")
const router = express.Router();
const { createAddress, getAddresses,
    updateAddress, deleteAddress } = require("../controllers/Address.js");
const { CheckLogin } = require("../middlewares/CheckLogin");



router.post("/create-address/", CheckLogin, createAddress);
router.get("/getAddress",CheckLogin, getAddresses);
router.put("/update-address/:aid",CheckLogin, updateAddress);
router.delete("/delete-address/:aid",CheckLogin, deleteAddress);

module.exports = router;
