import { useMutation } from "@apollo/client";
import { Layout } from "../components/Layout";
import { ProductForm } from "../components/ProductForm";
import { Title } from "../components/Title";

import { NEW_PRODUCT } from "../gql/mutations";
import { GET_PRODUCTS } from "../gql/queries";

const NuevoProducto = () => {
	const [newProduct] = useMutation(NEW_PRODUCT, {
		update(cache, { data: { newProduct } }) {
			const { getProducts } = cache.readQuery({
				query: GET_PRODUCTS,
			});

			cache.writeQuery({
				query: GET_PRODUCTS,
				data: {
					getProducts: [...getProducts, newProduct],
				},
			});
		},
	});

	const submit = async ({ name, stock, price }) => {
		const { data } = await newProduct({
			variables: {
				input: {
					name,
					stock,
					price,
				},
			},
		});
		return data;
	};

	return (
		<Layout>
			<Title
				title='Nuevo Producto'
				style='text-2xl text-gray-800 font-light'
			/>

			<ProductForm method={submit} title='Guardar' defaultValues={{}} />
		</Layout>
	);
};

export default NuevoProducto;
