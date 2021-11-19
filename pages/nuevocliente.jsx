import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { NEW_CLIENT } from "../gql/mutations";
import { GET_CLIENT_SELLER } from "../gql/queries";

import { useRouter } from "next/router";

const NuevoCliente = () => {
	const [message, saveMessage] = useState(null);

	const router = useRouter();

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

	const formik = useFormik({
		initialValues: {
			name: "",
			surname: "",
			company: "",
			email: "",
			phone: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre del cliente es obligatorio"),
			surname: Yup.string().required(
				"El apellido del cliente es obligatorio"
			),
			company: Yup.string().required("El campo empresa es obligatorio"),
			email: Yup.string()
				.email("El email no es valido")
				.required("El email es obligatorio"),
		}),
		onSubmit: async ({ name, surname, company, email, phone }) => {
			try {
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

				router.push("/");
			} catch (error) {
				saveMessage(error.message.replace("GraphQL error:"));
				console.error(error);
				setTimeout(() => saveMessage(null), 3000);
			}
		},
	});

	const showMessage = () => {
		return (
			<div className='bg-white py-2 px-2 w-full my-3 max-w-sm text-center mx-auto'>
				<p>{message}</p>
			</div>
		);
	};
	return (
		<>
			<Layout>
				<Title
					title='Nuevo Cliente'
					style='text-2xl text-gray-800 font-light'
				/>

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
									placeholder='Nombre Cliente'
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
									htmlFor='surname'
								>
									Apellido
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='surname'
									type='text'
									placeholder='Apellido Cliente'
									value={formik.values.surname}
									onChange={formik.handleChange}
								/>
							</div>

							{formik.touched.surname && formik.errors.surname ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p>{formik.errors.surname}</p>
								</div>
							) : null}

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='company'
								>
									Empresa
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='company'
									type='text'
									placeholder='Empresa Cliente'
									value={formik.values.company}
									onChange={formik.handleChange}
								/>
							</div>

							{formik.touched.company && formik.errors.company ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p>{formik.errors.company}</p>
								</div>
							) : null}

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='email'
								>
									Email
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='email'
									type='email'
									placeholder='Email Cliente'
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
							</div>

							{formik.touched.email && formik.errors.email ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p>{formik.errors.email}</p>
								</div>
							) : null}

							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='phone'
								>
									Telefono
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='phone'
									type='text'
									placeholder='Telefono Cliente'
									value={formik.values.phone}
									onChange={formik.handleChange}
								/>
							</div>

							{formik.touched.phone && formik.errors.phone ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p>{formik.errors.phone}</p>
								</div>
							) : null}

							<input
								type='submit'
								className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default NuevoCliente;
