<template>
	<section class="_full_router doctordetail-container" style="height:auto;">
		<div class="main">
			<header class="doctordetail-header clearfix">
				<img :src="doctorinfo.PhotoImageUrl" alt="">
				<div class="info">
					<h3>{{doctorinfo.DoctorName}}<span>{{doctorinfo.SectionName}}</span></h3>
					<p>
					</p>
					<p>{{doctorinfo.HospitalName}}</p>
				</div>
			</header>
			<section class="doctordetail-item">
				<header><h4>个人介绍</h4></header>
				<div class="details active">
					<div class="compareDiv">
						<p class="compare" style="visibility:hidden">测试</p>
					</div>
					<div class="IntroductionDiv">
						<p style="visibility:hidden">{{doctorinfo.DoctorIntroduction}}</p>
					</div>
					<p v-if="!isShowIntroduction" class="detailToggle">{{doctorinfo.DoctorIntroduction ? doctorinfo.DoctorIntroduction :"暂无数据"}}</p>
					<div v-if="doctorinfo.DoctorIntroduction">
						<a href="javascript:void(0)" @click="TouchToggle(0)" v-if="!isShowIntroduction">展开<img src="../../assets/images/triangle@2x.png" alt="">
						</a>
						<a href="javascript:void(0)" @click="TouchToggle(0)" v-if="isShowIntroduction">收起<img src="../../assets/images/triangle@2x.png" alt="">
						</a>
					</div>
				</div>
			</section>
			<section class="doctordetail-item">
				<header><h4>专业领域</h4></header>
				<div class="details active">
					<div class="SpecitialTechDiv">
						<p style="visibility:hidden">{{doctorinfo.SpecitialTech}}</p>
					</div>
					<p v-if="!isShowSpecitialTech" class="detailToggle">{{doctorinfo.SpecitialTech ? doctorinfo.SpecitialTech :"暂无数据" }}</p>
					<div v-if="doctorinfo.SpecitialTech">
						<a href="javascript:void(0)" @click="TouchToggle(1)" v-if="!isShowSpecitialTech">展开<img src="../../assets/images/triangle@2x.png" alt=""></a>
						<a href="javascript:void(0)" @click="TouchToggle(1)" v-if="isShowSpecitialTech">收起<img class="reserve" src="../../assets/images/triangle@2x.png" alt="">
						</a>
						
					</div>
				</div>
			</section>
			<section class="doctordetail-item">
				<header><h4>个人成就</h4></header>
				<div class="details active">
					<div class="AchievementDiv">
						<p style="visibility:hidden">{{doctorinfo.Achievement}}</p>
					</div>
					<p v-if="!isShowAchievement" class="detailToggle">{{doctorinfo.Achievement ? doctorinfo.Achievement :"暂无数据"}}</p>
					<div v-if="doctorinfo.Achievement">
						<a href="javascript:void(0)" @click="TouchToggle(2)" v-if="!isShowAchievement">展开<img src="../../assets/images/triangle@2x.png" alt=""></a>
						<a href="javascript:void(0)" @click="TouchToggle(2)" v-if="isShowAchievement">收起<img src="../../assets/images/triangle@2x.png" alt="">
						</a>
					</div>
				</div>
			</section>

			<div class="doctordetail-wrap" v-if="isShow" @click="GoRouter($event)">
				<button type="button" class="btn btn-primary"><img src="../../assets/images/sign@2x.png" alt="">签约</button>
			</div>
			<div class="doctordetail-wrap" @click="GoRouterMsg()" v-if="isShow==false">
				<button type="button" class="btn btn-primary"><img src="../../assets/images/Group 10@2x.png" alt="">问诊</button>
			</div>

		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { Toast } from 'mint-ui';
import {apiurl} from '../../service/api-config.js'
import { Indicator } from 'mint-ui';
export default{
	computed:{
      ...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo',docstate:'docstate',doctorurlname:'doctorurlname',doctorurldid:'doctorurldid',doctorurlpid:'doctorurlpid'
    })
  },
  data() {
        return {
        	doctorinfo:[],
        	isShow:this.$route.params.pid!=undefined,
        	isShowIntroduction:false,
        	isShowSpecitialTech:false,
        	isShowAchievement:false,
        	chattalklist:[],
        	did:null
        }
  },
   methods:{
    ...mapActions([
      'set_doctorurlname','set_doctorurldid','set_doctorurlpid','set_userid','set_picvalue','set_picvaluet','set_picvaluetr','set_picimgs','set_picbackimgs','set_pictureurl','set_pictureurlt','set_pictureurltr','set_userinfo','set_familymember','set_ishavebaby','set_isLogined'
    ]),
  	GoRouter(event){
      var vm=this;
      //console.log(this.$route.params.pid)
      vm.set_doctorurlname(this.$route.name);
      vm.set_doctorurlpid(this.$route.params.pid);
      vm.set_doctorurldid(this.$route.params.did);
     
	  $.ajax({ url: apiurl.IsHaveUserAndPatientInfo,data:{OpenId: this.openid},
        success: function(data){
          console.log(data)
//      	var reg = new RegExp("(^|&)" + "#/DoctorDetailQY/" + "([^&]*)(&|/)");
//			var r = window.location.hash.match(reg);
					
        		console.log(vm.$route.params.pid);
        		if(data.suc){
              if(vm.$route.params.pid>0){
                vm.$router.push({'name':'HealthInfo', params: { pid: vm.$route.params.pid,did: vm.$route.params.did}});
              }else{
                vm.$router.push({'name':'ChooseFamilyMember', params: { did:vm.did,pid:data.Id }});
              }
        			
        		}else{
        			vm.$router.push({'name':'AddFemilyMember', params: { pid: data.Id,did: vm.did}});
        		}
        	}
        })
//      if(this.$route.params.pid>0){
//        this.$router.push({'name':'HealthInfo', params: { did: this.$route.params.did,pid:this.$route.params.pid }});
//      }else if(this.$route.params.pid==0){
//        this.$router.push({'name':'ChooseFamilyMember', params: { did: this.$route.params.did,pid:this.$route.params.pid }});
//      }
    },
    TouchToggle(index){
    	if(index==0){
    		this.isShowIntroduction=!this.isShowIntroduction;
    		if(this.isShowIntroduction){
    			$('.IntroductionDiv').css('height','auto');
    			$('.IntroductionDiv p').css('visibility','visible');
    		}else{
				$('.IntroductionDiv').css('height','0');
    			$('.IntroductionDiv p').css('visibility','hidden');
    		}
    	}else if(index==1){
    		this.isShowSpecitialTech=!this.isShowSpecitialTech;
    		if(this.isShowSpecitialTech){
    			$('.SpecitialTechDiv').css('height','auto');
    			$('.SpecitialTechDiv p').css('visibility','visible');
    		}else{
				$('.SpecitialTechDiv').css('height','0');
    			$('.SpecitialTechDiv p').css('visibility','hidden');
    		}
    	}else if(index==2){
    		this.isShowAchievement=!this.isShowAchievement;
    		if(this.isShowAchievement){
    			$('.AchievementDiv').css('height','auto');
    			$('.AchievementDiv p').css('visibility','visible');
    		}else{
				$('.AchievementDiv').css('height','0');
    			$('.AchievementDiv p').css('visibility','hidden');
    		}
    	}
    },
    GoRouterMsg() {
      var vm=this;
    	if(this.docstate==4){
    		Toast("服务将在下年度生效，暂不可用!");
    		return false;
    	}
    	if(this.docstate==2){
			Toast("签约通过后才能问诊！");
    		return false;
    	}
      var headers={
        UserID:vm.userid,
        Token:vm.openid
      };
      $.ajax({ url: apiurl.IsExistIngInquiry,data:{PatientId: this.$route.params.wzid},headers:headers, 
        success: function(data){
          //console.log(data)
            if(data.Id>0){
              // wzid：患者id did:医生id
              vm.$router.push({'name':'WenZhenDetail', params: { iid:data.Id,pid:vm.$route.params.wzid,did:vm.$route.params.did,isfalse:1}});
            }else{
              // vm.chattalklist[0].targetUserID
              // console.log(vm.chattalklist[0].targetUserID)
              vm.$router.push({'name':'WenZhenStart', params: { iuid:vm.userid,wwid: vm.$route.params.wzid,did: vm.$route.params.did }});
            }
        }
      });
    }
    
    
    
	},
  created(){
  	this.set_picvalue("");//取消上传照片
  	this.set_picvaluet("");
  	this.set_picvaluetr("");
  	this.set_picimgs("");
	this.set_picbackimgs("");
	this.set_pictureurl("");
	this.set_pictureurlt("");
	this.set_pictureurltr("");
	
	Indicator.open({
	  text: '加载中...',
	  spinnerType: 'fading-circle'
	});
  		var vm=this;
  		var headers={
  			UserID:vm.userid,
			Token:this.openid
  		};
      $.ajax({url: apiurl.LoginByOpenId,data:{OpenId:this.openid},type:'get',success:function(data){ //获取用户信息
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
  		$.ajax({ url: apiurl.GetDoctorDetail,data:{id:vm.$route.params.did},success: function(data){
  			Indicator.close();
  			console.log(data.extra)
        if(data.suc){
  				vm.doctorinfo=data.extra;
  				vm.did=data.extra.Id;
  				var star="";
  				for(var i=0;i<vm.doctorinfo.PraiseRate;i++){
					star+='<i class="star"></i>';
  				}
  				if(vm.doctorinfo.PraiseRate.length>1){
  					star+='<i class="halfstar"></i>';
  				}
  				for(var i=0;i<5-vm.doctorinfo.PraiseRate;i++){
					star+='<i class="graystar"></i>';
  				}
  				$(".doctordetail-container .doctordetail-header .info p").eq(0).html(star);
  			}else{
  				Toast(data.mes);
  			}
  		}});
      //console.log(this.isShow)
  	if(this.isShow==false){//判断是进入咨询页面按钮
  		$.ajax({ url: apiurl.GetMessageTalk,headers:headers, success: function(data){
	  		if(data.suc){
         
	  			 vm.chattalklist=data.rows;
	  			 //console.log(data);
	  		}else{
	  			Toast(data.mes);
	  		}
  		}});
  	}
       
    
  		
  		
  },
   mounted(){
   	var vm=this;
    var intervalTime = setInterval(function () {
      var resultContentH = $('.doctordetail-item .IntroductionDiv p').height();
      var resultContentST = $('.doctordetail-item .SpecitialTechDiv p').height();
      var resultContentA = $('.doctordetail-item .AchievementDiv p').height();
      if (resultContentH > 0||resultContentST>0||resultContentA>0) {
        clearInterval(intervalTime);
        if (resultContentH<=$('.doctordetail-item').eq(0).find('.compare').height()) {
        	$('.doctordetail-item').eq(0).find('a').hide();
        }
        var resultSpecitialTech = $('.doctordetail-item .SpecitialTechDiv p').height();
        if (resultSpecitialTech<=$('.doctordetail-item').eq(0).find('.compare').height()) {
        	$('.doctordetail-item').eq(1).find('a').hide();
        }
        var resultAchievement = $('.doctordetail-item .AchievementDiv p').height();
        if (resultAchievement<=$('.doctordetail-item').eq(0).find('.compare').height()) {
        	$('.doctordetail-item').eq(2).find('a').hide();
        }
      }
    },10);
    
  }
}
</script>