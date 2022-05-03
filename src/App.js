import React, { useEffect, useState } from "react";

import "./assets/styles/form.css";
import AlertMessage from "./components/AlertMessage";

function App() {
	const initialValues = { username: "", email: "", password: "" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		console.log(formValues);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validateForm(formValues));
		setIsSubmit(true);
	};

	const validateForm = (values) => {
		const errors = {};
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!values.username) {
			errors.username = "Username is required";
		}
		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 6) {
			errors.password = "Password must be at least 6 characters";
		} else if (values.password === values.username) {
			errors.password = "Password must be different from username";
		}
		if (!values.email) {
			errors.email = "Email is required";
		} else if (!emailRegex.test(values.email)) {
			errors.email = "Email is not valid";
		}
		return errors;
	};

	const handleOnReset = () => {
		setFormValues(initialValues);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
			handleOnReset();
		}
	}, [formErrors]);

	return (
		<div className="form_wrapper">
			{Object.keys(formErrors).length === 0 && isSubmit ? (
				<AlertMessage message="Sign in successfull" />
			) : (
				// <pre>{JSON.stringify(formValues, null, 2)}</pre>
				""
			)}
			<div className="form_container">
				<div className="title_container">
					<h2>Responsive Registration Form</h2>
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
											onChange={handleInputChange}
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
									onChange={handleInputChange}
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
									onChange={handleInputChange}
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
									name="password"
									placeholder="Re-type Password"
									value={formValues.password}
									onChange={handleInputChange}
								/>
							</div>
							<p>{formErrors.password}</p>
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
