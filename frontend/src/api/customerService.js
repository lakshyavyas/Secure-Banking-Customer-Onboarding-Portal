import customerApi from "./customerApi";

export const createProfile = (profile) => {
    return customerApi.post("/profile", profile);
};

export const getMyProfile = () => {
    return customerApi.get("/profile/me");
};

export const updateMyProfile = (profile) => {
    return customerApi.put("/profile/me", profile);
};

export const getGenderChart = () => {
    return customerApi.get("/profile/chart/gender");
};