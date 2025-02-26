import axios from "axios"
import { CONST } from "../../../config"


export const registerUser = async (credentials) => {

    if (!credentials.name) {
        throw Error("Your full name is required")
    }
    if (!credentials.email) {
        throw Error("Your email address is required")
    }
    if (!credentials.phone) {
        throw Error("Your phone number is required")
    }
    if (!credentials.password) {
        throw Error("Password require at least 8 characters")
    }
    if (credentials.password != credentials.confirmPassword) {
        throw Error("Password confirmation is not the same")
    }

    delete credentials.passwordConfirmation

    return axios({
        method: "post",
        url: CONST.uri.auth.REGISTER,
        withCredentials: true,
        data: credentials,
        headers: { "Content-Type": "application/json" },
    })
}

export const verifyEmail = async (email, otp) => {
    return axios({
        method: "post",
        url: CONST.uri.auth.VERIFYEMAIL,
        withCredentials: true,
        data: {
            email: email,
            otp: otp
        },
        headers: {"Content-Type": "application/json"}
    })
}

export const startWithCredentials = async (credentials) => {
    if (!credentials.email) {
        throw "Enter a valid email"
    }
    if (!credentials.password) {
        throw "Enter a valid password"
    }

    return axios({
        method: "post",
        url: CONST.uri.auth.CREDENTIALS_LOGIN,
        withCredentials: true,
        data: credentials,
        headers: { "Content-Type": "application/json" },
    })
}

export const resetPassword = async (credentials, token) => {
    if (!credentials.password) {
        throw Error("Password require at least 8 characters")
    }
    if (credentials.password != credentials.confirmPassword) {
        throw Error("Password confirmation is not the same")
    }

    return axios({
        method: "post",
        url: `${CONST.uri.auth.RESET_PASSWORD}/${token}`,
        withCredentials: true,
        data: credentials,
        headers: { "Content-Type": "application/json" },
    })
}

export const forgotPassword = async (email) => {
    return axios({
        method: "post",
        url: CONST.uri.auth.FORGOT_PASSWORD,
        withCredentials: true,
        data: { email },
        headers: { "Content-Type": "application/json" },
    })
}

export const logoutCall = async () => {
    return axios({
        method: "post",
        url: CONST.uri.auth.LOGOUT,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });
}

export const resendOTP = async (email) => {
    return axios({
        method: "post",
        url: CONST.uri.auth.RESEND_OTP,
        withCredentials: true,
        data: { email },
        headers: { "Content-Type": "application/json" },
    })
}

export const addReferral = async(code) => {
    return axios({
        method: "post",
        url: CONST.uri.auth.ADD_REFERRAL,
        withCredentials: true,
        data: {code},
        headers: { "Content-Type": "application/json" },
    })
}

export const startWithOAuth2 = (providerUrl) => {

    let timer = null
    const authWindow = window.open(providerUrl, "_blank", "width=500,height=600");

    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            if (authWindow && authWindow.closed) {
                fetchUser().then((response) => {
                    resolve(response)
                }).catch((error) => {
                    console.error(error)
                    reject(error)
                })
                timer && clearInterval(timer)
            }
        }, 500)
    })

    function fetchUser () {
        return axios.get(CONST.uri.auth.GET_USER_SESSION, { withCredentials: true })
    }
}