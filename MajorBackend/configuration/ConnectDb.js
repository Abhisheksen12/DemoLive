const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if connection fails
  }
}

module.exports = ConnectDb;
