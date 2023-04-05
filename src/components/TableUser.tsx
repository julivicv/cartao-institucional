import { Pencil, Trash } from "@phosphor-icons/react";

export interface props {
    id: string;
    name: string;
    img: string;
    group: string
}
export default function TableUser ({id, name, img, group}:props) {
    return (
        <tr className={"user-line"}>
            <td className={"user-main-content"}>
                <img src={img} alt={`Imagem do usuário ${name}`}/>
                name
            </td>
            <td className={"user-class"}>
                {group}
            </td>
            <td className={"user-actions"}>
                <button className={"user-edit"}>
                    <Pencil weight={"duotone"} />
                </button>
                <button className={"user-delete"}>
                    <Trash weight={"duotone"} />
                </button>
            </td>
        </tr>
    )
}