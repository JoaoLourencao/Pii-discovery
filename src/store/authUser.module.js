import UserService from '@/helpers/user.service'
import { LOGIN_USER, LOGOUT_USER } from './actions.type'
import { SET_AUTH_USER, SET_USER, SET_LOGOUT_USER } from './mutations.type'
import { API } from '@/helpers/api.service'

export const state = {
    user: UserService.getUser(),
    isAuthenticated: !!UserService.getUser()
}

export const getters = {
    user(state){
        return state.user
    }
}

export const actions = {
    async [LOGIN_USER](context, credentials) {
        const result = await API.post('autenticacao/login', credentials);
        if(!!result.Token) {
            context.commit(SET_AUTH_USER, result);
        }
        return result;
    },    
    async [LOGOUT_USER](context) {
        context.commit(SET_LOGOUT_USER);
    }
}

export const mutations = {
    [SET_AUTH_USER](state, user) {
        user.Usuario.Token = user.Token;
        state.user = user.Usuario;
        state.isAuthenticated = true;

        UserService.saveUser(user.Usuario)
    },
    [SET_USER](state, user) {
        state.user = user;
    },
    [SET_LOGOUT_USER](state){
        state.isAuthenticated = false;
        state.user = {};
        UserService.destroyUser();
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}