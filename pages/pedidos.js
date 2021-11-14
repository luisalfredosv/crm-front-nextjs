import React from "react";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const pedidos = () => {
	return (
		<>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Pedidos'
				/>
			</Layout>
		</>
	);
};

export default pedidos;
