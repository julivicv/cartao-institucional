import "../styles/UserForm.css"
import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"

type FormValues = {
    name: string | null;
    email: string | null;
    password: string | null;
    file: File | null | string;
    birthDate: string | null;
    course: string | null;
    courses: Array<{ course: string, id: string }>;
}

export default function UserForm ( { name, email, password, file, birthDate, course, courses }:FormValues ) {
    const userEdit = () => {

    }

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
        file: Yup.mixed()
            .test("filesize", "Arquivo muito grande", (value: any) => {
                console.log(value)
                if (!value.length) return true
                return value[0].size <= 2000000
            }),
        birthdate: Yup.date()
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
        name: name,
        email: email,
        password: password,
        file: file,
        birthDate: birthDate,
        course: course,
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className={"name-label"}>
                <input type={"text"} className={`name ${!errors.name ? '' : 'name-invalid'}`}
                       {...register("name")}
                       name={'name'}
                       onChange={handleInputChange}
                />
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
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
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
                <span className={`pass-placeholder  ${formData.password != "" ? 'filled' : ''}`}>Senha</span>
            </label>
            <input type="date"
                   name={'birthDate'}
                   onChange={handleInputChange}/>
            <input type="file"
                   name={"file"}
                   onChange={handleInputChange}/>
            <select name="course"
                    id="cursos"
                    onChange={handleInputChange}>
                {courseOptions}
            </select>
            <button className={"form-button"}
                    type={"submit"}>
                Adicionar
            </button>
        </form>
    );
}