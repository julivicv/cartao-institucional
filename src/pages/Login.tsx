import "../styles/Login.css"
import {useState} from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    axios({
        method: "post",
        url: "////",
        data: {
            name: email
        }
    })

    return (
        <div className={"container"}>
            <div className={"login-container"}>
                <div className={"form-container"}>
                    <h1 className={"login-title"}>Login</h1>
                    <form action="">
                        <label className={"mail-label"}>
                            <input type={"text"} className={"mail"}
                                   onChange={(event) => setEmail(event.target.value)}
                                   value={email}
                            />
                            <span className={email != "" ? "mail-text filled" : "mail-text"}>E-mail</span>
                        </label>
                        <label className={"pass-label"}>
                            <input type={"password"} className={"pass"}
                                   onChange={(event) => setPassword(event.target.value)}
                                   value={password}
                            />
                            <span className={password != "" ? "pass-text filled" : "pass-text"}>Senha</span>
                        </label>
                        <button className={"form-button"} type={"submit"}>
                            Logar-se
                        </button>
                    </form>
                </div>
            </div>
            <div className={"img-container"}>

            </div>
        </div>
    )
}