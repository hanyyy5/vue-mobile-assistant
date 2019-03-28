import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex) 

const store = new Vuex.Store({
    //定义状态
    state: {
        author: "xx",
        sceneName: ["请选择需要执行的场景"],
    },
    //计算属性
    getters: {

    },
    //修改状态事件，必须同步函数
    mutations: {
        newAuthor(state, msg) {
           state.author = msg
        },
        getSenceName(state, name) {
            state.sceneName = name
        }
    },
    //提交mutation，可以异步操作
    actions: {

    },
    //模块
    modules: {

    }
})

export default store
