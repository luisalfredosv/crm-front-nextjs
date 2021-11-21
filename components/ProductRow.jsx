import { useRouter } from "next/router";

export const ProductRow = ({ producto }) => {
	const confirmDeleteProduct = (id) => {};

	const router = useRouter();

	const editProduct = (id) => {
		router.push({
			pathname: "/editarproducto/[id]",
			query: {
				id,
			},
		});
	};

	if (!producto) return "Cargando...";

	const { id, name, stock, price } = producto;
	return (
		<>
			<tr key={id}>
				<td className='border px-4 py-2'>{name}</td>
				<td className='border px-4 py-2'>{stock}</td>
				<td className='border px-4 py-2'>{price}</td>
				<td className='border px-4 py-2'>
					<button
						type='button'
						className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded hover:bg-red-600 text-xs uppercase font-bold'
						onClick={() => confirmDeleteProduct(id)}
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
						onClick={() => editProduct(id)}
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
