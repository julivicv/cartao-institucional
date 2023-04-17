import "../styles/UserList.css"
import "../styles/UserForm.css"
import IFLogo from "/IFLogo.svg";
import aaa from "../assets/aaa.jpg"
import {useState} from "react";
import UserRow from "../components/UserRow";
import {Plus} from "@phosphor-icons/react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type Values = {
    courses: Array<{ course: string, id: string }>;
}

type FormValues = {
    name: string | null;
    email: string | null;
    password: string | null;
    file: File | null | string;
    birthDate: string | null;
    course: string | null;
    courses: Array<{ course: string, id: string }>;
}

const userData = [
    {id: "id", name: "Júlio", img: aaa, group: "3°INFO"},
    {id: "id", name: "Júlio", img: aaa, group: "3°INFO"},
    {id: "id", name: "Júlio", img: aaa, group: "3°INFO"},
    {id: "id", name: "Júlio", img: aaa, group: "3°INFO"},
]

export default function UserList ( { name, email, password, file, birthDate, course, courses }:FormValues ) {
    const [dropdown, setDropdown] = useState(true)
    const [modal, setModal] = useState(false)

    const openModal = () => (
        setModal(!modal)
    )

    const allCourses = courses.map(({course}) => {
        return course
    })

    const courseOptions = courses.map(({course, id}, key) => (
        <option value={id} key={key}>
            {course}
        </option>
    ));

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Campo obrigatório'),
        email: Yup.string()
            .required('Campo obrigatório')
            .email('E-mail inválido'),
        password: Yup.string()
            .required('Campo obrigatório'),
        birthDate: Yup.string()
            .required('Campo obrigatório'),
        class: Yup.string()
            .required('Selecione um curso')
            .oneOf(allCourses)
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: FormValues) => {
        console.log(JSON.stringify(data, null, 2));
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        file: '',
        birthDate: '',
        course: '',
    })

    const handleInputChange = (event:any) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData)
    }

    return (
        <div className={"users-background"}>
            <header>
                <img className={"header-logo"} src={IFLogo} alt=""/>
                <a href="/Card">Cartão institucional</a>
                <div className={"dropdown-container"} onClick={() => setDropdown(!dropdown)}>
                    <div className={dropdown ? "dropdown-content closed" : "dropdown-content open"}>
                        <a href="#">Sair</a>
                    </div>
                </div>
            </header>
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
                        {userData.map((e) => (
                            <UserRow {...e} />
                        ))}
                    </div>
                </div>
                </div>
                <button
                    type={"button"}
                    className={"add-user"}
                    onClick={openModal}>
                    <Plus weight={"bold"} size={32} className={"plus"}/>
                </button>
            </div>
            <dialog open className={modal ? '' : 'hidden'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={"name-label"}>
                        <input type={"text"} className={`name ${!errors.name ? '' : 'name-invalid'}`}
                               {...register("name")}
                               name={'name'}
                               onChange={handleInputChange}
                        />
                        <div className={"invalid-feedback"}>{errors.name?.message}</div>
                        <span className={`name-placeholder  ${formData.name != "" ? 'filled' : ''}`}>Nome</span>
                    </label>
                    <label className={"mail-label"}>
                        <input type={"text"} className={`mail ${!errors.name ? '' : 'mail-invalid'}`}
                               {...register("email")}
                               name={'email'}
                               onChange={handleInputChange}
                        />
                        <div className={"invalid-feedback"}>{errors.email?.message}</div>
                        <span className={`mail-placeholder ${formData.email != "" ? 'filled' : ''}`}>E-mail</span>
                    </label>
                    <label className={"pass-label"}>
                        <input type={"text"} className={`pass ${!errors.name ? '' : 'mail-invalid'}`}
                               {...register("password")}
                               name={'password'}
                               onChange={handleInputChange}
                        />
                        <div className={"invalid-feedback"}>{errors.password?.message}</div>
                        <span className={`pass-placeholder  ${formData.password != "" ? 'filled' : ''}`}>Senha</span>
                    </label>
                    <input type="date"
                           {...register("birthDate")}
                           name={'birthDate'}
                           onChange={handleInputChange}/>
                    <div className={"invalid-feedback"}>{errors.birthDate?.message}</div>
                    <input type="file"
                           name={"file"}
                           onChange={handleInputChange}/>
                    <select {...register("course")}
                            name="course"
                            id="cursos"
                            onChange={handleInputChange}>
                        {courseOptions}
                    </select>
                    <div className={"invalid-feedback"}>{errors.course?.message}</div>
                    <button className={"form-button"}
                            type={"submit"}>
                        Adicionar
                    </button>
                </form>
            </dialog>
        </div>
    )
}