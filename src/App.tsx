import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./styles/App.css";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <div className={"app-container"}>
      <BrowserRouter>
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
