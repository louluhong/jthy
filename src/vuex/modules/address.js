import {
   SET_SELECTADDRESS,SET_ONADDRESS
} from '../mutation-types'

let state = {
    selectaddress:"",
    onaddress:""
}

const getters = {
	selectaddress:function(state){
		if(state.selectaddress=='' || state.selectaddress==null){
			return JSON.parse(sessionStorage.getItem('selectaddressS'));
		}
		return state.selectaddress;
	},
 /* selectaddress: state => state.selectaddress,*/
	onaddress:function(state){
		if(state.onaddress=='' || state.onaddress==null){
			return JSON.parse(sessionStorage.getItem('onaddressS'));
		}
		return state.onaddress;
	}
}
const mutations = {
    [SET_SELECTADDRESS](state, selectaddress) {
        state.selectaddress = selectaddress;
    },
    [SET_ONADDRESS](state, onaddress) {
        state.onaddress = onaddress;
        
    }
}

const actions = {
  set_selectaddress ({ commit },selectaddress) {
  	sessionStorage.setItem('selectaddressS',JSON.stringify(selectaddress))
    commit(SET_SELECTADDRESS,selectaddress)
  },
  set_onaddress ({ commit },onaddress) {
  	sessionStorage.setItem('onaddressS',JSON.stringify(onaddress))
    commit(SET_ONADDRESS,onaddress)
  }
}
export default {
    state,
    getters,
    actions,
    mutations
}


