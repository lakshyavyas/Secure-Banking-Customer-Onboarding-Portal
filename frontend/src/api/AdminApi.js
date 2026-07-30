import api from "./api";

export const createEmployee = (employee) => {
    return api.post("/admin/create-employee", employee);
};

export const getEmployees = () => {
    return api.get("/admin/employees");
};

export const enableEmployee = (id) => {
    return api.put(`/admin/employees/${id}/enable`);
};

export const disableEmployee = (id) => {
    return api.put(`/admin/employees/${id}/disable`);
};