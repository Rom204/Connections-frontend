import axios from "axios";
import config from "../utils/config";

export default class AuthServices {


    // methods

    public async register(data: any): Promise<object> {
        const result = await axios.create({
            baseURL: `${config.liveBackendURL}/auth`
        })
            .post("/api/register", {
                username: data.username,
                password: data.password,
                email: data.email
            })

        return result
    }

    //  TODO: change type: any 
    public async checkLogin(data: any): Promise<object> {
        let userData = {};

        await axios.create({
            baseURL: `${config.liveBackendURL}/auth`
        })
            .post("/check-login", {
                username: data.username,
                password: data.password
            })
            .then(response => {
                // userData = response;
                const token: string = response.headers.authorization?.split(" ")[1];
                localStorage.setItem("JWT", token);
            })
        return userData
    }


    public async checkJWT(token: string): Promise<object> {
        let isJWTValid = {};
        axios.create({
            baseURL: `${config.liveBackendURL}/auth`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .post("/check-jwt")
            .then(response => {
                isJWTValid = response;
            })
        return isJWTValid
    }
}