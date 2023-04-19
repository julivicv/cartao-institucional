import { redirect, useNavigate } from "react-router-dom";
import IFLogo from "/IFLogo.svg";
import { useState } from "react";
import { useSignOut } from "react-auth-kit";

export function Header(props: { href: string }) {
  const signOut = useSignOut();
  const [dropdown, setDropdown] = useState(true);
  return (
    <header className="headerNew">
      <img className={"header-logo"} src={IFLogo} alt="" />
      <a href="/Card">Cartão institucional</a>
      <a href="/users">Lista de Usuarios</a>
      <div
        className={"dropdown-container"}
        onClick={() => setDropdown(!dropdown)}
      >
        <img src={props.href} alt="" />
        <div
          className={
            dropdown ? "dropdown-content closed" : "dropdown-content open"
          }
        >
          <button onClick={() => signOut()}>Sair</button>
        </div>
      </div>
    </header>
  );
}
