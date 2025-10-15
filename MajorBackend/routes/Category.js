
// routes/Category.js

const express = require("express");
const router = express.Router();

// ✅ Import all category controller functions
const {
   createCategory,
   getCategory,
   categoryUpdate,
   deleteCategory,
   getAllCategory
} = require("../controllers/Category.js");
const { CheckAdmin } = require("../middlewares/CheckAdmin.js");
const { CheckLogin } = require("../middlewares/CheckLogin.js");

/* ------------------------------------------------------------
   ✅ CATEGORY ROUTES (Your existing route structure preserved)
-------------------------------------------------------------*/

// 🟢 Create a new category
// POST: /api/v1/category/create-category
router.post("/create-category", CheckLogin, CheckAdmin, createCategory);

// 🔵 Get a single category by ID
// GET: /api/v1/category/get-category/:cid
router.get("/get-category/:cid", getCategory);


// 🔵 Get all category by ID
// GET: /api/v1/category/get-category/:cid
router.get("/get-categories", getAllCategory);

// 🟡 Update a category by ID
// PUT: /api/v1/category/update-category/:cid
router.put("/update-category/:cid", CheckLogin, CheckAdmin, categoryUpdate);

// 🔴 Delete a category by ID
// DELETE: /api/v1/category/delete-category/:cid
router.delete("/delete-category/:cid", CheckLogin, CheckAdmin, deleteCategory);

/* ------------------------------------------------------------
   ✅ EXPORT ROUTER
-------------------------------------------------------------*/
module.exports = router;
