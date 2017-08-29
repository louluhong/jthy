<template>
	<section class="register-container">
		<div class="main">
			<header class="register-header">
				<img src="../assets/images/register_icon@2x.png" alt="">
				<h1>家庭好医</h1>
			</header>
			<div class="register-form" style="background:#fff;">
				<form action="">
					<div class="register-group">
						<input type="text" name="" placeholder="姓名" v-model.trim="username" maxlength="5" @focus="onfocus">
					</div>
					<div class="register-group">
						<input type="text" name="" placeholder="身份证号" v-model.trim="idcard">
					</div>
					<div class="register-group">
						<input type="text" name="" placeholder="手机号" v-model.trim="phone">
					</div>
					<div class="register-group">
						<a href="javascript:void(0)" class="code" @click="GetDuanXinCode()">{{getCodeMsg}}</a>
						<div class="register-input-wrap">
							<input type="text" name="" placeholder="验证码" v-model.trim="code">
						</div>
					</div>
					<div class="button-wrap">
						<button type="button" class="btn btn-primary" @click="Register()">注册</button>
					</div>
				</form>
			</div>
		</div>
	  <div class="register_box">
	  	  <div class="register_log">
	        <img src="../assets/images/welcome_log@2x.png"/>
	        <span>中国家医平台合作联盟</span>
		</div>
	  </div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { Toast } from 'mint-ui';
import {apiurl} from '../service/api-config.js'
export default{
	computed:{
      ...mapGetters({
      openid:'openid',doctorurlname:'doctorurlname',doctorurldid:'doctorurldid',doctorurlpid:'doctorurlpid'
    })
  },
  methods:{
    ...mapActions([
		'set_userinfo'  ,'set_familymember' ,'set_isLogined','set_ishavebaby','set_userid','set_openid'
    ]),
    GetDuanXinCode(){
    	if(this.phone.length==0){
  				Toast('请输入手机号');
  		}else if(this.phone.length!=11){
  				Toast('请输入正确手机号');
  		}else{
        if(this.isCanSendCode){
          console.log(this.isCanSendCode)
          this.isCanSendCode=false;
          this.getCodeMsg="正在发送";
  			  var vm=this;
    			$.ajax({ url: apiurl.SendDuanXinCode,type:'post',data:{PhoneNumber:this.phone,OpenID:this.openid}, 
            success:function(data){
              if(!data.suc){
                vm.isCanSendCode=true;
              }else{
                vm.CountDown();
              }
              Toast(data.mes);
          	}
          });
        }else{          
          Toast('正在发送，请稍等')
        }
  		}
    },
    CountDown(){
      if (this.countdown == 0) { 
        this.isCanSendCode=true;
        this.countdown = 60; 
        this.getCodeMsg="获取验证码";
      } else { 
        this.countdown--; 
        this.getCodeMsg=this.countdown; 
        var vm=this;
        setTimeout(function() { 
          vm.CountDown() 
        },1000) 
      } 
      
    },
    Register(){      
      console.log(this.doctorurlname)
    	if(this.username.length==0){
  				Toast('请输入姓名');
  		}else if(this.idcard.length==0){
  				Toast('请输入身份证号');
  		}else if(this.phone.length==0){
  				Toast('请输入手机号');
  		}else if(this.code.length==0){
  				Toast('请输入验证码');
  		}else{
  			var vm=this;
  			var data={
  				"CHName": this.username,
  				"IDCard": this.idcard,
  				"PhoneNumber": this.phone,
  				"DuanXinCode": this.code,
  				"OpenID": this.openid
  			};
  			$.ajax({ url: apiurl.Register,type:'post',data:data, success: function(data){
           if(data.suc){
 
                vm.set_isLogined(true);
                vm.set_userinfo(data.extra.CurrentLoginMember);
                vm.set_familymember(data.extra.OtherMembers);
                vm.set_userid(data.extra.CurrentLoginMember.UserID);
                vm.set_ishavebaby(data.extra.IsHaveBaby);
                // vm.set_openid(data.openid);
                // alert(data.openid)
                if(vm.doctorurlname==''){
                  vm.$router.push({'path':'/Index'});
                }else{
                  vm.$router.push({'name':vm.doctorurlname, params: { did: vm.doctorurldid,pid:vm.doctorurlpid}});
                }                
                 /*setTimeout(()=>{
                 	location.reload();
                 },100)*/
               }else{
                Toast(data.mes);
               }
        	}});
  		}
    },
    onfocus(){
      $('.register-form').css('background','#fff');
    }
  },
  data() {
        return {
          phone:'',
          username:'',
          idcard:'',
          code:'',
          getCodeMsg:'获取验证码',
          isCanSendCode:true,
          countdown:60
        }
  },
  created(){
    var vm=this;
    // console.log('aaa')
    // onfocus(){
    //   $('.register-form').css('background','#fff');
    // }
  		/*if(this.openid){

  		}else{
  			this.$router.push({'name':'500', params: { msg: '请在微信端打开(openid不能为空)'}});
  		}*/
  }
}
</script>
<style scope>
.container{
  height: 100%;
}
</style>
