import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { Layout } from "../../components/Layout";
import { Title } from "../../components/Title";
import { ProductForm } from "../../components/ProductForm";

import { GET_PRODUCT } from "../../gql/queries";
import { UPDATE_PRODUCT } from "../../gql/mutations";

const EditarProducto = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const { data, loading, error } = useQuery(GET_PRODUCT, {
		variables: {
			id,
		},
	});

	const [updateProduct] = useMutation(UPDATE_PRODUCT);

	const submit = async ({ name, stock, price }) => {
		const { data } = await updateProduct({
			variables: {
				id,
				input: {
					name,
					stock,
					price,
				},
			},
		});

		Swal.fire({
			title: "Actualizado",
			text: "El producto se actualizo corretamente",
			icon: "success",
		});

		return data;
	};

	if (loading) return "Cargando...";

	return (
		<>
			<Layout>
				<Title title='Editar Producto'></Title>
				<ProductForm
					method={submit}
					title='Actualizar'
					defaultValues={data.getProduct}
				/>
			</Layout>
		</>
	);
};

export default EditarProducto;
