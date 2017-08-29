<template>
<section class="app-index">
      <div class="app-banner">
      <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerlist" :key="index">
            <div class="banner1 banner" v-bind:style="'background-image:url('+item.ImageUrl+');'" @click="goRouterFrame($event)" :to="item.ImageLinkUrl"></div>
            </mt-swipe-item>
        </mt-swipe>
        </div>
        <div class="divFunction">
        	<span class="index_qy_btn" @click="GoQianYueRouter()"></span>
          <span class="index_jtgl_btn" @click="GojiatingGL()"></span>
        </div>
       <div class="Function_Box">
	       	 <ul class="FunctionBtn clearfix">
		        	<li @click="GoZNDZRouter($event)" to="http://jthyzndz.zwjk.com/">
		        		<img src="../assets/images/index_AI_btn@2x.png"/>
		        		<span>智能导诊</span>
		        	</li>
		        	<li @click="GoJKBKRouter($event)" to="http://wap.zwjk.cn/zwjk3Baike.htm?hospital_id=7464&hospital_name=5YGl5bq35a6B5rOi&style_color=jknbcolor">
		        		<img src="../assets/images/index_jkbk_btn@2x.png"/>
		        		<span>健康百科</span>
		        	</li>
		        	<li @click="GoJZYMRouter">
		        		<img src="../assets/images/index_ymjz_btn@2x.png"/>
		        		<span>疫苗接种</span>
		        	</li>
	        </ul>
       </div>
        
        <div class="divMyJiaTing">
          <div class="divMyJiaTingHeader">
          	<i></i>
          </div>
          <div class="divMyJiaTingGroup">
            <div class="divMyJiaTingEmptyGroupDetail" v-if="familymember.length==0">
              <img @click="GoAddMemberRouter()" src="../assets/images/btn_addfamliynumber@22x.png"/>
            </div>
            <div class="divMyJiaTingGroupDetail" id="scroller" v-if="familymember.length!=0">
              <ul id="thelist">
              <li @click="GetDoctorInfo($event)" :value="index" v-for="(item, index) in familymember" :class="{ active: index==0 }">
                <img :src="item.PhotoUrl"/>
                <span>{{item.CHName}}</span>
              </li>
              <li @click="GoAddMemberRouter()">
                <img src="../assets/images/btn_addfamliynumber@22x.png"/>
              </li>
              </ul>
            </div>
          </div>
          <div class="divMyJiaTingDoctor" @click="GoRouter()" v-if="currentDoctor!=null">
            <div class="up"></div>
            <img :src="currentDoctor.PhotoUrl"/>
              <div class="divMyJiaTingDoctorContent">
                <h2>我的家庭医生</h2>
                <p>
                  <span>{{currentDoctor.Name}}</span>
                  <span>签约医生</span>
                </p>
                <i>{{userstatetext}}</i>
              </div>
              <b class="right"><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
          </div>
          
	          <div class="divNoJiaTingDoctor" v-if="currentDoctor==null">
	            <div class="up" v-if="familymember.length>0"></div>
	            <span @click="goRouterQY()">去签约</span>
	            <label>暂未签约哦~</label>
	          </div>
    
        </div>
        <div class="divGongGao">
          <div class="divGongGaoHeader">
            公告资讯
          </div>
          <div class="divGongGaoBody" v-for="(item, index) in indexzxlist" @click="goRouterFrame($event)" :to="item.LinkUrl">
            <div class="divGongGaoBodyItem">
              <img :src="item.ImageUrl"/>
              <div class="divGongGaoBodyContent">
                <h2>{{item.Title}}</h2>
                <p>
                  <span>{{item.Author}}</span>
                  <span>{{item.SubmitTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <router-view transition="cover"></router-view> -->
</section>
</template>
<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';
import {apiurl} from '../service/api-config.js'
import { Toast } from 'mint-ui';
import '../assets/js/jquery-1.11.0.min.js';
import '../assets/js/iscroll.js';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data() {
      return {
        currentDoctor: null,
        currentPid:0,
        userstatetext:''
    
      }
  },
	computed:{
      ...mapGetters({
      bannerlist:'bannerlist',indexzxlist:'indexzxlist',userinfo:'userinfo',familymember:'familymember',isfirstinto:'isfirstinto',onaddress:'onaddress',isLogined:'isLogined',openid:'openid'
    })
  },
  beforeRouteEnter (to, from, next) {
    $(".mint-tabbar").show();
      $(".mint-tabbar .mint-tab-item").removeClass('is-selected');
    $(".mint-tabbar .mint-tab-item").eq(0).addClass('is-selected');
    next();
  },
  beforeRouteLeave (to, from, next) {
    var arr = new Array("/Index", "/Chat", "/Me","/Chatindex");
    if($.inArray(to.path, arr)==-1){
      $(".mint-tabbar").hide();
    }
    next();
  },
  methods:{
    ...mapActions([
      'set_bannerlist','set_indexzxlist','set_isfirstinto','set_picvalue','set_picvaluet','set_picvaluetr','set_picimgs','set_picbackimgs','set_pictureurl','set_pictureurlt','set_pictureurltr','set_onaddress','set_docstate','set_isLogined','set_userinfo','set_userid','set_familymember','set_ishavebaby'
    ]),
    GetDoctorInfo(event){
      var el = event.currentTarget;
      this.currentDoctor=this.familymember[$(el).attr("value")].DoctorInfo;
      this.currentPid=this.familymember[$(el).attr("value")].PatientID;
      this.set_docstate(this.familymember[$(el).attr("value")].SignState);
			this.userstatetext=this.familymember[$(el).attr("value")].SignStateText;
      if(!$(el).hasClass('active')){
        $(el).addClass('active');
        $(el).siblings().removeClass('active');
        $('.up').css('left',($(el).offset().left+($(el).width()/2)-($('.up').width()/2))-20+"px");
      }
    },
    GoAddMemberRouter(){
    	if(this.isLogined){
    		this.$router.push({'name':'AddFemilyMember', params: { pid: 0 ,did:0}});
    	}else{
    		this.$router.push({'name':'AddFemilyMember', params: { pid: -1 ,did:0}});//-1代表户主是新用户，从未注册过。
    	}
        
    },
    // did:医生id wzid:患者id
    GoRouter(){
        this.$router.push({'name':'DoctorDetail', params: { did: this.currentDoctor.Id,wzid:this.currentPid}});
    },
    goRouterFrame(event){
        this.$router.push({'name':'Other', params: { href: encodeURIComponent($(event.currentTarget).attr('to')) }});
    },
    goRouterQY(){
    	var vm=this;
    	 $("#thelist li").each(function(){
      	if($(this).hasClass("active")){
      		if(vm.familymember[$(this).attr("value")].SignStateText=="签约申请中" || vm.familymember[$(this).attr("value")].SignStateText=="签约成功"){
      			Toast("签约申请中，无法再次签约！");
      		}else{
      			vm.$router.push({'name':'HospitalList', params: { pid: vm.currentPid }});
      		}
      	}
      });
    	if($("#thelist li").length==0){
    		vm.$router.push({'name':'HospitalList', params: { pid: vm.currentPid }});
    	}
        
    },
    GoQianYueRouter(){
      /*if(this.userinfo.SignIsRemind||this.userinfo.UserID==undefined){
        this.$router.push({'name':'HospitalList',params: { pid:0 }});
      }else{
        this.$router.push({'name':'QianyueRemind'});
      }*/

     if(this.userinfo.SignIsRemind||this.userinfo.UserID==undefined){
        this.$router.push({'name':'onlineQy'});
      }else{
        this.$router.push({'name':'QianyueRemind'});
      }
     
     
     
    },
    GojiatingGL() {
    	this.$router.push({'name':'FamilyMemberList'});
    },
    GoZNDZRouter(event) {
    	this.$router.push({'name':'Other', params: { href: encodeURIComponent($(event.currentTarget).attr('to')) }});
    },
    GoJKBKRouter(event) {
    	this.$router.push({'name':'Other', params: { href: encodeURIComponent($(event.currentTarget).attr('to')) }});
    },
    GoJZYMRouter() {
    		this.$router.push({'name':'ymjzindexhave'});
    },
    CreateSrcoll(){
   setTimeout(()=>{
   	 var scroller = document.getElementById("scroller");
    var theList = document.getElementById("thelist");
    var items = theList.getElementsByTagName("li");
    var all_width = 0;

			for(var i = 0; i < items.length; i++){
			  all_width += items[i].offsetWidth;
			}
			//console.info(all_width)
			if(all_width<document.documentElement.clientWidth){
			  scroller.style.width = (document.documentElement.clientWidth) + "px";
			}else{
			  //scroller.style.width = (all_width-1) + "px";
			}
			//scroller.style.width = (all_width-1) + "px";
			
			theList.style.width = all_width+100 + "px";
			var myscroll=new iScroll(scroller,{
			  scrollX: true,
			  scrollY: false,
			  hScrollbar:false,
			  vScrollbar : false,
			  vScroll:false,
			  bounce:true,
			  lockDirection:true,
			});
   },2000)
   },
  showPosition(position) {//定位
		let vm=this;
		let latlon = position.coords.latitude+','+position.coords.longitude;
		//baidu
	 var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";
    $.ajax({ 
      type: "GET", 
      dataType: "jsonp", 
      url: url,
     /* beforeSend: function(){
         Toast('正在定位...');
      },*/
      success: function (json) { 
          if(json.status==0){
              //1.详细地址
              //vm.address=json.result.formatted_address;
              //2.定位当前城市
              // alert(json.result.addressComponent.city)
              
             vm.set_onaddress(json.result.addressComponent.city);

          }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) { 
          //Toast(latlon+"地址位置获取失败"); 
          vm.set_onaddress("杭州市");
      }
    });
	},
	
	showError(error){
		this.set_onaddress("杭州市");
		switch(error.code) {
			case error.PERMISSION_DENIED:
				//Toast("定位失败,用户拒绝请求地理定位");
				break;
			case error.POSITION_UNAVAILABLE:
				//Toast("定位失败,位置信息是不可用");
				break;
			case error.TIMEOUT:
				//Toast("定位失败,请求获取用户位置超时");
				break;
			case error.UNKNOWN_ERROR:
				//Toast("定位失败,定位系统失效");
				break;
	    }
	},
	getLocation() {
		let vm=this;
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(vm.showPosition,vm.showError);
		}else{
			Toast("浏览器不支持地理定位。");
		}
	},
   
   
   
   
  },
  created(){
  	this.set_picvalue("");
  	this.set_picvaluet("");
  	this.set_picvaluetr("");
  	this.set_picimgs("");
  	this.set_picbackimgs("");
  	this.set_pictureurl("");
		this.set_pictureurlt("");
		this.set_pictureurltr("");
    $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){ 
      console.log('aaa',data)
        if(data.suc){
          if(data.extra.CurrentLoginMember){
            vm.set_isLogined(true);
            vm.set_userinfo(data.extra.CurrentLoginMember);
            vm.set_userid(data.extra.CurrentLoginMember.UserID);
            vm.set_familymember(data.extra.OtherMembers);
            vm.set_ishavebaby(data.extra.IsHaveBaby);
          }
        }
     }});

    /*getUtil(apiurl.GetBannerList,[]).then(data =>{
               this.set_bannerlist(data.rows);
              });*/
      var vm=this;
      var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null){
        
      }else{
        if(vm.onaddress==null){
          this.set_onaddress("杭州市");
          vm.getLocation();//百度定位
        } 
      }
      $.ajax({ url: apiurl.GetBannerList,success: function(data){
          vm.set_bannerlist(data.rows);
      }});
      $.ajax({ url: apiurl.InfoNewsGetList,data:{pageIndex:1,pageSize:3}, success: function(data){
            vm.set_indexzxlist(data.rows);
        }});

      var intervalTime = setInterval(function () {
        if(vm.familymember.length>0){
          clearInterval(intervalTime);
          vm.currentDoctor=vm.familymember[0].DoctorInfo;
          vm.currentPid=vm.familymember[0].PatientID;
        }
      },100)
      

      
  },
  mounted(){
  	console.log(this.familymember)
    var vm=this;
    $("#thelist li").each(function(){
    	if($(this).hasClass("active")){
    		var value=parseInt($(this).attr('value'));
    		vm.currentDoctor=vm.familymember[value].DoctorInfo;
    		vm.set_docstate(vm.familymember[value].SignState);
    		vm.userstatetext=vm.familymember[value].SignStateText;
    	}
    });
    
    
    if(this.isfirstinto){
        setTimeout(function(){
        vm.set_isfirstinto(false);
        vm.CreateSrcoll();
    },2000)
    }else{
      this.CreateSrcoll();
    }    
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
  }
}
</script>
