<template>
  <div id="app">
    <!-- <section class="app-content" style="display:none;" v-show="appload">
        <router-view keep-alive></router-view>
    </section> -->
    <section class="container" v-if="appload">
    <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <router-view></router-view>
    </section>
    <!-- <a v-link="/Index">11111111111</a> -->

    <!--mask layer--> 
    <section class="welcome" v-show="welcome">
    
    </section>
    <mt-tabbar v-model="selected" fixed v-show="showmenu">
      <mt-tab-item v-for="(item, index) in index_nav" v-bind:id="'tab' + index" v-bind:href="'#' + item.path" :key="index">
        <span slot="icon"></span>
        <!--  <router-link :to="''+item.path"></router-link> -->
        {{ item.text }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import { Tabbar, TabItem } from 'mint-ui';
import {apiurl} from './service/api-config.js'
import {globappid} from './variable/variable.js'
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

//require('./assets/css/common.scss')
require('./assets/css/modules.scss')

export default {
  name: 'app',
  computed:{
      ...mapGetters({
      index_nav:'index_nav',code:'code',openid:'openid',userinfo:'userinfo',familymember:'familymember',isLogined:'isLogined',userid:'userid',onaddress:'onaddress'
    })
  },
  methods:{
    ...mapActions([
      'get_index_nav' ,'set_code' ,'set_openid'  ,'set_userinfo'  ,'set_familymember' ,'set_isLogined','set_ishavebaby','set_userid','set_username','set_userage','set_userimgtu','set_patientid','set_userinfoid','set_onaddress'
    ]),
  },
  data() {
        return {
          counter: 0,
          appload: false,//主结构
          welcome: true,//欢迎页
          showmenu:false,
          isnormal:true,
          selected:"tab0"
        }
  },
  created(){
    var vm=this;
    var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
        this.set_code(unescape(r[2]));
        var vm=this;
        $.ajax({ url: apiurl.LoginByCode+"?code="+this.code,type:'post', success: function(data){
        	 vm.set_openid(data.openid);	
           console.log(data.openid)
        	 $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:data.openid},type:'get',success:function(data){ 
        	 	console.log(data)
        	 		if(data.suc){
        	 			if(data.extra.CurrentLoginMember){
                  vm.set_isLogined(true);
                  vm.set_userinfo(data.extra.CurrentLoginMember);
                  vm.set_userid(data.extra.CurrentLoginMember.UserID);
                  vm.set_familymember(data.extra.OtherMembers);
                  vm.set_ishavebaby(data.extra.IsHaveBaby);
                  window.location.href = window.location.href.replace("code","weixin");
                }
        	 		}
        	 		else
        	 		{
        	 			localStorage.clear();
        	 			vm.set_isLogined(false);
                vm.set_openid(data.openid);
                window.location.href = window.location.href.replace("code","weixin");
              }
        	 }});
        	 
        }});
    }else{
//      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){//获取用户信息
//      	console.log(data)
//      }});
    	  if(this.openid==null)
    	  {
    	  	var authorizeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+globappid.appid+"&redirect_uri="
    	  	+escape(window.location.href)+
    	  	"&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect";
					window.location.href = authorizeUrl;
    	  }else{
    	  	
    	  }
    }
    setTimeout(() => {
      this.showmenu = true;
    }, 0)
    setTimeout(() => {
      this.welcome = false;
      this.appload = true;
    }, 2000)
    //this.$store.dispatch('get_index_nav')

    this.get_index_nav();
/*    getUtil(apiurl.GetBannerList,[]).then(data =>{
                console.info(data)
              })*/    
  }

 
 
 
}
</script>

<style scope>
html,body{
  height: 100%;
  margin: 0px;
/*   background: #F6F6F6; */
  font-size: 16px;
}
h1,h2,h3,h4,h5,h6{
  margin: 0px;
}
a{
  text-decoration: none;
}
a:link,a:visited{
  color: #000;
}
ul{
  padding: 0;
  margin: 0;
}
ul li{
  list-style: none;
}
.welcome {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    /* transition: .25s all linear; */
    background: url(./assets/images/launchimage.png) no-repeat center center;
    background-size: cover;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
