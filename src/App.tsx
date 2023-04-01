import {useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
import './styles/App.css'

function App() {

    return (
        <div className={"app-container"}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </div>
    )
}

export default App
