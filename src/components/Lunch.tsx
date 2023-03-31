import {useState} from "react";
import "../styles/Lunch.css"
export interface props {
    isAuthorized: boolean,
    date: string,
}
export default function Lunch ({ isAuthorized, date }:props) {
    const [Auth, setAuth] = useState(isAuthorized)
    return (
        <div className={ Auth ? "authorized" : "not-authorized" }>
        { Auth  ? (<span>Almoço Liberado {date} </span>) : (<span>Almoço Não Liberado</span>)}
        </div>
    )
}
