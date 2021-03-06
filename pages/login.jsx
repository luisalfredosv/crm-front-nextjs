import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";

import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { AUTH_USER } from "../gql/mutations";
import { useRouter } from "next/router";

const Login = () => {
	const [message, saveMessage] = useState(null);

	const router = useRouter();

	const [AuthUser] = useMutation(AUTH_USER);

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
		onSubmit: async ({ email, password }) => {
			try {
				const { data } = await AuthUser({
					variables: {
						input: {
							email,
							password,
						},
					},
				});

				saveMessage("Autenticando... ");

				const { token } = data.authUser;

				localStorage.setItem("token", token);

				setTimeout(() => saveMessage(null), 3000);

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
				{message && showMessage()}

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
									Contrase??a
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
								value='Iniciar Sesi??n'
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Login;
