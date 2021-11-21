import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { Layout } from "../../components/Layout";
import { Title } from "../../components/Title";
import { ClientForm } from "../../components/ClientForm";

import { GET_CLIENT } from "../../gql/queries";
import { UPDATE_CLIENT } from "../../gql/mutations";

const EditarCliente = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const { data, loading, error } = useQuery(GET_CLIENT, {
		variables: {
			id,
		},
	});

	const [updateClient] = useMutation(UPDATE_CLIENT);

	if (loading) return "Cargando...";

	const submit = async (dataForm) => {
		const { name, surname, company, email, phone } = dataForm;
		const { data } = await updateClient({
			variables: {
				id,
				input: {
					name,
					surname,
					company,
					email,
					phone,
				},
			},
		});

		Swal.fire({
			title: "Actualizado",
			text: "El cliente se actualizo corretamente",
			icon: "success",
		});

		return data;
	};

	return (
		<>
			<Layout>
				<Title title='Editar Cliente'></Title>
				<ClientForm
					method={submit}
					title='Actualizar'
					defaultValues={data.getClient}
				/>
			</Layout>
		</>
	);
};

export default EditarCliente;
