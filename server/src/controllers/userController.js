const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const transporter = require("../others/nodemailer");

// EMAIL_USER = "adityaspaudel@gmail.com";
// EMAIL_PASS = "ivmf ilgt npdb ncvn";

// nodemailer sendMail setting up
const sendMail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hello from Nodemailer",
      text: "This is a test email using Gmail + Nodemailer + App Password.",
    });
    console.log("✅ Email sent:", info.response);
    return true;
  } catch (err) {
    console.error("⚠️ Error sending email:", err.message);
    return false;
  }
};

// registering new user
const userRegistration = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body || {};

    if (!fullName || !username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findUserByUsername = await User.findOne({ username });
    const findUserByEmail = await User.findOne({ email });

    if (findUserByUsername || findUserByEmail) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Send email but don't crash registration if it fails
    const emailSent = await sendMail(email);
    if (!emailSent) {
      console.warn(
        `⚠️ User created but email could not be sent to ${email}`
      );
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("🔥 Registration failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User doesn't exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Password didn't match" });
		}

		// 🔥 Generate 6-digit OTP
		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		// 🔥 Save OTP + expiry (5 minutes)
		user.otp = otp;
		user.otpExpires = Date.now() + 5 * 60 * 1000;
		await user.save();

		// 🔥 Send OTP email
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: "Your Login OTP",
			text: `Your OTP for login is: ${otp}. It is valid for 5 minutes.`,
		});

		return res.status(200).json({
			message: "OTP sent to your email",
			email: user.email,
		});
	} catch (error) {
		console.error("User login failed:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const verifyOtp = async (req, res) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({ message: "Email and OTP are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User doesn't exist" });
		}

		// Check if OTP exists + not expired
		if (!user.otp || user.otpExpires < Date.now()) {
			return res
				.status(400)
				.json({ message: "OTP expired, request a new one" });
		}

		// Match OTP
		if (user.otp !== otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		// Clear OTP after success
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		// Generate JWT
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		// Send success response
		return res.status(200).json({
			message: "OTP verified successfully",
			token,
			user: {
				id: user._id,
				fullName: user.fullName,
				email: user.email,
				username: user.username,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("OTP verification failed:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
module.exports = { userRegistration, userLogin, verifyOtp };
