import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/chatrooms/:id",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);
