const Category = require("../modals/CategoryModal.js");
const categoryImageUpload = require("../utils/UploadImage.js");

/* 
----------------------------------------------------
  ✅ CREATE CATEGORY
----------------------------------------------------
*/
exports.createCategory = async (req, res) => {
  try {
    console.log("📥 Incoming request in Category");

    const { categoryName, categoryDiscription } = req.body;

    // Step 1️⃣: Validation – required fields
    if (!categoryName || !categoryDiscription) {
      return res.status(400).json({
        success: false,
        message: "Both category name and description are required.",
      });
    }

    // Step 2️⃣: Check if file is uploaded
    if (!req.files || !req.files.categoryImage) {
      return res.status(400).json({
        success: false,
        message: "Category image is required.",
      });
    }

    // Step 3️⃣: Convert name to lowercase for consistency
    const lowerCaseCategoryName = categoryName.toLowerCase();

    // Step 4️⃣: Check if category already exists
    const isExist = await Category.findOne({ categoryName: lowerCaseCategoryName });
    if (isExist) {
      return res.status(409).json({
        success: false,
        message: "Category already exists. Please choose a different category name.",
      });
    }

    // Step 5️⃣: Upload image to Cloudinary
    const { categoryImage } = req.files;
    const imageurl = await categoryImageUpload(categoryImage.tempFilePath);

    // Step 6️⃣: Create new category
    const categoryData = await Category.create({
      categoryName: lowerCaseCategoryName,
      categoryDiscription,
      categoryImage: imageurl.secure_url,
    });

    // Step 7️⃣: Success response
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: categoryData,
    });
  } catch (err) {
    console.error("❌ Error in createCategory controller:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the category.",
      error: err.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ GET CATEGORY BY ID
----------------------------------------------------
*/
exports.getCategory = async (req, res) => {
  try {
    console.log("📥 Incoming request in  Get single Category");

    const { cid } = req.params;

    // Step 1️⃣: Validate ID
    if (!cid) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    // Step 2️⃣: Find category
    const category = await Category.findById(cid);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Step 3️⃣: Success response
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (err) {
    console.error("❌ Error in getCategory controller:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the category.",
      error: err.message,
    });
  }
};





/* 
----------------------------------------------------
  ✅ GET All CATEGORY 
----------------------------------------------------
*/
exports.getAllCategory = async (req, res) => {
  try {
    console.log("📥 Incoming request in  Get All Category");


    // Step 2️⃣: Find category
    const category = await Category.find();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "There is No Category Exist plase create the category.",
      });
    }

    // Step 3️⃣: Success response
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (err) {
    console.error("❌ Error in gell all Category controller:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the category.",
      error: err.message,
    });
  }
};



/* 
----------------------------------------------------
  ✅ UPDATE CATEGORY
----------------------------------------------------
*/
exports.categoryUpdate = async (req, res) => {
  try {
    console.log("📥 Incoming request in  Update single Category");

    const { cid } = req.params;
    const { categoryName, categoryDiscription } = req.body;

    // Step 1️⃣: Check if category exists
    const existingCategory = await Category.findById(cid);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Step 2️⃣: Handle image update (if provided)
    let categoryImagePath = existingCategory.categoryImage;
    if (req.files && req.files.categoryImage) {
      const imageurl = await categoryImageUpload(req.files.categoryImage.tempFilePath);
      categoryImagePath = imageurl.secure_url;
    }

    // Step 3️⃣: Update category
    await Category.findByIdAndUpdate(cid, {
      categoryName: categoryName?.toLowerCase() || existingCategory.categoryName,
      categoryDiscription: categoryDiscription || existingCategory.categoryDiscription,
      categoryImage: categoryImagePath,
    });

    // Step 4️⃣: Success response
    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
    });
  } catch (err) {
    console.error("❌ Error in categoryUpdate controller:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the category.",
      error: err.message,
    });
  }
};

/* 
----------------------------------------------------
  ✅ DELETE CATEGORY
----------------------------------------------------
*/
exports.deleteCategory = async (req, res) => {
  try {
    const { cid } = req.params;

    // Step 1️⃣: Validate ID
    if (!cid) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required for deletion.",
      });
    }

    // Step 2️⃣: Check if category exists
    const category = await Category.findById(cid);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Step 3️⃣: Delete category
    await Category.findByIdAndDelete(cid);

    // Step 4️⃣: Success response
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (err) {
    console.error("❌ Error in deleteCategory controller:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the category.",
      error: err.message,
    });
  }
};
