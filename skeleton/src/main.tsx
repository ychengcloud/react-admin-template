import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import SuspendFallbackLoading from "./pages/layout/suspendFallbackLoading";
import { apolloClient } from "./ApolloClient";

import { LocaleProvider } from "./LocaleProvider";

// Start the mocking conditionally.
async function prepare() {
  if (import.meta.env.DEV && import.meta.env.MODE === 'mock') {
    const {worker} = await import('./mocks/browser');

    return worker.start({
      // onUnhandledRequest: "warn",
    });
  }
}

const rootElement = document.getElementById("root");

prepare().then(() => {
  ReactDOM.render(
    // <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <LocaleProvider>
        <RecoilRoot>
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{" "}
                <button onClick={() => resetErrorBoundary()}>Try again</button>
                <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
              </div>
            )}
          >
            <Suspense fallback={<SuspendFallbackLoading />}>
              <App />
            </Suspense>
          </ErrorBoundary>
        </RecoilRoot>
      </LocaleProvider>
    </ApolloProvider>,

    // </React.StrictMode>,
    rootElement
  );
});
