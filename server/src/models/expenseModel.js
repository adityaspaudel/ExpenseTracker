const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01, 
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online", "Other"],
      default: "Cash",
    },
  },
  {
   
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
