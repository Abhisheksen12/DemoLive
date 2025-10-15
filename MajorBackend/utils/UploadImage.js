// //step 1 cloudinary install kar lo => npm i cloudinary

// //step-2 import clodinary
// const cloudinary = require("cloudinary").v2;

// // step-3 set the cloudinary plate form
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

// async function UploadProductImage(img) {
//   try {

//     const uploadResult = await cloudinary?.uploader?.upload(img, {
//       resource_type: "auto",
//     });

//     return uploadResult;
//   } catch (error) {
//     console.log("while uploading the image in clodinary", error);
//   }
// }

// module.exports = UploadProductImage;



// utils/UploadImage.js

// Step 1️⃣: Install Cloudinary → npm install cloudinary
const cloudinary = require("cloudinary").v2;

// Step 2️⃣: Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Step 3️⃣: Upload Image Function
async function UploadProductImage(imgPath) {
  try {
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imgPath, {
      resource_type: "auto",   // Auto-detect file type (image/video/pdf)
      folder: "products",      // Optional: group uploads under a "products" folder
    });

    console.log("✅ Image uploaded successfully:", uploadResult.secure_url);
    return uploadResult;
  } catch (error) {
    console.error("❌ Error while uploading image to Cloudinary:", error.message);
    // Always return an error response instead of breaking silently
    return { success: false, message: "Image upload failed", error: error.message };
  }
}

module.exports = UploadProductImage;
