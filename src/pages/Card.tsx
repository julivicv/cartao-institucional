import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import IFRSLogo from "../assets/IFRSLogo.png";
import Lunch from "../components/Lunch";
import "../styles/Card.css";
import IFLogo from "/IFLogo.svg";
import { Header } from "../components/Header";
import Login from "./Login";
  export interface props {
    id: string;
    name: string;
    birth: string;
    group: string;
    href: string;
    link: string;
    lunch: boolean;
  }

export default function Card() {
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<props>({
    id: "",
    name: "",
    birth: "",
    link: "",
    group: "",
    href: "",
    lunch: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/list", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((response) => {
        console.log("response:", response.data.message.returnData);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={"card-body"}>
        {loading ? (
          <div className={"loading"}>
            <p>Carregando...</p>
          </div>
        ) : (
          <>
            <div className="logo-container">
              <img src={IFRSLogo} alt={"logo do ifrs"} className={"logo"} />
            </div>
            <div className={"card-content"}>
              <h1>{data.group}</h1>
              <div className={"user-content"}>
                <img src={data.href} className={"avatar"} />
                <span className={"student-name"}>{data.name}</span>
                <span className={"birth-date"}>{data.birth}</span>
              </div>
              <Lunch date={"01/01/23"} isAuthorized={data.lunch} />
            </div>
            <div className={"vertical-line"}></div>
            <div className={"qrCode-container"}>
              <QRCodeSVG
                className={"qrCode"}
                value={`/user/${data.id}`}
                imageSettings={{
                  src: IFLogo,
                  x: undefined,
                  y: undefined,
                  height: 35,
                  width: 25,
                  excavate: true,
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
