import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import "../styles/Login.css";
import { useSignIn } from "react-auth-kit";
import { redirect, useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shownPassword, setShownPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Digite seu e-mail").email("E-mail inválido"),
    password: Yup.string().required("Digite sua senha"),
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const result = await axios
      .post("http://localhost:3000/api/v1/users/login", data)
      .then((response) => {
        signIn({
          token: response.data.message.token,
          expiresIn: 360,
          tokenType: "Bearer",
          authState: response.data.message.data.isAdmin
            ? ("admin" as any)
            : ("user" as any),
        });
        navigate("/card");
      })
      .catch((error) => {
        console.log(error);

        alert(error.response.data.message);
      });
  };

  return (
    <div className={"container"}>
      <div className={"login-container"}>
        <div className={"form-container"}>
          <h1 className={"login-title"}>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className={"mail-label"}>
              <input
                type={"text"}
                className={`mail ${!errors.email ? "" : "mail-invalid"}`}
                {...register("email")}
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              <div className={"invalid-feedback"}>{errors.email?.message}</div>
              <span className={email != "" ? "mail-text filled" : "mail-text"}>
                E-mail
              </span>
            </label>
            <label className={"pass-label"}>
              <input
                type={shownPassword ? "text" : "password"}
                className={`pass ${!errors.password ? "" : "pass-invalid"} ${
                  shownPassword ? "shown" : ""
                }}`}
                {...register("password")}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />

              <div className={`invalid-feedback`}>
                {errors.password?.message}
              </div>
              <span
                className={password != "" ? "pass-text filled" : "pass-text"}
              >
                Senha
              </span>
            </label>
            <button
              onClick={(event) => setShownPassword(!shownPassword)}
              type={"button"}
              className={"eye-button"}
            >
              {shownPassword ? (
                <Eye className={"eye"} size={32} weight="duotone" />
              ) : (
                <EyeClosed className={"eye"} size={32} weight="duotone" />
              )}
            </button>
            <button className={"form-button"} type={"submit"}>
              Logar-se
            </button>
          </form>
        </div>
      </div>
      <div className={"img-container"}></div>
    </div>
  );
}
