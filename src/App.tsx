import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import routes from "./routes";
import GlobalStyle from "./styles/global-style";
import { theme } from "./styles/theme";

const Routes = () => {
  return useRoutes(routes);
};

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Router>
              <Suspense>
                <Routes />
              </Suspense>
            </Router>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
