import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { Toaster } from "react-hot-toast";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/ui/app-sidebar.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <App />
              </ThemeProvider>
            </SidebarInset>
            <Toaster
              toastOptions={{
                position: "top-right",
                style: {
                  background: "#283046",
                  color: "white",
                },
              }}
            />
          </SidebarProvider>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
