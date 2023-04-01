import "../styles/Login.css"
import {useState} from "react";
import {useForm, Resolver} from "react-hook-form";
import axios from "axios";

type FormValues = {
    firstName: string;
    lastName: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.Email ? values : {},
        errors: !values.Email
            ? {
                firstName: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => console.log(data));

    /*axios({
        method: "post",
        url: "////",
        data: {
            name: email
        }
    })*/

    return (
        <div className={"container"}>
            <div className={"login-container"}>
                <div className={"form-container"}>
                    <h1 className={"login-title"}>Login</h1>
                    <form action={onSubmit}>
                        <label className={"mail-label"}>
                            <input type={"text"} className={"mail"}
                                   {...register("Email", {required: true, pattern: /^\S+@\S+$/i})}
                                   onChange={(event) => setEmail(event.target.value)}
                                   value={email}

                            />
                            <span className={email != "" ? "mail-text filled" : "mail-text"}>E-mail</span>
                        </label>
                        <label className={"pass-label"}>
                            <input type={"password"} className={"pass"}
                                   {...register("Password", {required: true, minLength: 6, maxLength: 70})}
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