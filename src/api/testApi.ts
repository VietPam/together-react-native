import axiosClient from "../";
import { APIPaths } from "./path";

export const testApi = {
    getTestString: () => {
        return axiosClient.get("/todos/1");
    },
};
