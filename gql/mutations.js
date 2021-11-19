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

export const AUTH_USER = gql`
	mutation AuthUser($input: AuthInput) {
		authUser(input: $input) {
			token
		}
	}
`;

export const NEW_CLIENT = gql`
	mutation newClient($input: ClientInput) {
		newClient(input: $input) {
			id
			name
			surname
			email
			phone
			company
		}
	}
`;

export const DELETE_CLIENT = gql`
	mutation deleteClient($id: ID!) {
		deleteClient(id: $id)
	}
`;
