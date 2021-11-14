import React from "react";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const productos = () => {
	return (
		<div>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Productos'
				/>
			</Layout>
		</div>
	);
};

export default productos;
