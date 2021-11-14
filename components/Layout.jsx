import React from "react";
import Head from "next/head";

import "tailwindcss/tailwind.css";
import { Sidebar } from "./Sidebar";
import { useRouter } from "next/router";

export const Layout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>CRM - Administración de Clientes</title>
			</Head>

			{router.pathname === "/login" ||
			router.pathname === "/nuevacuenta" ? (
				<div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
					<div>{children} </div>
				</div>
			) : (
				<div className='bg-gray-200 min-h-screen'>
					<div className='flex min-h-screen'>
						<Sidebar />

						<main className='sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
							{children}
						</main>
					</div>
				</div>
			)}
		</>
	);
};
