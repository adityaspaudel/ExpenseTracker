const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// PORT=8000 
// MONGODB_ATLAS_URI="mongodb+srv://adityaspaudel_db_user:adityaspaudel_db_user@cluster0.kigzppt.mongodb.net/expenseTracker" 


const MONGODB_LOCAL_URI = "mongodb://localhost:27017/expenseTracker";
const dbConnect = async () => {
	try {
		const isConnected = await mongoose.connect(
			`${process.env.MONGODB_ATLAS_URI}`
		);
		if (!isConnected) throw new Error("mongodb error");
		else console.log(`connected to ${process.env.MONGODB_ATLAS_URI}`);
	} catch (error) {
		console.error("database connection error", error);
	}
};

module.exports = dbConnect;
