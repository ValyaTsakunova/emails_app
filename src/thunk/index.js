import { login } from "../services/index";
import { loginAdm } from "../action/index";

export const loginAdmin = (data) => (dispatch) => {
    login(data)
    .then((response) => response.json())
    .then((data) => {
        dispatch(loginAdm(data))
        localStorage.setItem("token", data)
    })
    .catch((err) => {
        console.log(err)
    }) 
};
