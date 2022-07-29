import React, { useEffect, useState } from "react";

import "./assets/styles/form.css";
import AlertMessage from "./components/AlertMessage";

function App() {
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [inputType, setInputType] = useState("");

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(formErrors).length === 0) {
			setFormValues({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			setIsSubmit(true);
		}
	};

	const validateForm = (values, type) => {
		const errors = {};
		const usernameRegex = /^[a-zA-Z]+$/;
		const emailRegex =
			// eslint-disable-next-line
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (type === "username")
			if (values.username.length < 3 || values.username.length > 20)
				errors.username =
					"Username must be between 3 and 20 characters";
			else if (!values.username) errors.username = "Username is required";

		if (type === "username")
			if (!usernameRegex.test(values.username))
				errors.username = "Username must be alphabetic";

		if (type === "password")
			if (values.password.length < 6)
				errors.password = "Password must be at least 6 characters";
			else if (values.password === values.username)
				errors.password = "Password must be different from username";
			else if (!passwordRegex.test(values.password))
				errors.password =
					"Password must contain at least one number, one uppercase and one special character";
			else if (!values.password) errors.password = "Password is required";

		if (values.password !== values.confirmPassword)
			errors.confirmPassword = "Password must be same as above";

		if (type === "email")
			if (!emailRegex.test(values.email))
				errors.email = "Email must be like username@domain.com";
			else if (!values.email) errors.email = "Email is required";

		return errors;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputType(name);
		setFormValues({ ...formValues, [name]: value });
	};

	useEffect(() => {
		setFormErrors(validateForm(formValues, inputType));
		// eslint-disable-next-line
	}, [formValues, formErrors, isSubmit]);

	return (
		<div className="form_wrapper">
			{Object.keys(formErrors).length === 0 && isSubmit ? (
				<AlertMessage message="Sign in successfull" />
			) : (
				<pre>{JSON.stringify(formValues, null, 3)}</pre>
			)}
			<div className="form_container">
				<div className="title_container">
					<h2>Registration Form</h2>
				</div>
				<div className="row clearfix">
					<div>
						<form onSubmit={handleOnSubmit}>
							<div className="row clearfix">
								<div className="col_half">
									<div className="input_field">
										<span>
											<i
												aria-hidden="true"
												className="fa fa-user"></i>
										</span>
										<input
											type="username"
											name="username"
											placeholder="User Name"
											value={formValues.username}
											onChange={(e) =>
												handleInputChange(e)
											}
										/>
									</div>
									<p>{formErrors.username}</p>
								</div>
							</div>
							<div className="input_field">
								<span>
									<i
										aria-hidden="true"
										className="fa fa-envelope"></i>
								</span>
								<input
									type="useremail"
									name="email"
									placeholder="Email"
									value={formValues.email}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<p>{formErrors.email}</p>
							<div className="input_field">
								<span>
									<i
										aria-hidden="true"
										className="fa fa-lock"></i>
								</span>
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={formValues.password}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<p>{formErrors.password}</p>
							<div className="input_field">
								<span>
									<i
										aria-hidden="true"
										className="fa fa-lock"></i>
								</span>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Re-type Password"
									value={formValues.confirmPassword}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<p>{formErrors.confirmPassword}</p>
							<input
								className="button"
								type="submit"
								value="Register"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
