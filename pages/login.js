import React from "react";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("El email no es valido")
				.required("El email es obligatorio"),
			password: Yup.string()
				.required("El password es obligatorio")
				.min(6, "El  minimo permitido es de 6 caracteres"),
		}),
		onSubmit: (values) => {},
	});
	return (
		<>
			<Layout>
				<Title style='text-center text-white' title='Login' />

				<div className='flex justify-center mt-5'>
					<div className='w-full max-w-sm'>
						<form
							className='bg-white rounded shadow-sm px-8 pt-6  pb-8 mb-4'
							onSubmit={formik.handleSubmit}
						>
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
								value='Iniciar Sesión'
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Login;
