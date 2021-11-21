import { useMutation } from "@apollo/client";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import { ClientForm } from "../components/ClientForm";

import { NEW_CLIENT } from "../gql/mutations";
import { GET_CLIENT_SELLER } from "../gql/queries";

const NuevoCliente = () => {
	const [newClient] = useMutation(NEW_CLIENT, {
		update(cache, { data: { newClient } }) {
			const { getClientsOfTheSeller } = cache.readQuery({
				query: GET_CLIENT_SELLER,
			});

			cache.writeQuery({
				query: GET_CLIENT_SELLER,
				data: {
					getClientsOfTheSeller: [
						...getClientsOfTheSeller,
						newClient,
					],
				},
			});
		},
	});

	const submit = async ({ name, surname, company, email, phone }) => {
		const { data } = await newClient({
			variables: {
				input: {
					name,
					surname,
					company,
					email,
					phone,
				},
			},
		});
		return data;
	};

	return (
		<>
			<Layout>
				<Title
					title='Nuevo Cliente'
					style='text-2xl text-gray-800 font-light'
				/>

				<ClientForm
					method={submit}
					title='Guardar'
					defaultValues={{}}
				/>
			</Layout>
		</>
	);
};

export default NuevoCliente;
