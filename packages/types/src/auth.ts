export type SIGNIN_REQUEST = {
    email: string,
    password: string,
}

export type SIGNIN_RESPONSE = {
    message: string,
    result?: {
        id?: number,
        name: string,
        email: string,
        mobile: string,
        role: string,
    },
}

export type LOGOUT_REQUEST = void
export type LOGOUT_RESPONSE = { message: string }
