import kycApi from "./kycApi";

export const getPendingKycs = () => {
    return kycApi.get("/kyc/pending");
};

export const approveKyc = (kycId) => {
    return kycApi.put(`/kyc/${kycId}/approve`);
};

export const rejectKyc = (kycId, remarks) => {
    return kycApi.put(`/kyc/${kycId}/reject`, {
        remarks,
    });
};