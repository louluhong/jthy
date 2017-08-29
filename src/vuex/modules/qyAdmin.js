import {
   SET_QYADMIN,SET_QYADMINPASS,SET_QYADMINYEAR,SET_MEDICALID,SET_REGSTATE
} from '../mutation-types'

let state = {
   qyadmin:"",
   qyadminpass:"",
   qyadminyear:"",
   medicalid:"",
   regstate:""
}

const getters = {
	qyadmin:function(state){
		if(state.qyadmin=='' || state.qyadmin==null){
			return JSON.parse(sessionStorage.getItem('qyadminS'));
		}
		return state.qyadmin;
	},
	qyadminpass:function(state){
		if(state.qyadminpass=='' || state.qyadminpass==null){
			return JSON.parse(sessionStorage.getItem('qyadminpassS'));
		}
		return state.qyadminpass;
	},
	qyadminyear:function(state){
		if(state.qyadminyear=='' || state.qyadminyear==null){
			return JSON.parse(sessionStorage.getItem('qyadminyearS'));
		}
		return state.qyadminyear;
	},
	medicalid:function(state){
		if(state.medicalid=='' || state.medicalid==null){
			return JSON.parse(sessionStorage.getItem('medicalidS'));
		}
		return state.medicalid;
	},
	regstate:function(state){
		if(state.regstate=='' || state.regstate==null){
			return JSON.parse(sessionStorage.getItem('regstateS'));
		}
		return state.regstate;
	},
}
const mutations = {
    [SET_QYADMIN](state, qyadmin) {
        state.qyadmin = qyadmin;
       
    },
     [SET_QYADMINPASS](state, qyadminpass) {
        state.qyadminpass = qyadminpass;
       
    },
    [SET_QYADMINYEAR](state, qyadminyear) {
        state.qyadminyear = qyadminyear;
        
    },
    [SET_MEDICALID](state, medicalid) {
        state.medicalid = medicalid;
       
    },
    [SET_REGSTATE](state, regstate) {
        state.regstate = regstate;
        
    }
}

const actions = {
  set_qyadmin ({ commit },qyadmin) {
  	sessionStorage.setItem('qyadminS',JSON.stringify(qyadmin))
    commit(SET_QYADMIN,qyadmin)
  },
   set_qyadminpass ({ commit },qyadminpass) {
   	sessionStorage.setItem('qyadminpassS',JSON.stringify(qyadminpass))
    commit(SET_QYADMINPASS,qyadminpass)
  },
  set_qyadminyear ({ commit },qyadminyear) {
  	sessionStorage.setItem('qyadminyearS',JSON.stringify(qyadminyear))
    commit(SET_QYADMINYEAR,qyadminyear)
  },
   set_medicalid ({ commit },medicalid) {
   	sessionStorage.setItem('medicalidS',JSON.stringify(medicalid))
    commit(SET_MEDICALID,medicalid)
  },
   set_regstate ({ commit },regstate) {
   	sessionStorage.setItem('regstateS',JSON.stringify(regstate))
    commit(SET_REGSTATE,regstate)
  }
}
export default {
    state,
    getters,
    actions,
    mutations
}
