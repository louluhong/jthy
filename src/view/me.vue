<template>
<section class="me-container">
    <div class="me-container-head">
      <div class="me-container-headdiv">
        <img :src="userinfo.PhotoUrl" >
      </div>
      <div class="me-container-headinfo clearfix">
        <span>{{userinfo.CHName}}&nbsp;&nbsp;{{userinfo.Age}}岁</span>
      </div>
    </div>
    <div class="me-container-body">
      <div class="me-container-bodyitem">
       <a href="#/Me/Suggestion">
        <div>
          <img src="../assets/images/me_sugg_2@2x.png">
          <span>意见反馈</span>
          <img src="../assets/images/jiantou@2x.png">
        </div>
        </a>
      </div>
      <div class="me-container-bodyitem">
        <div @click="goRouterFrame($event)" to="http://zjkjwx.zwjk.com/weixinStart.htm?action=qyjs">
          <img src="../assets/images/me_about_2@2x.png">
          <span>关于我们</span>
          <img src="../assets/images/jiantou@2x.png">
        </div>
      </div>
      <div class="me-container-bodyitem">
        <div @click="editInfo()">
          <img src="../assets/images/me_edit@2x.png">
          <span >修改信息</span>
          <img src="../assets/images/jiantou@2x.png">
        </div>
      </div>
    </div>
    <router-view transition="cover"></router-view>
</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../service/api-config.js'
export default{
	data() {
		return{
			userinfo:{}
		}
	},
  computed:{
      ...mapGetters({
		openid:'openid'
    })
  },
  created() {
  	this.set_picvalue("");//取消上传照片
  	this.set_picvaluet("");
  	this.set_picvaluetr("");
  	this.set_picimgs("");
	this.set_picbackimgs("");
	this.set_pictureurl("");
	this.set_pictureurlt("");
	this.set_pictureurltr("");
	
	let vm=this;
		
		$.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){
    //获取用户信息

				vm.userinfo=data.extra.CurrentLoginMember;		
		}});
		},
    methods:{
    	...mapActions([
      'set_picvalue','set_picvaluet','set_picvaluetr','set_picimgs','set_picbackimgs','set_pictureurl','set_pictureurlt','set_pictureurltr'
    ]),
      goRouterFrame(event){
        this.$router.push({'name':'Other', params: { href: encodeURIComponent($(event.currentTarget).attr('to')) }});
      },
      editInfo(){
        this.$router.push({'name':'AddFemilyMember', params: { pid: this.userinfo.PatientID,did:0 }});
      }
    },
    beforeRouteEnter (to, from, next) {
	    $(".mint-tabbar").show();
	    $(".mint-tabbar .mint-tab-item").removeClass('is-selected');
	    $(".mint-tabbar .mint-tab-item").eq(2).addClass('is-selected');
	    next();
  },
  beforeRouteLeave (to, from, next) {
    var arr = new Array("/Index", "/Chat", "/Me","/Chatindex");
    if($.inArray(to.path, arr)==-1){
      $(".mint-tabbar").hide();
    }
    next();
  }
}
</script>