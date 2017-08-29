<template>
	<div id="adminDetails">
		<header class="adminDetails_header">
			<div class="state clearfix">
				<div class="left">
					<div class="left_icon">
						<i class="icon icon1" :class="iconClass"></i>
					</div>
					<div class="left_text">
						<label>{{textState}}</label>
						<span>{{textR}}</span>
					</div>
				</div>
				<i class="img" :class="imgicon"></i>
			</div>
			<div class="reason" v-if="text.SignState=='签约失败'">
				<label>拒绝理由：</label>
				<span>{{text.ApplyRefuseReason}}</span>
			</div>
		</header>
		<div class="adminDetails_centent">
			<div class="box">
				<ul class="text">
					<li>
						<label>姓名</label>
						<span>{{text.CHName}}</span>
						<i :class="sex()" class="icon1"></i>
					</li>
					<li>
						<label>年龄</label>
						<span>{{text.Age}}</span>
					</li>
					<li>
						<label>身份证</label>
						<span>{{idcard}}</span>
					</li>
					<li>
						<label>地址</label>
						<span class="address">{{text.Address}}{{text.DetailedAddress}}</span>
					</li>
				</ul>
				<div class="textArr" v-if="pass==1"></div>
				<ul class="text"  v-if="pass==1">
					<li>
						<i class="icon icon2"></i>
						<label>签约社区</label>
						<span class="span">{{text.MedicalOrgName}}</span>
					</li>
					<li>
						<i class="icon icon3"></i>
						<label>签约医生</label>
						<span class="span">{{text.RegisteredDoctorName}}</span>
					</li>
					<li>
						<i class="icon icon4"></i>
						<label>服务时间</label>
						<span class="span" >{{text.RegisteredYear}}.1.1—{{parseInt(text.RegisteredYear)}}.12.31</span>
					</li>
				</ul>
				
			</div>
			
		</div>
		<input v-if="year==1" class="adminDetails_btnok" type="button" value="续约" @click="Renew" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import {apiurl} from '../../service/api-config.js';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				text:{},
				index:Number,
				pass:"",
				year:"",
				iconClass:"",
				textState:"",
				textR:"",
				imgicon:"",
				idcard:''
				
			}
		},
		created() {
			var vm=this;
			vm.pass=vm.qyadminpass;
			Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
			});
			var headers={
			      UserID:this.userid,
			     	Token:this.openid
			  };
		
			$.ajax({ url: apiurl.GetPatientInfo,data:{patientID:vm.$route.params.glid,MedicalandApplyId:vm.medicalid,RegisteredState:vm.regstate},headers:headers, success: function(data){
				Indicator.close();
				console.log(data)
	  			if(data.suc){
	  				let subjq = data.extra.IDCardNumber.substr(6,9);
        			vm.idcard = data.extra.IDCardNumber.replace(subjq,"*********");
	  				var dataobj = new Date();
					var yearnow = dataobj.getFullYear();
					if(data.extra.SignState=="签约成功"){
						if(parseInt(data.extra.RegisteredYear) <= yearnow){
							vm.year=1;
						}
					}else{
						vm.year=0;
					}
	  				vm.text=data.extra;
	  				//console.log(data.extra);
	  				if(data.extra.SignState=="签约申请中"){
	  					vm.textState="签约申请中...";
	  					vm.iconClass="icon2";
	  					vm.textR="签约申请中,请耐心等待";
	  					vm.imgicon="img2";
	  				}else if(data.extra.SignState=="签约失败"){
	  					vm.textState="签约失败！";
	  					vm.iconClass="icon1";
	  					vm.textR="医生拒绝了您的签约请求。";
	  					vm.imgicon="img1";
	  				}else if(data.extra.SignState=="签约成功"){
	  					vm.textState="签约成功！";
	  					vm.iconClass="icon3";
	  					vm.textR="医生已同意您的申请。";
	  					vm.imgicon="img3";
	  				}else if(data.extra.SignState=="未签约"){
	  					vm.textState="未签约！";
	  					vm.iconClass="icon1";
	  					vm.textR="您还没有签约。";
	  					vm.imgicon="img4";
	  				}
	  				
	  			}else{
	  				Toast(data.mes);
	  			}
  			}});
  			
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',qyadmin:'qyadmin',qyadminpass:'qyadminpass',medicalid:'medicalid',regstate:'regstate',userid:'userid',userinfo:'userinfo'
		    })
		},
		methods: {
			Renew(){
				this.$router.push({'name':'HospitalList', params: { pid:this.$route.params.glid }});
			},
			sex() {
				let sex="";
				if(this.text.Sex=="1"){
					sex="boy";
				}else{
					sex="girl";
				}
				return sex;
			}
		}
	}
</script>
