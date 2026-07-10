import api from "./api";

export const SignupApi = (data) => {
    return api.post("/auth/signup", data);
};

export const LoginApi = (data) => {
    return api.post("/auth/login", data);
};

export const AdminLoginApi = (data) => {
    return api.post("/admin/login", data);
};

export const ForgotPasswordApi = (email) => {
    return api.post("/auth/forgot-password", {
        email,
    });
};

export const VerifyEmailApi = (token) => {
  return api.get(`/auth/verify-email/${token}`);
};

export const ResetPasswordApi = (token, data) => {
    return api.post(`/auth/reset-password/${token}`, data);
};