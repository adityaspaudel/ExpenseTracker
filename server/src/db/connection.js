const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    if (!isConnected) throw new Error("mongodb error");
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};

module.exports=dbConnect
