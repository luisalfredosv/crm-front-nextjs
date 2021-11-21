import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { DELETE_CLIENT } from "../gql/mutations";
import { GET_CLIENT_SELLER } from "../gql/queries";

export const ClientRow = ({ client }) => {
	const router = useRouter();

	const [deleteClient] = useMutation(DELETE_CLIENT, {
		update(cache) {
			const { getClientsOfTheSeller } = cache.readQuery({
				query: GET_CLIENT_SELLER,
			});

			cache.writeQuery({
				query: GET_CLIENT_SELLER,
				data: {
					getClientsOfTheSeller: getClientsOfTheSeller.filter(
						(clientAt) => clientAt.id !== id
					),
				},
			});
		},
	});

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

					Swal.fire("Eliminado!", data.deleteClient, "success");
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const editClient = (id) => {
		router.push({
			pathname: "/editarcliente/[id]",
			query: {
				id,
			},
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
						className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded hover:bg-red-600 text-xs uppercase font-bold'
						onClick={() => confirmDeleteClient(id)}
					>
						Eliminar
						<svg
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='0'
							viewBox='0 0 24 24'
							className='w-4 h-4 ml-2'
						>
							<path d='M10 14L2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
						</svg>
					</button>
				</td>
				<td className='border px-4 py-2'>
					<button
						type='button'
						className='flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded hover:bg-green-600 text-xs uppercase font-bold'
						onClick={() => editClient(id)}
					>
						Editar
						<svg
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='0'
							viewBox='0 0 24 24'
							className='w-4 h-4 ml-2'
						>
							<path d='M10 14L2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
						</svg>
					</button>
				</td>
			</tr>
		</>
	);
};
