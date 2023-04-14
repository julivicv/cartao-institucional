import "../styles/UserList.css"
import IFLogo from "/IFLogo.svg";
import aaa from "../assets/aaa.jpg"
import {useState} from "react";
import UserRow from "../components/UserRow";
import UserForm from "../components/UserForm";
import {Plus} from "@phosphor-icons/react";

type Values = {
    courses: Array<{ course: string, id: string }>;
}
export default function UserList ( { courses }:Values ) {
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
                <div className={"list-content"}>
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
                    <div className={"list"}>
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                        <UserRow id={"2"} name={"Júlio"} img={aaa} group={"3°INFO"} />
                    </div>
                </div>
                </div>
                <button
                    type={"button"}
                    className={"add-user"}>
                    <Plus weight={"bold"} size={32} className={"plus"}/>
                </button>
            </div>
            <dialog>
                <UserForm name={''} email={''} password={''} file={''} birthDate={''} course={''} courses={courses} />
            </dialog>
        </div>
    )
}