import {
   SET_BORMMONTH,SET_BADYBIRTHDAY,SET_BADYACTIVE
} from '../mutation-types'

let state = {
   bormmonth:null,
   badybirthday:null,
   badyactive:null
}
const getters = {
	bormmonth:function(state){
		if(state.bormmonth==null){
			return JSON.parse(sessionStorage.getItem('bormmonthS'));
		}
		return state.bormmonth;
	},
	badybirthday:function(){
		if(state.badybirthday==null){
			return JSON.parse(sessionStorage.getItem('badybirthdayS'));
		}
		return state.badybirthday;
	},
	badyactive:state=>state.badyactive
}
const mutations = {
    [SET_BORMMONTH](state, bormmonth) {
        state.bormmonth = bormmonth;  
    },
    [SET_BADYBIRTHDAY](state, badybirthday) {
        state.badybirthday = badybirthday;  
    },
    [SET_BADYACTIVE](state, badyactive) {
        state.badyactive = badyactive;  
    }
}

const actions = {
  set_bormmonth ({ commit },bormmonth) {
  	sessionStorage.setItem('bormmonthS',JSON.stringify(bormmonth))
    commit(SET_BORMMONTH,bormmonth)
  },
  set_badybirthday ({ commit },badybirthday) {
  	sessionStorage.setItem('badybirthdayS',JSON.stringify(badybirthday))
    commit(SET_BADYBIRTHDAY,badybirthday)
  },
  set_badyactive ({ commit },badyactive) {
    commit(SET_BADYACTIVE,badyactive)
  }
}
export default {
    state,
    getters,
    actions,
    mutations
}