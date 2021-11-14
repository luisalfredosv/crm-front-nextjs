import React from "react";
import PropTypes from "prop-types";

export const Title = ({ title, style }) => {
	return (
		<>
			<h1 className={style}>{title}</h1>
		</>
	);
};

Title.propTypes = {
	title: {
		type: PropTypes.string.isRequired,
	},
	style: {
		type: PropTypes.string,
	},
};
