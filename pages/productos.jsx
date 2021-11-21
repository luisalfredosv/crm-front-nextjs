import { useQuery } from "@apollo/client";
import Link from "next/link";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import { ProductRow } from "../components/ProductRow";

import { GET_PRODUCTS } from "../gql/queries";

const Productos = () => {
	const { data, loading, error } = useQuery(GET_PRODUCTS);

	if (!data) return "Cargando...";

	return (
		<div>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Productos'
				/>

				<Link href='/nuevoproducto'>
					<a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>
						{" "}
						Nuevo Producto
					</a>
				</Link>

				<table className='table auto shadow-sm mt-10 min-w-max'>
					<thead className='bg-gray-800'>
						<tr className='text-white'>
							<th className='w-1/5 py-2'>Nombre</th>
							<th className='w-1/5 py-2'>Existencia</th>
							<th className='w-1/5 py-2'>Precio</th>
							<th className='w-1/5 py-2'>Eliminar</th>
							<th className='w-1/5 py-2'>Editar</th>
						</tr>
					</thead>
					<tbody className='bg-white'>
						{data.getProducts.map((product) => (
							<ProductRow key={product.id} producto={product} />
						))}
					</tbody>
				</table>
			</Layout>
		</div>
	);
};

export default Productos;
