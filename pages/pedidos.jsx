import Link from "next/link";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

const Pedidos = () => {
	return (
		<>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Pedidos'
				/>

				<Link href='/nuevopedido'>
					<a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>
						{" "}
						Nuevo Pedido
					</a>
				</Link>
			</Layout>
		</>
	);
};

export default Pedidos;
