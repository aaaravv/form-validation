import React from "react";

import "../assets/styles/alertmessage.css";

const AlertMessage = ({ message }) => {
	return (
		<div className="alert-container">
			<p>{message}</p>
		</div>
	);
};

export default AlertMessage;
