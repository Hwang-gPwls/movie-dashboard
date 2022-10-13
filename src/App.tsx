import React, { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import routes from "./routes";
import GlobalStyle from "./styles/global-style";
import { theme } from "./styles/theme";

const Routes = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Router>
            <Suspense>
              <Routes />
            </Suspense>
          </Router>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
