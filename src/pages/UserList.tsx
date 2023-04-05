import "../styles/UserList.css"
import IFLogo from "/IFLogo.svg";
import aaa from "../assets/aaa.jpg"
import {useState} from "react";
import TableUser from "../components/TableUser";
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
                        <tr>
                            <th>
                                <span>Usuário</span>
                            </th>
                            <th>
                                <span>Curso</span>
                            </th>
                            <th>
                                <span>Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableUser id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />

                    </tbody>
                </table>
            </div>
        </div>
    )
}