import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"

type FormValues = {
    name: string;
    email: string;
    password: string;
    file: File | null;
    birthDate: string;
    class: string;
}
export default function UserForm () {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Campo obrigatório'),
        email: Yup.string()
            .required('Campo obrigatório')
            .email('E-mail inválido'),
        password: Yup.string()
            .required('Campo obrigatório'),
        file: Yup.mixed().test("filesize", "Arquivo muito grande", (value: any) => {
            console.log(value)
            if(!value.length) return true
            return value[0].size <= 2000000
        })

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
            <label className={"mail-label"}>
                <input type={"text"} className={`mail ${!errors.email ? '' : 'mail-invalid'}`}
                       {...register("email")}
                />
                <div className={"invalid-feedback"}>{errors.email?.message}</div>
                <span>E-mail</span>
            </label>
            <button className={"form-button"} type={"submit"}>
                Logar-se
            </button>
        </form>
    )
}