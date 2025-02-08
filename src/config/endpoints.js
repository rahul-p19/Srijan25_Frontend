import { env } from "./config"

export const uri = {
    auth: {
        GOOGLE_LOGIN: env.API_SERVER + "/login/google",
        GET_USER_SESSION: env.API_SERVER + "/oauth/user",
        CREDENTIALS_LOGIN: env.API_SERVER + "/login",
        REGISTER: env.API_SERVER + "/register",
        VERIFYEMAIL: env.API_SERVER + "/VerifyEmail",
        RESET_PASSWORD: env.API_SERVER + "/password/reset",
        FORGOT_PASSWORD: env.API_SERVER + "/forgotPassword",
    },
    resources: {
        USERS: env.API_SERVER + "/users/"
    },
    services: {
        OAUTH2_GOOGLE_STATUS: env.API_SERVER + "/login/google/status",
    }
}