import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
