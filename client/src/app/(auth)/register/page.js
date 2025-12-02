"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

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
		<main className="min-h-screen w-screen bg-amber-200 flex flex-col justify-center items-center text-black">
			<main className="flex flex-col content-start items-start bg-gray-200 w-md rounded-md px-6 py-4 shadow shadow-gray-600 hover:shadow-md  transition 2s">
				<h1 className="text-2xl font-bold">
					Sign Up
					<hr className="border border-black" />
				</h1>
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
						<Form className="flex flex-col gap-2 p-4 text-sm w-full">
							<div className="flex flex-col">
								<label htmlFor="fullName">Full Name</label>
								<Field
									name="fullName"
									placeholder="Jane Doe"
									className="bg-gray-200 rounded-sm px-2  py-1 border border-gray-400"
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="username">Username</label>
								<Field
									name="username"
									placeholder="jane123"
									className="bg-gray-200 rounded-sm px-2 py-1 border border-gray-400"
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="email">Email</label>
								<Field
									name="email"
									placeholder="jane@acme.com"
									type="email"
									className="bg-gray-200 rounded-sm px-2 py-1 border border-gray-400"
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="password">Password</label>
								<Field
									name="password"
									placeholder="password"
									type="password"
									className="bg-gray-200 rounded-sm px-2 py-1 border border-gray-400"
								/>
							</div>
							{/* 🔥 Added Role Field */}
							<div className="flex flex-col">
								<label htmlFor="role">Role</label>
								<Field
									as="select"
									name="role"
									className="bg-gray-200 rounded-sm px-2 py-1 w-full border border-gray-400"
								>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</Field>
							</div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-green-400 hover:bg-green-500 cursor-pointer rounded-sm py-1 px-2 text-white"
							>
								Submit
							</button>
							<div>
								Already have an account?{" "}
								<Link href={`/login`} className="hover:text-blue-600">
									<span>Login here</span>
								</Link>
							</div>
						</Form>
					)}
				</Formik>

				{/* <div className=" flex flex-col gap-2">
					apiMessage: {JSON.stringify(apiMessage, 2, 2)}
					formData: {JSON.stringify(formData, 2, 2)}
				</div> */}
			</main>
		</main>
	);
};

export default UserRegister;
