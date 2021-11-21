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

export const UPDATE_CLIENT = gql`
	mutation updateClient($id: ID!, $input: ClientInput) {
		updateClient(id: $id, input: $input) {
			id
			name
			surname
			company
			email
			phone
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation updateProduct($id: ID!, $input: ProductInput) {
		updateProduct(id: $id, input: $input) {
			id
			name
			price
			stock
		}
	}
`;

export const NEW_PRODUCT = gql`
	mutation newProduct($input: ProductInput) {
		newProduct(input: $input) {
			id
			name
			price
			stock
		}
	}
`;
