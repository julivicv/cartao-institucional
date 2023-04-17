import {Route, Routes} from "react-router-dom";
import Card from "./pages/Card";
import React from "react";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";

export default function Router() {
    return (
        <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/card"} element={<Card name={"Júlio"} birth={"14/02/05"} href={"a.com"} group={"3°INFO"} link={"a.com"}/>}/>
            <Route path={"/users"} element={<UserList courses={[{ 'course': 'Turma1', 'id': "T1"}, { 'course': 'Turma2', 'id': "T2"}]}/>}/>
        </Routes>
    )
}