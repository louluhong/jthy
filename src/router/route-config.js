import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import setWechatTitle from '../assets/js/setWechatTitle.js';

Vue.use(VueRouter)

const Default = resolve=>require(['../view/index.vue'],resolve)

const router = new VueRouter({
  	hashbang:true,// 将路径格式化为#开头
    saveScrollPosition: true,
    routes:[
    	{
    		path:'/',component:Default,meta: { requiresAuth: false,title:'家庭好医' }
    	},
    	{
    		path:'/Index',component:Default,meta: { requiresAuth: false,title:'家庭好医' }
    	},
        {
            name: 'DoctorDetail',path:'/DoctorDetail/:did/:wzid',component:resolve=>require(['../view/qianyue/doctordetail.vue'],resolve),meta: { requiresAuth: false,title:'医生信息' }
        },
        {
            name: 'DoctorDetailQY',path:'/DoctorDetailQY/:did/:pid',component:resolve=>require(['../view/qianyue/doctordetail.vue'],resolve),meta: { requiresAuth: false,title:'医生信息' }
        },
        {
            path:'/Register',component:resolve=>require(['../view/register.vue'],resolve),meta: { requiresAuth: false,title:'注册' }
        },
        {
            name: 'QianyueApplyInfo',path:'/QianyueApplyInfo/:did/:pid',component:resolve=>require(['../view/qianyue/qianyueapplyinfo.vue'],resolve),meta: { requiresAuth: true,title:'签约信息确认' }
        },
        {
            name: 'PatientDetail',path:'/PatientDetail/:pid',component:resolve=>require(['../view/jiating/patientdetail.vue'],resolve),meta: { requiresAuth: true,title:'居民信息' }
        },
        {
            name: 'ChangeFamilyMemberList',path:'/ChangeFamilyMemberList/:pid',component:resolve=>require(['../view/jiating/changefamilymemberlist.vue'],resolve),meta: { requiresAuth: true,title:'修改居民信息' },
                children:[
                    {
                        name:'playokchange',path:'/playokchange/:pok',component:resolve=>require(['../view/changecard/playok.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'},children:[
                            {
                                name:'Photographchange',path:'Photographchange',component:resolve=>require(['../view/changecard/Photograph.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'},children:[
                                    {
                                                    name:'authenticationchange',path:'authenticationchange',component:resolve=>require(['../view/changecard/authentication.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'}
                                    }
                                ]
                            },
                            {
                                name:'successFailchange',path:'/successFailchange/:succ',component:resolve=>require(['../view/changecard/successFailchange.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'}
                            }
                        ]
                    }
                ]
        },
        {
            name: 'QianyueRemind',path:'/QianyueRemind',component:resolve=>require(['../view/qianyue/qianyueremind.vue'],resolve),meta: { requiresAuth: false,title:'签约好处' }
        },
        {
            name: 'HealthInfo',path:'/HealthInfo/:did/:pid',component:resolve=>require(['../view/qianyue/healthinfo.vue'],resolve),meta: { requiresAuth: false,title:'健康信息' }
        },
        {
            name: 'ChooseFamilyMember',path:'/ChooseFamilyMember/:did',component:resolve=>require(['../view/qianyue/choosefamilymember.vue'],resolve),meta: { requiresAuth: false,title:'选择家庭成员' }
        },
        {
            name: 'HospitalList',path:'/HospitalList/:pid',component:resolve=>require(['../view/qianyue/hospitallist.vue'],resolve),meta: { requiresAuth: false,title:'选择社区' }
        },
        {
            name: 'DoctorList',path:'/DoctorList/:hid/:pid',component:resolve=>require(['../view/qianyue/doctorlist.vue'],resolve),meta: { requiresAuth: false,title:'医生列表' }
        },
        {
           name:'FamilyMemberList', path:'/FamilyMemberList',component:resolve=>require(['../view/jiating/familymemberlist.vue'],resolve),meta: { requiresAuth: true,title:'家庭成员列表' }
        },
        {
            name: 'Chat',path:'/Chat',component:resolve=>require(['../view/chat.vue'],resolve),meta: { requiresAuth: true,title:'家庭好医' }
        },
        {
            path:'/Chatindex',component:resolve=>require(['../view/chatindex.vue'],resolve),meta: { requiresAuth: false,title:'消息' }
        },
        {
            name: 'ChatDetail',path:'/ChatDetail/:uid/:iuid',component:resolve=>require(['../view/chat/chatdetail.vue'],resolve),meta: { requiresAuth: true,title:'咨询' }
        },
        {
            name: 'AddFemilyMember',path:'/AddFemilyMember/:pid/:did',component:resolve=>require(['../view/jiating/addfamilymember.vue'],resolve),meta: { requiresAuth: false,title:'家庭成员编辑' },
            children:[
            	{
        			name:'playok',path:'/playok/:pok',component:resolve=>require(['../view/authentication/playok.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'},children:[
        				{
							name:'Photograph',path:'Photograph',component:resolve=>require(['../view/authentication/Photograph.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'},children:[
								{
												name:'authentication',path:'authentication',component:resolve=>require(['../view/authentication/authentication.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'}
								}
							]
        				},
        				{
        					name:'successFail',path:'/successFail/:suc',component:resolve=>require(['../view/authentication/successFail.vue'],resolve),meta:{requiresAuth:false,title:'证件认证'}
        				}
        			]
            	}
            ]
        },
        {
            path:'/Me',title:'个人中心',component:resolve=>require(['../view/me.vue'],resolve),meta: { requiresAuth: true,title:'个人中心' },children:[
                {
                    path:'Suggestion',component:resolve=>require(['../view/me/suggestion.vue'],resolve),meta: { requiresAuth: true ,title:'意见反馈'}
                }
            ]
        },
        {
            name: '500',path:'/500/:msg',component:resolve=>require(['../view/500.vue'],resolve),meta: { requiresAuth: false ,title:'错误页面'}
        },
        {
            name: 'Other',path:'/Other/:href',component:resolve=>require(['../view/other.vue'],resolve),meta: { requiresAuth: false ,title:'家庭好医'}
        },
        {
        	name: 'signAdmin',path:'/signAdmin',component:resolve=>require(['../view/signAdmin/signAdmin.vue'],resolve),meta:{requiresAuth: true,title:'签约管理'}
        },
        {
		name:'adminDetails',path:'/adminDetails/:glid',component:resolve=>require(['../view/signAdmin/adminDetails.vue'],resolve),meta:{requiresAuth:true,title:'签约管理详情'}
        },
         {
		name:'addressSelect',path:'/addressSelect/:addid',component:resolve=>require(['../view/qianyue/addressSelect.vue'],resolve),meta:{requiresAuth:false,title:'选择城市'}
        },
         {
		name:'onlineQy',path:'/onlineQy',component:resolve=>require(['../view/qianyue/onlineQy.vue'],resolve),meta:{requiresAuth:false,title:'在线签约'}
        },
        {
		name:'modifybadyinfo',path:'/modifybadyinfo/:modbadyid',component:resolve=>require(['../view/ymjz/modifybadyinfo.vue'],resolve),meta:{requiresAuth:true,title:'修改信息'}
        },
        {
		name:'ymxq',path:'/ymxq/:BacterinId',component:resolve=>require(['../view/ymjz/ymxq.vue'],resolve),meta:{requiresAuth:true,title:'疫苗详情'}
        },
        {
		name:'ymjzindexhave',path:'/ymjzindexhave',component:resolve=>require(['../view/ymjz/ymjzindexhave.vue'],resolve),meta:{requiresAuth:true,title:'预防接种'}
        },
        {
		name:'ymxqlist',path:'/ymxqlist/:login',component:resolve=>require(['../view/ymjz/ymxqlist.vue'],resolve),meta:{requiresAuth:true,title:'疫苗详情'}
        },
        {
            name: 'WenZhenStart',path:'/WenZhenStart/:did/:wzid/:iuid',component:resolve=>require(['../view/wenzhen/wenzhenstart.vue'],resolve),meta: { requiresAuth: false,title:'问诊' }
        },
        {
            name: 'WenZhenDetail',path:'/WenZhenDetail/:iid/:pid/:did/:isfalse',component:resolve=>require(['../view/wenzhen/wenzhendetail.vue'],resolve),meta: { requiresAuth: false,title:'问诊' }
        },
        {
            name: 'SystemMesDetail',path:'/SystemMesDetail',component:resolve=>require(['../view/chat/SystemMesDetail.vue'],resolve),meta: { requiresAuth: true,title:'系统消息' }
        },
        {
            name: 'Rzindex',path:'/Rzindex',component:resolve=>require(['../view/InstitutionsSettled/rzindex.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzinfomation',path:'/Rzinfomation',component:resolve=>require(['../view/InstitutionsSettled/rzinfomation.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzok',path:'/Rzok/:zcok',component:resolve=>require(['../view/InstitutionsSettled/rzok.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
         {
            name: 'Rzyhsuggest',path:'/Rzyhsuggest',component:resolve=>require(['../view/InstitutionsSettled/rzyhsuggest.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzwxsuggest',path:'/Rzwxsuggest',component:resolve=>require(['../view/InstitutionsSettled/rzwxsuggest.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzpcsuggest',path:'/Rzpcsuggest',component:resolve=>require(['../view/InstitutionsSettled/rzpcsuggest.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzlogin',path:'/Rzlogin',component:resolve=>require(['../view/InstitutionsSettled/rzlogin.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
        {
            name: 'Rzzgqypt',path:'/Rzzgqypt',component:resolve=>require(['../view/InstitutionsSettled/rzzgqypt.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
          {
            name: 'Rzzgjyysd',path:'/Rzzgjyysd',component:resolve=>require(['../view/InstitutionsSettled/rzzgjyysd.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
         {
            name: 'Rzzgjyjmd',path:'/Rzzgjyjmd',component:resolve=>require(['../view/InstitutionsSettled/rzzgjyjmd.vue'],resolve),meta: { requiresAuth: false,title:'入驻' }
        },
         
    ]
})
router.beforeEach((to, from, next) => {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)!="micromessenger") {
        //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f90f2ba8a29296e&redirect_uri=http%3a%2f%2fjthy.zhoubili.com&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect';
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {//同样效果if(to.meta.requiresAuth)
        if(store.getters.isLogined){
            next();
        }else{
			 next({
//	            path: '/Register'
				path:'/AddFemilyMember/-1/0'
	       })
        }
    }else{
        next();
    }
    
    
})

router.afterEach((to,from,next) => {
	if(from.name=="ChooseFamilyMember" || from.path=="/Index" || from.path=="/"){
			document.title="家庭成员编辑";
			sessionStorage.setItem('titleS','家庭成员编辑');
  	}
  	if(from.path=="/Me"){
  		document.title="修改个人信息";
  		sessionStorage.setItem('titleS','修改个人信息');
  	}
   	if(from.name=="ymjzIndex" || from.name=="ymjzindexhave"){
  		document.title="添加宝宝";
  		sessionStorage.setItem('titleS','添加宝宝');
  	}
	
	
	
	$(".picker").hide();//如果用户没有关闭控件，点击返回的时候隐藏picker控件
	$(".gearDate").hide();//如果用户没有关闭控件，点击返回的时候隐藏时间控件
    var title=to.meta.title==undefined?"家庭好医":to.meta.title;
    setWechatTitle(title);
  	$("body").scrollTop(0);
	var arr = new Array("/Index",  "/Me","/","/Chatindex");
    if($.inArray(to.path, arr)==-1){
      	$(".mint-tabbar").hide();
    }
   	if(from.name=="playok" || from.name=="successFail"){
   		document.title=sessionStorage.getItem('titleS');
   	}
})

export default router