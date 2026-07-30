import api from "./api";

export const login = (username, password,captchaToken) => {

    return api.post("/auth/login", {

        username,
        password,
         captchaToken

    });

};

export const registerCustomer = (customer) => {

    return api.post("/auth/register", customer);

};

export const changePassword = (data) => {
    return api.put("/auth/change-password", data);
};