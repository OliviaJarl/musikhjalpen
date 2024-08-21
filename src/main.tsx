import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import DataProvider from "./state-management/DataProvider.tsx";

// <RouterProvider router={router}/>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
