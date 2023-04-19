import { Pencil, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { set } from "react-hook-form";

export interface props {
  id: string;
  name: string;
  photoFile: string;
  Courses: {
    name: string;
    sigla: string;
    year: number;
  };
  delete: any;
  edit: any;
  alter: any;
}

export default function UserRow({
  alter,
  id,
  name,
  photoFile,
  Courses,
}: props) {
  const authHeader = useAuthHeader();

  async function deleteUser(id: string) {
    await axios
      .delete(`http://localhost:3000/api/v1/users/del/${id}`, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    alter(true);
  }

  return (
    <div className={"user-row"}>
      <div className={"user-main-content"}>
        <img src={photoFile} alt={`Imagem do usuário ${name}`} />
        <div className={"user-name"}>{name}</div>
      </div>
      <div className={"user-class"}>{Courses.sigla}</div>
      <div className={"user-actions"}>
        <button className={"user-edit"}>
          <Pencil weight={"duotone"} color={"#fff"} size={20} />
        </button>
        <button onClick={() => deleteUser(id)} className={"user-delete"}>
          <Trash weight={"duotone"} color={"#fff"} size={20} />
        </button>
      </div>
    </div>
  );
}
