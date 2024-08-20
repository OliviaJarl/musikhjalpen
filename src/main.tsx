import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
//import App from "./App.tsx"; //Använd App när köra Spotify skript, och Router när jobba med navigation
import theme from "./theme.ts";
import "./index.css";
import { RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import AllTracksArtistsProvider from "./state-management/AllTracksArtistsProvider.tsx";

// <RouterProvider router={router}/> Istället för App.tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AllTracksArtistsProvider>
      <RouterProvider router={router} />
      </AllTracksArtistsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
