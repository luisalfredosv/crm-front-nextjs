import { useReducer } from "react";
import { OrderContext } from "./OrderContext";
import OrderReducer from "./OrderReducer";

import { SELECT_CLIENT, SELECT_PRODUCT, QUANTITY_PRODUCTS } from "../../types";

export const OrderState = ({ children }) => {
	const initialState = {
		client: [],
		products: [],
		total: 0,
	};

	const [state, dispatch] = useReducer(OrderReducer, initialState);

	const holaMundoUseReducer = () => console.log("Hola mundo");

	return (
		<OrderContext.Provider
			value={{
				holaMundoUseReducer,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
