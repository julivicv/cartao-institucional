import { Route, Routes } from "react-router-dom";
import Card from "./pages/Card";
import React from "react";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import { RequireAuth } from "react-auth-kit";

export default function Router() {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route
        path={"/card"}
        element={
          <RequireAuth loginPath="/">
            <Card />
          </RequireAuth>
        }
      />
      <Route
        path={"/users"}
        element={
          <RequireAuth loginPath="/">
            <UserList
              name={"Júlio"}
              email={"julivicv@gmail.com"}
              password={"123456"}
              file={"aaa"}
              birthDate={"2005-02-14"}
              course={"3°INFO"}
              courses={[
                { course: "Turma1", id: "T1" },
                { course: "Turma2", id: "T2" },
              ]}
            />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
