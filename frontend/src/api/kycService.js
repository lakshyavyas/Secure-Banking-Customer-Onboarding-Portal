// import kycApi from "./kycApi";

// export const submitKyc = (data) => {
//     return kycApi.post("/kyc/submit", data);
// };

// export const getMyKyc = () => {
//     return kycApi.get("/kyc/me");
// };

import kycApi from "./kycApi";

// export const submitKyc = (kyc) => {
//     return kycApi.post("/kyc/submit", kyc);
// };

export const submitKyc = (kyc, panFile, aadhaarFile) => {

    const formData = new FormData();

    formData.append(
        "kyc",
        new Blob(
            [JSON.stringify(kyc)],
            { type: "application/json" }
        )
    );

    formData.append("panFile", panFile);

    formData.append("aadhaarFile", aadhaarFile);

    return kycApi.post(
        "/kyc/submit",
        formData
    );
};

export const getMyKyc = () => {
    return kycApi.get("/kyc/me");
};

export const viewPan = (userId) => {
    return kycApi.get(
        `/kyc/pan/${userId}`,
        {
            responseType: "blob"
        }
    );
};

export const viewAadhaar = (userId) => {
    return kycApi.get(
        `/kyc/aadhaar/${userId}`,
        {
            responseType: "blob"
        }
    );
};

export const getKycStatusChart = () => {
    return kycApi.get("/kyc/chart/status");
};