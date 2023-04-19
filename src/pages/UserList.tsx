import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import aaa from "../assets/aaa.jpg";
import UserRow from "../components/UserRow";
import "../styles/UserForm.css";
import "../styles/UserList.css";

import { useAuthHeader, useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Header } from "../components/Header";
import axios from "axios";

type Values = {
  courses: Array<{ course: string; id: string }>;
};

type FormValues = {
  name: string | null;
  email: string | null;
  password: string | null;
  file: File | null | string;
  birthDate: string | null;
  course: string | null;
  courses: Array<{ course: string; id: string }>;
};

type RowFunction = {
  id: string;
};
export interface props {
  name: string;
  birth: string;
  group: string;
  href: string;
  link: string;
  lunch: boolean;
}

export default function UserList({
  name,
  email,
  password,
  file,
  birthDate,
  course,
  courses,
}: FormValues) {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(true);

  const [initiaData, setInitialData] = useState([]);
  const [isAlter, setIsAlter] = useState(false);
  const [data, setData] = useState<props>({
    name: "",
    birth: "",
    link: "",
    group: "",
    href: "",
    lunch: false,
  });
  const [coursesValues, setCoursesValues] = useState([]);
  console.log(coursesValues);

  useEffect(() => {
    if (auth() === ("user" as any)) {
      window.location.href = "/Card";
    }

    axios
      .get("http://localhost:3000/api/v1/course/list", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => {
        setCoursesValues(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/api/v1/users", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((response) => {
        setData({
          name: response.data.message.returnData.name,
          birth: response.data.message.returnData.birthDate,
          link: response.data.message.returnData.linkAuthorized,
          group: response.data.message.returnData.course.sigla,
          href: response.data.message.returnData.photoFile,
          lunch: response.data.message.returnData.lunch,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/api/v1/users/list", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => {
        setInitialData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (isAlter) {
      setIsAlter(false);
    }
    setLoading(false);
  }, [isAlter]);

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(!modal);

  const allCourses = courses.map(({ course }) => {
    return course;
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: Yup.string().required("Campo obrigatório"),
    birthDate: Yup.string().required("Campo obrigatório"),
    class: Yup.string().required("Selecione um curso").oneOf(allCourses),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {};

  function createUser() {
    axios
      .post("http://localhost:3000/api/v1/users/create", formData, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => {
        console.log(res);
        setIsAlter(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(false);
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
    birthDate: "",
    course: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const courseOptions = coursesValues.map(({ year, name, sigla }, key) =>
    formData.course == sigla ? (
      <option value={sigla} key={key} selected>
        {sigla + " " + year}
      </option>
    ) : (
      <option value={sigla} key={key}>
        {sigla + " " + year}
      </option>
    )
  );

  async function editUser({ id }: RowFunction) {
    //axios.post()
    setFormData({
      name: "nome1",
      email: "email1@email",
      password: "senha1",
      file: "",
      birthDate: "2004-02-12",
      course: "T2",
    });
    setModal(!modal);
  }

  return (
    <>
      {loading ? (
        <div className={"loading"}>
          <p>Carregando...</p>
        </div>
      ) : (
        <div className={"users-background"}>
          <Header href={data.href} />
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
                  {initiaData.map((e: any) => (
                    <UserRow alter={setIsAlter} edit={editUser} {...e} />
                  ))}
                </div>
              </div>
            </div>
            <button type={"button"} className={"add-user"} onClick={openModal}>
              <Plus weight={"bold"} size={32} className={"plus"} />
            </button>
          </div>
          <dialog open className={modal ? "" : "hidden"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className={"name-label"} onChange={handleInputChange}>
                <input
                  type={"text"}
                  className={`name ${!errors.name ? "" : "name-invalid"}`}
                  {...register("name")}
                  name={"name"}
                  value={formData.name}
                />
                <div className={"invalid-feedback"}>{errors.name?.message}</div>
                <span
                  className={`name-placeholder  ${
                    formData.name != "" ? "filled" : ""
                  }`}
                >
                  Nome
                </span>
              </label>
              <label className={"mail-label"} onChange={handleInputChange}>
                <input
                  type={"text"}
                  className={`mail ${!errors.name ? "" : "mail-invalid"}`}
                  {...register("email")}
                  name={"email"}
                  value={formData.email}
                />
                <div className={"invalid-feedback"}>
                  {errors.email?.message}
                </div>
                <span
                  className={`mail-placeholder ${
                    formData.email != "" ? "filled" : ""
                  }`}
                >
                  E-mail
                </span>
              </label>
              <label className={"pass-label"} onChange={handleInputChange}>
                <input
                  type={"text"}
                  className={`pass ${!errors.name ? "" : "mail-invalid"}`}
                  {...register("password")}
                  name={"password"}
                  value={formData.password}
                />
                <div className={"invalid-feedback"}>
                  {errors.password?.message}
                </div>
                <span
                  className={`pass-placeholder  ${
                    formData.password != "" ? "filled" : ""
                  }`}
                >
                  Senha
                </span>
              </label>
              <label onChange={handleInputChange}>
                <input
                  type="date"
                  {...register("birthDate")}
                  name={"birthDate"}
                  value={formData.birthDate}
                />
                <div className={"invalid-feedback"}>
                  {errors.birthDate?.message}
                </div>
              </label>
              <input type="file" name={"file"} onChange={handleInputChange} />
              <select
                {...register("course")}
                name="course"
                id="cursos"
                onChange={handleInputChange}
              >
                {courseOptions}
              </select>
              <div className={"invalid-feedback"}>{errors.course?.message}</div>
              <button
                onClick={createUser}
                className={"form-button"}
                type={"submit"}
              >
                Adicionar
              </button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
}
