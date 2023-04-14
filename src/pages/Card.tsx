import "../styles/Card.css";
import {QRCodeSVG} from "qrcode.react";
import Lunch from "../components/Lunch";
import IFLogo from "/IFLogo.svg";
import IFRSLogo from "../assets/IFRSLogo.png";
import aaa from "../assets/aaa.jpg";

export interface props {
    name: string;
    birth: string;
    group: string;
    href: string;
    link: string;
}

export default function Card({name, birth, link, group, href}: props) {
    return (
        <div className={"card-body"}>
            <div className="logo-container">
                <img src={IFRSLogo} alt={"logo do ifrs"} className={"logo"}/>
            </div>
            <div className={"card-content"}>
                <h1>{group}</h1>
                <div className={"user-content"}>
                    <img src={aaa} className={"avatar"}/>
                    <span className={"student-name"}>{name}</span>
                    <span className={"birth-date"}>{birth}</span>
                </div>
                <Lunch date={"01/01/23"} isAuthorized={true}/>
            </div>
            <div className={"vertical-line"}></div>
            <div className={"qrCode-container"}>
                <QRCodeSVG className={"qrCode"} value={link}
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
        </div>
    )
}