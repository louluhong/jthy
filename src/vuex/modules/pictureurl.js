import {
   SET_PICTUREURL,SET_PICVALUE,SET_PICSUCCFAVAL,SET_PICIMGS,SET_PICBACKIMGS,SET_PICTUREURLT,SET_PICTUREURLTR,SET_PICVALUET,SET_PICVALUETR,SET_PICVALUEA,SET_IMGTUREURL,SET_IMGTUREURLT,SET_IMGTUREURLTR,SET_PICMSG
} from '../mutation-types'

let state = {
    pictureurl:"",
    pictureurlt:"",
    pictureurltr:"",
    imgtureurl:'',
    imgtureurlt:'',
    imgtureurltr:'',
    picvalue:"",
    picvaluet:"",
    picvaluetr:"",
    picvaluea:"",
    picsuccfaval:"",
    picimgs:{},
    picbackimgs:"",
    picmsg:""
}

const getters = {
	pictureurl:function(state){
		if(state.pictureurl=='' || state.pictureurl==null){
			return JSON.parse(sessionStorage.getItem('pictureurlS'));
		}
		return state.pictureurl;
	},
	pictureurlt:function(state){
		if(state.pictureurlt=='' || state.pictureurlt==null){
			return JSON.parse(sessionStorage.getItem('pictureurltS'));
		}
		return state.pictureurlt;
	},
  	pictureurltr:function(state){
		if(state.pictureurltr=='' || state.pictureurltr==null){
			return JSON.parse(sessionStorage.getItem('pictureurltrS'));
		}
		return state.pictureurltr;
	},
	imgtureurl:function(state){
		if(state.imgtureurl.length==0){
			return JSON.parse(sessionStorage.getItem('imgtureurlS'));
		}
		return state.imgtureurl;
	},
	imgtureurlt:function(state){
		if(state.imgtureurlt.length==0){
			return JSON.parse(sessionStorage.getItem('imgtureurltS'));
		}
		return state.imgtureurlt;
	},
  	imgtureurltr:function(state){
		if(state.imgtureurltr.length==0){
			return JSON.parse(sessionStorage.getItem('imgtureurltrS'));
		}
		return state.imgtureurltr;
	},
	picvalue:function(state){
		if(state.picvalue=='' || state.picvalue==null){
			return JSON.parse(sessionStorage.getItem('picvalueS'));
		}
		return state.picvalue;
	},
 	picvaluet:function(state){
		if(state.picvaluet=='' || state.picvaluet==null){
			return JSON.parse(sessionStorage.getItem('picvaluetS'));
		}
		return state.picvaluet;
	},
	picvaluetr:function(state){
		if(state.picvaluetr=='' || state.picvaluetr==null){
			return JSON.parse(sessionStorage.getItem('picvaluetrS'));
		}
		return state.picvaluetr;
	},
	picvaluea:function(state){
		if(state.picvaluea=='' || state.picvaluea==null){
			return JSON.parse(sessionStorage.getItem('picvalueaS'));
		}
		return state.picvaluea;
	},
	picsuccfaval:function(state){
		if(state.picsuccfaval=='' || state.picsuccfaval==null){
			return JSON.parse(sessionStorage.getItem('picsuccfavalS'));
		}
		return state.picsuccfaval;
	},
	picimgs:function(state){
		if(state.picimgs.length==0){
			return JSON.parse(sessionStorage.getItem('picimgsS'));
		}
		return state.picimgs;
	},
	picbackimgs:function(state){
		if(state.picbackimgs=='' || state.picbackimgs==null){
			return JSON.parse(sessionStorage.getItem('picbackimgsS'));
		}
		return state.picbackimgs;
	},
  	picmsg:function(state){
		if(state.picmsg=='' || state.picmsg==null){
			return JSON.parse(sessionStorage.getItem('picmsgS'));
		}
		return state.picmsg;
	},
}
const mutations = {
    [SET_PICTUREURL](state, pictureurl) {
        state.pictureurl = pictureurl;
        
    },
    [SET_PICTUREURLT](state, pictureurlt) {
        state.pictureurlt = pictureurlt;
        
    },
    [SET_PICTUREURLTR](state, pictureurltr) {
        state.pictureurltr = pictureurltr;
        
    },
    [SET_IMGTUREURL](state, imgtureurl) {
        state.imgtureurl = imgtureurl;
        
    },
     [SET_IMGTUREURLT](state, imgtureurlt) {
        state.imgtureurlt = imgtureurlt;
       
    },
     [SET_IMGTUREURLTR](state, imgtureurltr) {
        state.imgtureurltr = imgtureurltr;
       
    },
    [SET_PICVALUE](state, picvalue) {
        state.picvalue = picvalue;
        
    },
    [SET_PICVALUET](state, picvaluet) {
        state.picvaluet = picvaluet;
        
    },
    [SET_PICVALUETR](state, picvaluetr) {
        state.picvaluetr = picvaluetr;
        
    },
    [SET_PICVALUEA](state, picvaluea) {
        state.picvaluea = picvaluea;
        
    },
    [SET_PICSUCCFAVAL](state, picsuccfaval) {
        state.picsuccfaval = picsuccfaval;
        
    },
    [SET_PICIMGS](state, picimgs) {
        state.picimgs = picimgs;
        
    },
    [SET_PICBACKIMGS](state, picbackimgs) {
        state.picbackimgs = picbackimgs;
       
    },
    [SET_PICMSG](state, picmsg) {
        state.picmsg = picmsg;
        
    }
}

const actions = {
  set_pictureurl ({ commit },pictureurl) {
  	sessionStorage.setItem('pictureurlS',JSON.stringify(pictureurl))
    commit(SET_PICTUREURL,pictureurl)
  },
  set_pictureurlt ({ commit },pictureurlt) {
  	sessionStorage.setItem('pictureurltS',JSON.stringify(pictureurlt))
    commit(SET_PICTUREURLT,pictureurlt)
  },
  set_pictureurltr ({ commit },pictureurltr) {
  	sessionStorage.setItem('pictureurltrS',JSON.stringify(pictureurltr))
    commit(SET_PICTUREURLTR,pictureurltr)
  },
  set_imgtureurl ({ commit },imgtureurl) {
  	sessionStorage.setItem('imgtureurlS',JSON.stringify(imgtureurl))
    commit(SET_IMGTUREURL,imgtureurl)
  },
   set_imgtureurlt ({ commit },imgtureurlt) {
   	sessionStorage.setItem('imgtureurltS',JSON.stringify(imgtureurlt))
    commit(SET_IMGTUREURLT,imgtureurlt)
  },
   set_imgtureurltr ({ commit },imgtureurltr) {
   	sessionStorage.setItem('imgtureurltrS',JSON.stringify(imgtureurltr))
    commit(SET_IMGTUREURLTR,imgtureurltr)
  },
  set_picvalue ({ commit },picvalue) {
  	sessionStorage.setItem('picvalueS',JSON.stringify(picvalue))
    commit(SET_PICVALUE,picvalue)
  },
  set_picvaluet ({ commit },picvaluet) {
  	sessionStorage.setItem('picvaluetS',JSON.stringify(picvaluet))
    commit(SET_PICVALUET,picvaluet)
  },
  set_picvaluetr ({ commit },picvaluetr) {
  	sessionStorage.setItem('picvaluetrS',JSON.stringify(picvaluetr))
    commit(SET_PICVALUETR,picvaluetr)
  },
   set_picvaluea ({ commit },picvaluea) {
   	sessionStorage.setItem('picvalueaS',JSON.stringify(picvaluea))
    commit(SET_PICVALUEA,picvaluea)
  },
  set_picsuccfaval ({ commit },picsuccfaval) {
  	sessionStorage.setItem('picsuccfavalS',JSON.stringify(picsuccfaval))
    commit(SET_PICSUCCFAVAL,picsuccfaval)
  },
   set_picimgs ({ commit },picimgs) {
   	sessionStorage.setItem('picimgsS',JSON.stringify(picimgs))
    commit(SET_PICIMGS,picimgs)
  },
   set_picbackimgs ({ commit },picbackimgs) {
   	sessionStorage.setItem('picbackimgsS',JSON.stringify(picbackimgs))
    commit(SET_PICBACKIMGS,picbackimgs)
  },
  set_picmsg ({ commit },picmsg) {
  	sessionStorage.setItem('picmsgS',JSON.stringify(picmsg))
    commit(SET_PICMSG,picmsg)
  }
}
export default {
    state,
    getters,
    actions,
    mutations
}
