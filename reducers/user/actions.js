export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const authenticateUser = (user) => {
    return {
        type: AUTHENTICATE_USER,
        load: user
    }
};