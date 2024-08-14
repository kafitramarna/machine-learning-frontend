import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080/regression";

export const regression = async (type,data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${type}`, data);
        return response;
    } catch (error) {
        return error.response
    }
}
