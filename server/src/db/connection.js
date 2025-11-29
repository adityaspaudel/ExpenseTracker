const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MONGODB_ATLAS_URI =
// 	"mongodb+srv://dbUser:dbUserPassword@cluster0.p9ldcdv.mongodb.net/?appName=Cluster0";

// MONGODB_LOCAL_URI = "mongodb://127.0.0.1:27017/expenseTracker";
const dbConnect = async () => {
	try {
		const isConnected = await mongoose.connect(
			process.env.MONGODB_ATLAS_URI || process.env.MONGODB_LOCAL_URI
		);
		if (!isConnected) throw new Error("mongodb error");
		console.log(`connected to ${process.env.MONGODB_ATLAS_URI}`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = dbConnect;
