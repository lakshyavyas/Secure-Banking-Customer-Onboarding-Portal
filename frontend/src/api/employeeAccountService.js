import accountApi from "./accountApi";

export const getPendingAccounts = () =>
    accountApi.get("/accounts/pending");

export const approveAccount = (accountId) =>
    accountApi.put(`/accounts/${accountId}/approve`);

export const rejectAccount = (accountId) =>
    accountApi.put(`/accounts/${accountId}/reject`);
export const getAccountTypeChart = () => {
    return accountApi.get("/accounts/chart/account-types");
};