import axios from "axios";

const BASE_URL = "https://machine-learning-flask-production.up.railway.app/regression";

export const regression = async (type,data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${type}`, data);
        return response;
    } catch (error) {
        return error.response
    }
}
