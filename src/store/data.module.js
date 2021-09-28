import { API } from '../helpers/api.service'
import { GET_LIST, CREATE_OBJECT, GET_LIST_POST, GET_ITEM, GET_ITEM_POST, DELETE_OBJECT, ATUALIZA_OBJECT } from './actions.type'
import { SET_RESPONSE } from './mutations.type'

export const state = {
    response: {},
    getNet : process.env.API_GETNET
}

export const actions = {
    async [GET_ITEM](context, data){
        if(data.method !== undefined){
            const result = await API.get(data.method);
            return result;
        }
    },
    async [GET_ITEM_POST](context, data){
        if(data.method !== undefined){
            const result = await API.post(data.method, data.body);
            return result;
        }
    },
    async [GET_LIST](method){
        if(method !== undefined){
            const url = `/api/v1/${method}`
            state.response = await API.get(url);
        }
    },
    async [GET_LIST_POST](context, data){
        if(data.method !== undefined){            
            const result = await API.post(data.method, data.data);
            
            context.commit(SET_RESPONSE, result);
            return result;
        }
    },
    async [CREATE_OBJECT](context, data){
        if(data.data !== undefined && data.method !== undefined){
            const result = await API.post(data.method, data.data);            
            return result;
        }        
    },
    async [ATUALIZA_OBJECT](context, data){
        if(data.data !== undefined && data.method !== undefined){
            const result = await API.put(data.method, data.data);            
            return result;
        }        
    },
    async [DELETE_OBJECT](context, data){
        if(data.method !== undefined) {
            const result = await API.delete(data.method, data.data);
            return result
        }
    }
}

export const mutations = {
    [SET_RESPONSE](state, response) {
        state.response = response;
    }    
}

const getters = {
    list(state) {
        return state.response;
    },
    getNetUrl(state) {
        return state.getNet;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}