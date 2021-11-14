import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// import fecth from "node-fetch";

const client = new ApolloClient({
	connectToDevTools: true,
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
	// link: new HttpLink({
	// 	fetch:
	// }),
});

export default client;
