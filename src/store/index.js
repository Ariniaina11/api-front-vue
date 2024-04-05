import { createStore } from "vuex";

export default createStore({
    state:{
        title: 'CustomerAPI',
        userAutheticated : {},
        connected: false,
        homeUrl: '/'
    },
    mutations:{
        setTitle(state, newTitle){
            state.title = newTitle
        },
        setUserAutheticated(state, user){
            state.userAutheticated = user
        },
        setConnected(state, status){
            state.connected = status;
        },
        setHomeUrl(state, url){
            state.homeUrl = url
        }
    }
})