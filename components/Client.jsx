import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

import { DELETE_CLIENT } from "../gql/mutations";

export const Client = ({ client }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT);

	const { id, name, surname, email, company } = client;
	const confirmDeleteClient = (id) => {
		Swal.fire({
			title: "¿Desea eliminar a este cliente?",
			text: "Esta acción no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar",
			cancelButtonText: "No, cancelar",
		}).then(async (result) => {
			if (result.value) {
				try {
					const { data } = await deleteClient({
						variables: {
							id,
						},
					});

					console.log(data);
					// Swal.fire("Eliminado!", data.deleteClient, "success");
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	return (
		<>
			<tr key={id}>
				<td className='border px-4 py-2'>
					{name} {surname}
				</td>
				<td className='border px-4 py-2'>{company}</td>
				<td className='border px-4 py-2'>{email}</td>
				<td className='border px-4 py-2'>
					<button
						type='button'
						className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded hover:bg-red-600'
						onClick={() => confirmDeleteClient(id)}
					>
						Eliminar
					</button>
				</td>
			</tr>
		</>
	);
};
