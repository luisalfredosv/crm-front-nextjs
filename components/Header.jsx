import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

import { GET_USER } from "../gql/queries";

export const Header = () => {
	const { data, loading, error } = useQuery(GET_USER);

	const router = useRouter();

	if (loading) return null;

	if (!data) {
		return router.push("/login");
	}

	const { name, surname } = data?.getUser;

	const cerrarSesion = () => {
		localStorage.removeItem("token");
		router.push("/login");
	};

	return (
		<div className='flex justify-end'>
			<p className='mr-2'>
				Vendedor: {name} {surname}
			</p>

			<button
				onClick={() => cerrarSesion()}
				className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
				type='button'
			>
				Cerrar sesion
			</button>
		</div>
	);
};
