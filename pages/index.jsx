import { useQuery } from "@apollo/client";
import Link from "next/link";
import { Client } from "../components/Client";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { GET_CLIENT_SELLER } from "../gql/queries";

const Index = () => {
	const { data, loading, error } = useQuery(GET_CLIENT_SELLER);

	if (loading) return "Cargando...";

	return (
		<>
			<Layout>
				<Title
					style='text-2xl text-gray-800 font-light'
					title='Clientes'
				/>

				<Link href='/nuevocliente'>
					<a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>
						{" "}
						Nuevo Cliente
					</a>
				</Link>

				<table className='table auto shadow-sm mt-10 min-w-max'>
					<thead className='bg-gray-800'>
						<tr className='text-white'>
							<th className='w-1/5 py-2'>Nombre</th>
							<th className='w-1/5 py-2'>Empresa</th>
							<th className='w-1/5 py-2'>Email</th>
							<th className='w-1/5 py-2'>Actiones</th>
						</tr>
					</thead>
					<tbody className='bg-white'>
						{data.getClientsOfTheSeller.map((client) => (
							<Client key={client.id} client={client} />
						))}
					</tbody>
				</table>
			</Layout>
		</>
	);
};

export default Index;
