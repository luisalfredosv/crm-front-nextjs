import { gql } from "@apollo/client";

export const GET_CLIENT_SELLER = gql`
	query getClientsOfTheSeller {
		getClientsOfTheSeller {
			id
			name
			surname
			company
			email
		}
	}
`;

export const GET_USER = gql`
	query getUser {
		getUser {
			id
			name
			surname
		}
	}
`;

export const GET_CLIENT = gql`
	query getClient($id: ID!) {
		getClient(id: $id) {
			id
			name
			surname
			company
			email
			phone
		}
	}
`;

export const GET_PRODUCTS = gql`
	query getProducts {
		getProducts {
			id
			name
			price
			stock
		}
	}
`;

export const GET_PRODUCT = gql`
	query getProduct($id: ID!) {
		getProduct(id: $id) {
			id
			name
			price
			stock
		}
	}
`;
