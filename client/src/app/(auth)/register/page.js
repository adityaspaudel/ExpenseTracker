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

	return (
		<div>
			<h1>Sign Up</h1>

			<Formik
				initialValues={formData}
				onSubmit={async (values) => {
					alert(JSON.stringify(values, null, 2));

					try {
						const response = await axios(
							`http://localhost:8000/user/userRegistration`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									body: JSON.stringify(values),
								},
							}
						);
						if (!response.ok)
							throw new Error(`Server error,${response.data.message}`);
					} catch (error) {
						console.error(error);
					} finally {
						console.log(`process completed`);
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
		</div>
	);
};

export default UserRegister;
