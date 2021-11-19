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
