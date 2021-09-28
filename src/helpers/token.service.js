const TOKEN = "tokenBackoffice";
const PERMISSIONS = "permissions";
const USER = "user";

export default {
    getToken() {
        return window.localStorage.getItem(TOKEN);
    },

    saveToken(token, permissions, user) {
        window.localStorage.setItem(TOKEN, token);
        window.localStorage.setItem(PERMISSIONS, JSON.stringify(permissions));
        window.localStorage.setItem(USER, JSON.stringify(user));
    },

    destroyToken() {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(PERMISSIONS);
        window.localStorage.removeItem(USER);
    },

    getPermissions() {
        return JSON.parse(window.localStorage.getItem(PERMISSIONS));
    },

    getUser() {
        return JSON.parse(window.localStorage.getItem(USER));
    }
};
