import { createStore } from "vuex";

export default createStore({
    state:{
        title: 'CustomerAPI',
        connected: false
    },
    mutations:{
        setTitle(state, newTitle){
            state.title = newTitle
        },
        setConnected(state, status){
            state.connected = status;
        }
    }
})