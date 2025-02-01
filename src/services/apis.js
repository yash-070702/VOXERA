const BASE_URL = process.env.REACT_APP_BASE_URL
//AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    FETCH_USER_API:BASE_URL + "/user/get-users",
    FETCH_FRIENDS_API:BASE_URL+"/user/get-friends",
    FETCH_FRIEND_REQUESTS_API:BASE_URL+"/user/get-friend-requests",
    FETCH_SEND_FREIND_REQUESTS_API:BASE_URL+"/user/get-send-requests"
//     RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
//     RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
   }