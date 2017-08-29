import {
    SET_MENU,SET_BANNER,SET_CODE,SET_OPENID,SET_INDEXZXLIST,SET_ADDRESS,SET_USERINFO,SET_FAMILYMEMBER,SET_ISLOGINED,SET_ISFIRSTINTO,SET_ISREMIND,SET_SIGNSTATE,SET_ISHAVEBABY,SET_USERID,SET_DOCSTATE,SET_WZTABDATA,SET_DOCTORURLNAME,SET_DOCTORURLDID,SET_DOCTORURLPID
} from '../mutation-types'

let state = {
    code:'',
    openid:'',
    index_nav: [],
    bannerlist:[],
    isLogined:false,
    isfirstinto:true,
    indexzxlist:[],
    address: [],
    userinfo:{},
    familymember:[],
    ishavebaby:null,
    userid:null,
    docstate:null,
    wztabdata:'',
    doctorurlname:'',
    doctorurldid:'',
    doctorurlpid:''
}
const getters = {
	code:function(state){
		/*if(state.code=='' || state.code==null){
			return JSON.parse(localStorage.getItem('codeS'));
		}*/
		return state.code;
	},
	openid:function(state){
		if(state.openid=='' || state.openid==null){
			return JSON.parse(localStorage.getItem('openidS'));
		}
		return state.openid;
	},
	index_nav: state => state.index_nav,
	bannerlist: state => state.bannerlist,
  
  	isLogined:function(state){
  		if(state.isLogined==false){
			return JSON.parse(sessionStorage.getItem('isLoginedS'));
		}
		return state.isLogined;
  	},
	indexzxlist: state => state.indexzxlist,
	address: state => state.address,
  	userinfo:function(state){
  		if(state.userinfo.length==0){
			return JSON.parse(sessionStorage.getItem('userinfoS'));
		}
		return state.userinfo;
  	},
  	familymember:function(state){
  		if(state.familymember.length==0 && JSON.parse(sessionStorage.getItem('familymemberS'))!=null){
			return JSON.parse(sessionStorage.getItem('familymemberS'));
		}
		return state.familymember;
  	},
  	isfirstinto:function(state){
		if(state.isfirstinto==true){
			return JSON.parse(sessionStorage.getItem('isfirstintoS'));
		}
		return state.isfirstinto;
	},
	ishavebaby:function(state){
		if(state.ishavebaby==null){
			return JSON.parse(sessionStorage.getItem('ishavebabyS'));
		}
		return state.ishavebaby;
	},
	userid:function(state){
		if(state.userid==null){
			return JSON.parse(sessionStorage.getItem('useridS'));
		}
		return state.userid;
	},
	docstate: state => state.docstate,
	wztabdata: state => state.wztabdata,
	doctorurlname: state => state.doctorurlname,
	doctorurldid: state => state.doctorurldid,
	doctorurlpid: state => state.doctorurlpid,
  
}

const mutations = {
    [SET_MENU](state, index_nav) {
        state.index_nav = index_nav;
    },
    [SET_BANNER](state, bannerlist) {
        state.bannerlist = bannerlist;
        
    },
    [SET_CODE](state, code) {
        state.code = code;
    },
    [SET_OPENID](state, openid) {
        state.openid = openid;
    },
    [SET_INDEXZXLIST](state, indexzxlist) {
        state.indexzxlist = indexzxlist;
        
    },
    [SET_ADDRESS](state, address) {
        state.address = address;
    },
    [SET_USERINFO](state, userinfo) {
        state.userinfo = userinfo;   
    },
    [SET_FAMILYMEMBER](state, familymember) {
        state.familymember = familymember;    
    },
    [SET_ISLOGINED](state, isLogined) {
        state.isLogined = isLogined;
        
    },
    [SET_ISFIRSTINTO](state, isfirstinto) {
        state.isfirstinto = isfirstinto;
        
    },
    [SET_ISREMIND](state) {
        state.userinfo.SignIsRemind = true;
    },
    [SET_SIGNSTATE](state,pid) {
        for (var i=0; i<state.familymember.length; i++){
            if(state.familymember[i].PatientID==pid){
            state.familymember[i].SignState=2;
            state.familymember[i].SignStateText="签约申请中";
            }
      }
    },
    [SET_ISHAVEBABY](state,ishavebaby) {
        state.ishavebaby = ishavebaby;
    },
    [SET_USERID](state,userid) {
        state.userid = userid;
    },
    [SET_DOCSTATE](state,docstate) {
        state.docstate = docstate;
    },
    [SET_WZTABDATA](state,wztabdata) {
        state.wztabdata = wztabdata;
    },
    [SET_DOCTORURLNAME](state,doctorurlname) {
        state.doctorurlname = doctorurlname;
    },
    [SET_DOCTORURLDID](state,doctorurldid) {
        state.doctorurldid = doctorurldid;
    },
    [SET_DOCTORURLPID](state,doctorurlpid) {
        state.doctorurlpid = doctorurlpid;
    },
}

const actions = {
  get_index_nav ({ commit }) {
  	let index_nav = require('../../mock/index-nav')
    commit(SET_MENU,index_nav)
  },
  // set_newdata ({ commit },newdata) {
  //   commit(SET_NEWDATA,newdata)
  // },
  set_bannerlist ({ commit },bannerlist) {
    commit(SET_BANNER,bannerlist)
  },
  set_code ({ commit },code) {
  	//localStorage.setItem('codeS',JSON.stringify(code))
    commit(SET_CODE,code)
  },
  set_openid ({ commit },openid) {
  	localStorage.setItem('openidS',JSON.stringify(openid))
    commit(SET_OPENID,openid)
  },
  set_indexzxlist ({ commit },indexzxlist) {
    commit(SET_INDEXZXLIST,indexzxlist)
  },
  get_address ({ commit }) {
    let address = require('../../mock/address')
    commit(SET_ADDRESS,address)
  },
  set_userinfo ({ commit },userinfo) {
  	sessionStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_USERINFO,userinfo)
  },
  set_familymember ({ commit },familymember) {
  	sessionStorage.setItem('familymemberS',JSON.stringify(familymember))
    commit(SET_FAMILYMEMBER,familymember)
  },
  set_isLogined ({ commit },isLogined) {
  	sessionStorage.setItem('isLoginedS',JSON.stringify(isLogined))
    commit(SET_ISLOGINED,isLogined)
  },
  set_isfirstinto ({ commit },isfirstinto) {
  	sessionStorage.setItem('isfirstintoS',JSON.stringify(isfirstinto))
    commit(SET_ISFIRSTINTO,isfirstinto)
  },
  set_isremind ({ commit }) {
    commit(SET_ISREMIND)
  },
  set_signstate ({ commit },pid) {
    commit(SET_SIGNSTATE,pid)
  },
  set_ishavebaby ({ commit },ishavebaby) {
  	sessionStorage.setItem('ishavebabyS',JSON.stringify(ishavebaby))
    commit(SET_ISHAVEBABY,ishavebaby)
  },
  set_userid ({ commit },userid) {
  	sessionStorage.setItem('useridS',JSON.stringify(userid))
    commit(SET_USERID,userid)
  },
  set_docstate ({ commit },docstate) {
  	//localStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_DOCSTATE,docstate)
  },
  set_wztabdata ({ commit },wztabdata) {
    //localStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_WZTABDATA,wztabdata)
  },
  set_doctorurlname ({ commit },doctorurlname) {
    //localStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_DOCTORURLNAME,doctorurlname)
  },
  set_doctorurldid ({ commit },doctorurldid) {
    //localStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_DOCTORURLDID,doctorurldid)
  },
  set_doctorurlpid ({ commit },doctorurlpid) {
    //localStorage.setItem('userinfoS',JSON.stringify(userinfo))
    commit(SET_DOCTORURLPID,doctorurlpid)
  },
}
export default {
    state,
    getters,
    actions,
    mutations
}