<template>
	<section class="choosefamilymember-container">
		<div class="main">
			<div class="note media">
				<div class="media-left">
					<img src="../../assets/images/loudspeaker@2x.png" alt="">
				</div>
				<div class="media-body">
					<p><i style="color:#FF1E00;font-style: normal;">{{currentyear}}年12月31号</i>之前申请的是<i style="color:#FF1E00;font-style: normal;">{{currentyear+1}}年</i>度的家庭医生签约服务。</p>
				</div>
			</div>
			<div class="choosefamilymember-list">
				<div class="choosefamilymember-item" v-for="(item,index) in familymemberlist" @click="GoRouter(item.PatientID,item.SignState,index)">
					<div class="media">
						<div class="media-left pic">
							<img :src="item.PhotoUrl" alt="">
						</div>
						<div class="media-left name">
							<span>{{item.CHName}}</span>
						</div>
						<div class="media-body age">
							<img src="../../assets/images/male@2x.png" alt="" v-if="item.Sex==1">
							<img src="../../assets/images/female@2x.png" alt="" v-if="item.Sex==0">
							{{item.Age}}岁
						</div>
						<div class="media-left">

							<!--放置选择框-->
						</div>
					</div>
					<span class="signed">
						{{item.SignYear}}年<span :class="{green: item.SignState==2,red: item.SignState==0||item.SignState==3 }">{{item.SignStateText}}</span>
					</span>
					<!-- <img class="signed" src="../../assets/images/signed@2x.png" alt="" v-if="item.SignState==1"> -->
				</div>
			</div>
			<div class="line">
				
			</div>
			<div class="choosefamilymember-btnwrap">
				<button type="button" class="btn btn-default" @click="GoRouterAdd()"><span>+</span>添加签约对象</button>
			</div>
			<div class="line">
				
			</div>
			<div class="choosefamilymember-header" @click="ChangeReserve()" v-if="familymemberhis.length>0">
				<img src="../../assets/images/Group 6@2x.png" alt="" class="choosefamilymember-headergroup">
				<span class="choosefamilymember-headertext">历史签约</span>
				<img src="../../assets/images/Combined Shape@2x.png" alt="" :class="[reverse ? 'reverse' : '', 'choosefamilymember-headericon']">
				<!-- <img src="../../assets/images/Combined Shape@2x.png" alt="" class="choosefamilymember-headericon reverse"> -->
			</div>
			<div class="choosefamilymember-list">
				<div v-if="!reverse" class="choosefamilymember-item" v-for="item in familymemberhis">
					<div class="media">
						<div class="media-left pic">
							<img :src="item.PhotoUrl" alt="">
						</div>
						<div class="media-left name">
							<span>{{item.CHName}}</span>
						</div>
						<div class="media-body age">
							<img src="../../assets/images/male@2x.png" alt="" v-if="item.Sex==1">
							<img src="../../assets/images/female@2x.png" alt="" v-if="item.Sex==0">
							{{item.Age}}岁
						</div>
						<div class="media-left">

							<!--放置选择框-->
						</div>
					</div>
					<span class="signed" >
						{{item.SignYear}}年<span :class="{ red: item.SignState==0||item.SignState==3 }">{{item.SignStateText}}</span>
					</span>
					<!-- <img class="signed" src="../../assets/images/signed@2x.png" alt="" v-if="item.SignState==1"> -->
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
export default{
	data(){
		return{
			reverse:false,
			familymemberhis:[],
			familymemberlist:[]
		}
	},
	computed:{
		...mapGetters({
      openid:'openid',userid:'userid',userinfo:'userinfo'
    }),
      currentyear: function () {
      return new Date().getFullYear();
    }
  },
  methods:{
  	 ...mapActions([
      'set_picvalue','set_picvaluet','set_picvaluetr','set_picimgs','set_picbackimgs','set_pictureurl','set_pictureurlt','set_pictureurltr'
    ]),
  	
  	GoRouter(pid,signstate,index){
  		var data = new Date();
  		var yearnow = data.getFullYear();
  		console.log('choosefamilymember',signstate,this.familymemberlist[index].SignYear)
  		if((signstate!=1 || this.familymemberlist[index].SignYear<=yearnow) && signstate!=2 && signstate!=4){
  			this.$router.push({'name':'HealthInfo', params: { pid: pid,did: this.$route.params.did}});
  		}else{
  			Toast('不能重复签约')
  		}
  
    },
    GoRouterAdd(){
        this.$router.push({'name':'AddFemilyMember', params: { pid:0 }});
    },
    ChangeReserve(){
    	this.reverse=!this.reverse;
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
		var vm=this;
		var headers={
			UserID:this.userid,
			Token:this.openid
		};
		$.ajax({ url: apiurl.GetMembersSignedInfoHistory,headers:headers, success: function(data){
			//console.log(data.rows);
			vm.familymemberhis=data.rows;
		}});
		$.ajax({
			type:"get",
			url:apiurl.GetMembersSignedDoctorInfo,
			async:true,
			headers:headers,
			success:function(data){
				console.log(data)
				if(data.suc){
					vm.familymemberlist=data.rows;
  			}else{
  				Toast(data.mes);
  			}
			
			}
		});
  		
  		
  		
  		
  }
}
</script>