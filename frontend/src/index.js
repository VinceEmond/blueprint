import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

// cookies
import { CookiesProvider } from "react-cookie";
import UsersProvider from "./Providers/UsersProvider";
import ViewsProvider from "./Providers/ViewProvider";

// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// // 👇️ if you use TypeScript, add non-null (!) assertion operator
// // const root = createRoot(rootElement!);

root.render(
  <CookiesProvider>
    <UsersProvider>
      <ViewsProvider>
        <App />
      </ViewsProvider>
    </UsersProvider>
  </CookiesProvider>
);
