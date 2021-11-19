import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { NEW_USER } from "../gql/mutations";

const Nuevacuenta = () => {
	const [message, saveMessage] = useState(null);

	const [NewUser] = useMutation(NEW_USER);

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("El nombre es obligatorio"),
			surname: Yup.string().required("El apellido es obligatorio"),
			email: Yup.string()
				.email("El email no es valido")
				.required("El email es obligatorio"),
			password: Yup.string()
				.required("El password es obligatorio")
				.min(6, "El  minimo permitido es de 6 caracteres"),
		}),
		onSubmit: async ({ name, surname, email, password }) => {
			try {
				const { data } = await NewUser({
					variables: {
						input: {
							name,
							surname,
							email,
							password,
						},
					},
				});
				saveMessage(`Te haz registrado correctamente!`);
				setTimeout(() => {
					saveMessage(null);
					router.push("/login");
				}, 3000);
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
				{message && showMessage()}

				<Title
					style='text-center text-white'
					title='Crear Nueva Cuenta'
				/>

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
									placeholder='Nombre Usuario'
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
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
									placeholder='Apellido Usuario'
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
									htmlFor='email'
								>
									Email
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='email'
									type='email'
									placeholder='Email Usuario'
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
									htmlFor='password'
								>
									Contraseña
								</label>

								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline '
									id='password'
									type='password'
									placeholder='Password Usuario'
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
							</div>

							{formik.touched.password &&
							formik.errors.password ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p>{formik.errors.password}</p>
								</div>
							) : null}

							<input
								type='submit'
								className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700 rounded'
								value='Crear Cuenta'
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Nuevacuenta;
