import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./0.Routes/routes";
import AuthProvider from "./0.providers/AuthProvider";
// query ...
import { QueryClient, QueryClientProvider } from "react-query";
// query...

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div
          className="mx-auto w-screen max-w-screen-xl"
          style={{
            backgroundColor: "#9370DB", // Deeper lavender background color
          }}
        >
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
