"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";

const UserRegister = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		role: "user", // default role
	});
	const [apiMessage, setApiMessage] = useState(null);

	return (
		<div>
			<h1>Sign Up</h1>
			apiMessage: {JSON.stringify(apiMessage)}
			<Formik
				initialValues={formData}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						const response = await axios.post(
							"http://localhost:8000/user/userRegistration",
							values,
							{ headers: { "Content-Type": "application/json" } }
						);

						setApiMessage(response.data.message);
						resetForm();
					} catch (error) {
						console.error(error);
						if (error.response) {
							setApiMessage(error.response.data.message);
						} else {
							setApiMessage("Something went wrong!");
						}
					} finally {
						setSubmitting(false);
						console.log("Process completed");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<label htmlFor="fullName">Full Name</label>
						<Field name="fullName" placeholder="Jane Doe" />

						<label htmlFor="username">Username</label>
						<Field name="username" placeholder="jane123" />

						<label htmlFor="email">Email</label>
						<Field name="email" placeholder="jane@acme.com" type="email" />

						<label htmlFor="password">Password</label>
						<Field name="password" placeholder="password" type="password" />

						{/* 🔥 Added Role Field */}
						<label htmlFor="role">Role</label>
						<Field as="select" name="role">
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</Field>

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
			{JSON.stringify(formData, 2, 2)}
		</div>
	);
};

export default UserRegister;
