"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const UserRegister = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    // role: "",
  });
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={formData}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="fullName">FullName</label>
            <Field name="fullName" placeholder="Jane" />

            <label htmlFor="username">Username</label>
            <Field name="username" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@acme.com" type="email" />
            <label>Password</label>
            <Field name="password" placeholder="password" type="password" />
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
