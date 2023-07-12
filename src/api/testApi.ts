import axiosClient from "../api/axiosClient";

export const testApi = {
    getTestString: () => {
        return axiosClient.get("/todos/1");
    },
};
