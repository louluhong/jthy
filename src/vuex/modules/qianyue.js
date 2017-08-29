import {
    SET_HOSPITALLISTALL,SET_HOSPITALLISTMY
} from '../mutation-types'

let state = {
    hospitallistall:{},
    hospitallistmy:[]
}

const getters = {
	hospitallistall:function(state){
		if(state.hospitallistall.length==0){
			return JSON.parse(sessionStorage.getItem('hospitallistallS'));
		}
		return state.hospitallistall;
	},
	hospitallistmy:function(state){
		if(state.hospitallistmy.length==0){
			return JSON.parse(sessionStorage.getItem('hospitallistmyS'));
		}
		return state.hospitallistmy;
	},
}

const mutations = {
    [SET_HOSPITALLISTALL](state, hospitallistall) {
        state.hospitallistall = hospitallistall;
       
    },
    [SET_HOSPITALLISTMY](state, hospitallistmy) {
        state.hospitallistmy = hospitallistmy;
        
    }
}

const actions = {
  set_hospitallistall ({ commit },hospitallistall) {
  	sessionStorage.setItem('hospitallistallS',JSON.stringify(hospitallistall))
    commit(SET_HOSPITALLISTALL,hospitallistall)
  },
  set_hospitallistmy ({ commit },hospitallistmy) {
  	sessionStorage.setItem('hospitallistmyS',JSON.stringify(hospitallistmy))
    commit(SET_HOSPITALLISTMY,hospitallistmy)
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}