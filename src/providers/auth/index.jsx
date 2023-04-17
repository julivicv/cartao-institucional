import {useEffect} from "react";
import {createContext, useContext, useReducer} from "react";


const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const Context = createContext(null)

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
}

const set = (type, payload) => ({type, payload})

export const login = (user, token) => set(LOGIN, {user, token})
export const logout = () => set(LOGOUT)


const reducer = (state, {type, payload}) => {
    switch (type) {
        case LOGIN: {
            return {...state, ...payload, isAuthenticated: true}
        }

        case LOGOUT: {
            return initialState
        }

        default :
            return state
    }
}


export const useAuth = () => {
    const context = useContext(Context)
    if (!context) throw new Error("Você só pode usar useAuth dentro de um AuthProvider")

    return context
}

export const AuthProvider = ({children}) => {
    const localState = JSON.parse(localStorage.getItem('auth'))
    const [state, dispatch] = useReducer(reducer, localState || initialState)

    console.log(state)


    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(state))
    }, [state])

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}