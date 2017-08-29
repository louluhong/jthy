<template>
	<section class="rzindex">
		<div class="rzbox">
			<input type="number" class="rz_iphone" placeholder="手机号码" v-model.trim="iphone" maxlength="11"/>
			<div class="rz_yzm">
				<input type="number" placeholder="验证码" v-model.trim="yzm" />
				<span @click="getyzm()" :class="spandisplay">{{yzmtext}}{{!shownum ? '' :'('+countdown+'s)'}}</span>
			</div>
			<span class="submit_btn" :class="btnSuimt" @click="submit">确认入驻</span>
		</div>
	</section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				yzmtext:'获取验证码',
				countdown:60,
				shownum:false,
				spandisplay:'',
				iphone:'',
				yzm:'',
				btnSuimt:'btndisplay',
				iphoneobj:false,
				yzmobj:false,
				isCanSendCode:false
			}
		},
		created() {
			
		},
		 mounted() {
		  	
		  },
		computed:{
		      ...mapGetters({
		      openid:'openid'
		    })
  		},
		beforeUpdate(){
			if(this.iphoneobj==true && this.yzmobj==true){
				this.btnSuimt='';
			}else{
				this.btnSuimt='btndisplay';
			}
		},
		methods: {
			getyzm() {
				let vm=this;
				if(this.iphone.length==0){
	  				Toast('请输入手机号');
		  		}else if(this.iphone.length!=11){
	  				Toast('请输入正确手机号');
		  		}else{
		  			if(this.isCanSendCode==false){
		  				$.ajax({ url: apiurl.SendDuanXinCode,type:'post',data:{PhoneNumber:this.iphone,OpenID:this.openid}, success:function(data){
				            if(!data.suc){
				              vm.isCanSendCode=false;
				            }else{
				              vm.CountDown();
				            }
				            Toast(data.mes);
				        	}
				        });
		  			}
		  			
		  		}
				
			},
			submit() {
				var vm=this;
				if(this.iphone.length==0){
					Toast("请输入手机号");
					return false;
				}else if(this.iphone.length!=11){
	  				Toast('请输入正确手机号');
	  				return false;
				}
				if(this.yzm.length==0){
					Toast("请输入验证码");
					return false;
				}else if(this.yzm.length!=6){
	  				Toast('请输入6位数的验证码');
	  				return false;
				}
				var data={
					phone:vm.iphone,
					openId:vm.openid,
					DuanXinCode:vm.yzm
				}
				$.ajax({
					type:"post",
					url:apiurl.IsEnter,
					async:true,
					data:data,
					success:function(data){
						console.log(data);
						sessionStorage.setItem('rzUseriphone',JSON.stringify(vm.iphone));
						sessionStorage.setItem('rzUserInfo',JSON.stringify(data.extra));//存储已入住用户信息
						if(!data.suc){
							Toast(data.mes);	
							if(data.mes=='验证码输入不正确'){
								
								return false;
							}else if(data.mes==false && data.extra!=null){
								MessageBox.confirm('您的手机号还未与任何卫生机构绑定,请您补充机构信息。是否现在补充?',{confirmButtonText:'现在补充',cancelButtonText:'不了呢'}).then(action => {
										vm.$router.push({'name':'Rzinfomation'});	
									},
									rejected =>{
										
									}	
								);
							}
						}
						if(data.extra!=null){
							if(data.Phone!=''){
							sessionStorage.setItem('rzUserjglx',JSON.stringify(data.extra.HopsitalName));
							if(data.extra.ApproveState==3){
								vm.$router.push({'name':'Rzok', params: { zcok: 1}});	
							}else if(data.extra.ApproveState==2 || data.extra.ApproveState==1){
								Toast('入驻审核中...');
								setTimeout(()=>{
									vm.$router.push({'name':'Rzok', params: { zcok: 0}});	
								},500)
							}else if(data.extra.ApproveState==4){
								Toast('审核未通过,请联系管理员');
							}
						}else{
								MessageBox.confirm('您的手机号还未与任何卫生机构绑定,请您补充机构信息。是否现在补充?',{confirmButtonText:'现在补充',cancelButtonText:'不了呢'}).then(action => {
									vm.$router.push({'name':'Rzinfomation'});	
								},
								rejected =>{
									
								}	
							);
						}
						}else{
//							MessageBox.confirm('您的手机号还未与任何卫生机构绑定,请您补充机构信息。是否现在补充?',{confirmButtonText:'现在补充',cancelButtonText:'不了呢'}).then(action => {
//										vm.$router.push({'name':'Rzinfomation'});	
//									},
//									rejected =>{
//										
//									}	
//								);
						}
						
						
						
					}
				});
				

				

				
			},			
			 CountDown(){
		      if (this.countdown == 0) {
		      	this.spandisplay=''
		        this.countdown = 60; 
		        this.shownum=false;
		        this.isCanSendCode=false;
		      } else { 
		      	this.spandisplay='displayspan';
		      	this.yzmtext="重新获取";
		      	this.shownum=true;
		        this.countdown--;	
		        this.isCanSendCode=true;
		        this.getCodeMsg=this.countdown; 
		        var vm=this;
		        setTimeout(function() { 
		          vm.CountDown() 
		        },1000) 
		      } 
		      
		    },
		},
		watch:{
			iphone:{
				handler:function(val,oldval){
					if(val.length==11){
						this.iphoneobj=true;
					}else{
						this.iphoneobj=false;
					}
				}
			},
			yzm:{
				handler:function(val,oldval){
					if(val.length==6){
						this.yzmobj=true;
					}else{
						this.yzmobj=false;
					}
				}
			}
		}
	}
	
	
	
</script>
<style scope>
.container{
  height:100%;
  /* padding-bottom: 1.34rem; */
}
</style>

