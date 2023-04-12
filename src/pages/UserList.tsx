import "../styles/UserList.css"
import IFLogo from "/IFLogo.svg";
import aaa from "../assets/aaa.jpg"
import {useState} from "react";
import UserRow from "../components/UserRow";
import UserForm from "../components/UserForm";
export default function UserList () {
    const [dropdown, setDropdown] = useState(true)
    const [modal, setModal] = useState(true)
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
                <div className={"grid"}>
                    <div className={"user-header"}>
                            <div>
                                <span>Usuário</span>
                            </div>
                            <div>
                                <span>Curso</span>
                            </div>
                            <div>
                                <span>Ações</span>
                            </div>
                    </div>
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                </div>
            </div>
            <dialog open>
                <UserForm />
            </dialog>
        </div>
    )
}