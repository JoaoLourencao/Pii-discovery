const USER = "user";

export default {
    getUser() {
        if(window.localStorage.getItem(USER) != 'undefined')
            return JSON.parse(window.localStorage.getItem(USER));
        else
            window.localStorage.removeItem(USER);
    },

    saveUser(user) {
        window.localStorage.setItem(USER, JSON.stringify(user.aluno));
    },

    destroyUser() {
        window.localStorage.removeItem(USER);
    }
};