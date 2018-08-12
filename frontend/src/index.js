import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';

import appSyncConfig from "./AppSync";
import Client from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";



const client = new Client({
    url: appSyncConfig.graphqlEndpoint,
    region: appSyncConfig.region,
    auth: {
        type: appSyncConfig.authenticationType,
        apiKey: appSyncConfig.apiKey,
    }
});

const AppWithProvider =() => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

ReactDOM.render(  <AppWithProvider/>, document.getElementById('root'));



