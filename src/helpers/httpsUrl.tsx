import axios from "axios";

/**
 * @param route - route in a server
 */
export function httpUrl(route: string) {
    return axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL + route,
        headers: {
            'Authorization': localStorage.getItem("auth")
        }
    })
}