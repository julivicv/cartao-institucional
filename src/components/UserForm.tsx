import "../styles/UserForm.css"
import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"

type FormValues = {
    name: string | null;
    email: string | null;
    password: string | null;
    file: File | null | null;
    birthDate: string | null;
    course: string | null;
    courses: Array<{ course: string, id: string }>;
}

export default function UserForm ( { courses }:FormValues ) {
    const allCourses = courses.map(({course}) => {
        return course
    })
    const productOptions = courses.map(({course, id}, key) => (
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className={"name-label"}>
                <input type={"text"} className={`name ${!errors.name ? '' : 'name-invalid'}`}
                       {...register("name")}
                />
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
                <span className={"name-placeholder"}>Nome</span>
            </label>
            <label className={"mail-label"}>
                <input type={"text"} className={`mail ${!errors.name ? '' : 'mail-invalid'}`}
                       {...register("email")}
                />
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
                <span className={"mail-placeholder"}>E-mail</span>
            </label>
            <label className={"pass-label"}>
                <input type={"text"} className={`pass ${!errors.name ? '' : 'mail-invalid'}`}
                       {...register("password")}
                />
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
                <span className={"pass-placeholder"}>Senha</span>
            </label>
            <input type="date"/>
            <input type="file"/>
            <select name="cursos" id="cursos">
                {productOptions}
            </select>
            <button className={"form-button"} type={"submit"}>
                Adicionar
            </button>
        </form>
    )
}