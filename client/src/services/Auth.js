import store from "../redux/Store";
import { userLogin, userRegister } from "../redux/feature/auth/AuthAction";


export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {

        if (!role || !email || !password) {
            return alert("Please Provide all field")
        }
        //console.log("login", e, email, password, role)
        store.dispatch(userLogin({ email, password, role }))
    } catch (err) {
        console.log(err)
    }
}

export const handleRegister = (e, name, role, email, password, organizationName, hospitalName, webside, address, phone) => {
    e.preventDefault();
    try {
        //   console.log("Register", e, name, role, email, password, organizationName, hospitalName, webside, address, phone)
        store.dispatch(userRegister({ name, role, email, password, organizationName, hospitalName, webside, address, phone }))
    } catch (err) {
        console.log(err)
    }
}