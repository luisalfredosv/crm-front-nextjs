import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";

export const ProductForm = ({ method, title, defaultValues }) => {
	const router = useRouter();

	const [message, saveMessage] = useState(null);

	const { id, name, stock, price } = defaultValues;

	const formik = useFormik({
		initialValues: {
			name: name ?? "",
			stock: stock ?? 0,
			price: price ?? 0,
		},
		validationSchema: Yup.object({
			name: Yup.string().required(
				"El nombre del producto es obligatorio"
			),
			stock: Yup.number()
				.required("La cantidad de stock es requerida")
				.positive("No se aceptan numeros negativos")
				.integer("El numero de stock debe ser un numero entero"),
			price: Yup.number()
				.required("El price es requerido")
				.positive("No se aceptan numeros negativos"),
		}),
		onSubmit: async (dataForm) => {
			try {
				await sendForm(dataForm);
				router.push("/productos");
			} catch (error) {
				saveMessage(error.message.replace("GraphQL error:"));
				console.error(error);
				setTimeout(() => saveMessage(null), 3000);
			}
		},
	});

	const sendForm = async (dataForm) => {
		await method(dataForm);
	};

	const showMessage = () => {
		return (
			<div className='bg-white py-2 px-2 w-full my-3 max-w-sm text-center mx-auto'>
				<p>{message}</p>
			</div>
		);
	};

	return (
		<>
			{message && showMessage()}

			<div className='flex justify-center mt-5'>
				<div className='w-full max-w-sm'>
					<form
						className='bg-white rounded shadow-sm px-8 pt-6  pb-8 mb-4'
						onSubmit={formik.handleSubmit}
					>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='name'
							>
								Nombre
							</label>

							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
								id='name'
								type='text'
								placeholder='Nombre Producto'
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
						</div>

						{formik.touched.name && formik.errors.name ? (
							<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
								<p>{formik.errors.name}</p>
							</div>
						) : null}

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='stock'
							>
								Cantidad
							</label>

							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
								id='stock'
								type='number'
								placeholder='Cantidad Producto'
								value={formik.values.stock}
								onChange={formik.handleChange}
							/>
						</div>

						{formik.touched.stock && formik.errors.stock ? (
							<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
								<p>{formik.errors.stock}</p>
							</div>
						) : null}

						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='price'
							>
								Precio
							</label>

							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
								id='price'
								type='number'
								placeholder='Precio Producto'
								value={formik.values.price}
								onChange={formik.handleChange}
							/>
						</div>

						{formik.touched.price && formik.errors.price ? (
							<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
								<p>{formik.errors.price}</p>
							</div>
						) : null}

						<input
							type='submit'
							className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
							value={title}
						/>
					</form>
				</div>
			</div>
		</>
	);
};
