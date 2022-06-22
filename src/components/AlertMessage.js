import React, { useEffect, useState } from "react";

import "../assets/styles/alertmessage.css";

const AlertMessage = ({ message }) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		setInterval(() => {
			setShow(false);
			window.location.reload();
		}, 3000);
	}, []);

	return (
		<div className="alert-container">
			<p>{show && message}</p>
		</div>
	);
};

export default AlertMessage;
