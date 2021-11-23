import { Layout } from "../components/Layout";
import { Title } from "../components/Title";

import { AssignClient } from "../components/orders/assignClient";

const NuevoPedido = () => {
	return (
		<>
			<Layout>
				<Title title='Nuevo Pedido' />

				<AssignClient />
				<AssignClient />
				<AssignClient />
			</Layout>
		</>
	);
};

export default NuevoPedido;
