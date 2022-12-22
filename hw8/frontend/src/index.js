import React from "react";
import ReactDOM from "react-dom/client";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {ChatProvider} from "./hooks/useChat"
import App from "./App";
import './index.css';

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
});
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5000/graphql',
}));

const splitLink = split(({query}) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription');
}, wsLink, httpLink);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {fetchPolicy: "network-only"},
    }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ApolloProvider client={client}>
        <ChatProvider>
            <App/>
        </ChatProvider>
    </ApolloProvider>
);