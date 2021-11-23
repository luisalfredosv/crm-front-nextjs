import Select from "react-select";
import { useEffect, useState } from "react";

const options = [
	{
		value: "chocolate",
		label: "Chocolate",
	},
	{
		value: "strawberry",
		label: "Strawberry",
	},
	{
		value: "vanilla",
		label: "Vanilla",
	},
];

export const AssignClient = () => {
	const [sabores, setSabores] = useState([]);

	useEffect(() => {}, [sabores]);

	const selectSabor = (sabores) => {
		setSabores(sabores);
	};

	return (
		<Select
			options={options}
			isMulti={true}
			onChange={(option) => selectSabor(option)}
			getOptionValue={(options) => options.label}
			getOptionLabel={(options) => options.value}
			placeholder='Selecione un sabor'
			noOptionsMessage={() => "No hay resultados"}
		/>
	);
};
