import { Pencil, Trash } from "@phosphor-icons/react";

export interface props {
    id: string;
    name: string;
    img: string;
    group: string
}
export default function UserRow ({id, name, img, group}:props) {
    return (
        <div className={"user-row"}>
            <div className={"user-main-content"}>
                <img src={img} alt={`Imagem do usuário ${name}`}/>
                <div className={"user-name"}>{name}</div>
            </div>
            <div className={"user-class"}>
                {group}
            </div>
            <div className={"user-actions"}>
                <button className={"user-edit"}>
                    <Pencil weight={"duotone"} color={"#fff"} size={20} />
                </button>
                <button className={"user-delete"}>
                    <Trash weight={"duotone"} color={"#fff"} size={20} />
                </button>
            </div>
        </div>
    )
}