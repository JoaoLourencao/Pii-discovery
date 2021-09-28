import TokenService from '@/helpers/token.service'
import { LOGIN, CHANGE_PASSWORD, LOGOUT } from './actions.type'
import { SET_AUTH, SET_LOGOUT, SET_PERMISSION } from './mutations.type'
import { API } from '../helpers/api.service';

export const state = {
    errors: null,
    user: {},
    isAuthenticated: !!TokenService.getToken(),
    permission: TokenService.getUser()
};

export const getters = {
    currentUser(state){
        return state.user;
    },
    isAuthenticated(state){
        return state.isAuthenticated;
    },
};

export const actions = {
    async [LOGIN](context, credentials) {        
        const result = await API.post('autenticacao/login', credentials.data);
        
        if(!!result.Token){
            context.commit(SET_AUTH, result);
            context.commit(SET_PERMISSION, result);
        }
            

        return result;
    },
    async [CHANGE_PASSWORD](context, credentials) {
        const result = await API.post('autenticacao/alterar-senha', credentials);
        return result;
    },
    async [LOGOUT](context) {
        await API.get('autenticacao/logout');
        context.commit(SET_LOGOUT);
    }
}

export const mutations = {
    [SET_AUTH](state, user){
        state.isAuthenticated = true;
        state.user = user.Usuario;
        state.errors = {};
        let permissions = [];
        user.Usuario.permissoes.forEach(element => {
            permissions.push({ Id: element.Id, Administrador: element.Administrador })
        });

        if(user.Usuario.administrativo.Polo != null) {
            permissions.push({ Id: 10, Administrador: true, Polo: user.Usuario.administrativo.Polo })
        }

        TokenService.saveToken(user.Token, permissions, user.Usuario);
    },
    [SET_LOGOUT](state){
        state.isAuthenticated = false;
        state.user = {};
        state.permission = {};
        state.error = {};
        TokenService.destroyToken();
    },
    [SET_PERMISSION](state, user){
        state.permission = user.Usuario;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}