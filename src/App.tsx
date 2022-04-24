import { CssBaseline } from "@mui/material";
import { GlobalSpinnerComponent } from "modules/shared/GlobalSpinner";
import { GlobalLoadingProvider } from "providers/GlobalLoadingProvider";
import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./modules/private/Private";
import PublicRoute from "./modules/public/Public";
import { ProviderAuth } from "./providers/AuthProvider";

// function App() {
//   return (
//     <>
//       <CssBaseline />
//       <BrowserRouter>
//         <ProviderAuth>
//           <Routes>
//             {PublicRoute()}
//             {PrivateRoute()}
//           </Routes>
//         </ProviderAuth>
//       </BrowserRouter>
//       <Toaster position="top-center" reverseOrder={false} />
//     </>
//   );
// }

function App() {
  return (
    <>
      <GlobalLoadingProvider>
        {/* Componentes globais presente em todas as rotas */}
        <CssBaseline />
        <GlobalSpinnerComponent loadingKey="global" />
        <Toaster position="bottom-right" />
        {/* Roteamento das Páginas */}
        <BrowserRouter>
          <ProviderAuth>
            <Routes>
              {PublicRoute()}
              {PrivateRoute()}
            </Routes>
          </ProviderAuth>
        </BrowserRouter>
      </GlobalLoadingProvider>
    </>
  );
}

export default App;
