import { gql } from "@apollo/client";

export const NEW_USER = gql`
	mutation NewUser($input: UserInput) {
		newUser(input: $input) {
			id
			name
			surname
			email
		}
	}
`;
