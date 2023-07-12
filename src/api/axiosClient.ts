import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ENDPOINT } from "../api/endpoint";
import queryString from "query-string";



const axiosClient = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: {
        encode: (params: any) => queryString.stringify(params),
    },
});


axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;