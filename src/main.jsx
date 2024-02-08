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
          className="mx-auto w-screen max-w-[1280px] max-h-[720px]"
          style={{
            backgroundImage:
              'url("https://i.ibb.co/k8TMY8m/Whats-App-Image-2024-01-04-at-09-52-59-8c3b2ad2.jpg',
          }}
        >
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
