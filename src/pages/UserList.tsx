import "../styles/UserList.css"
import IFLogo from "/IFLogo.svg";
import {useState} from "react";
export default function UserList () {
    const [dropdown, setDropdown] = useState(true)
    return (
        <div className={"users-background"}>
            <header>
                <img className={"header-logo"} src={IFLogo} alt=""/>
                <a href="/Card">Cartão institucional</a>
                <div className={"dropdown-container"} onClick={() => setDropdown(!dropdown)}>
                    <div className={dropdown ? "dropdown-content closed" : "dropdown-content open"}>
                        <a href="#">Sair</a>
                    </div>
                </div>
            </header>
            <div className={"users-list"}>
                <h2 className={"table-title"}>Usuários</h2>
                <table>
                    <thead>
                        <th rowSpan={2}>
                            <span>Usuário</span>
                        </th>
                        <th>
                            <span>Curso</span>
                        </th>
                        <th>
                            <span>Ações</span>
                        </th>
                    </thead>
                </table>
            </div>
        </div>
    )
}