import React from "react";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const Index = () => {
	return (
		<>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Clientes'
				/>
			</Layout>
		</>
	);
};

export default Index;
