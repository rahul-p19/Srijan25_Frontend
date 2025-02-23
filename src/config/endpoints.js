import { env } from "./config"

export const uri = {
    auth: {
        GOOGLE_LOGIN: env.API_SERVER + "/login/google",
        GET_USER_SESSION: env.API_SERVER + "/oauth/user",
        CREDENTIALS_LOGIN: env.API_SERVER + "/login",
        REGISTER: env.API_SERVER + "/register",
        VERIFYEMAIL: env.API_SERVER + "/EmailVerify",
        RESET_PASSWORD: env.API_SERVER + "/password/reset",
        FORGOT_PASSWORD: env.API_SERVER + "/forgotPassword",
        RESEND_OTP: env.API_SERVER + "/resendOtp",
        LOGOUT: env.API_SERVER + "/logout",
    },
    resources: {
        USERS: env.API_SERVER + "/users/"
    },
    services: {
        OAUTH2_GOOGLE_STATUS: env.API_SERVER + "/login/google/status",
    }
}