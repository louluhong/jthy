<template>
	<section class="qianyueremind-container">
		<div @click="MedicalRegisterRemind()">
			
		</div>
	</section>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
export default{
	computed:{
      ...mapGetters({
      openid:'openid',familymember:'familymember',userid:'userid',userinfo:'userinfo'
    })
  },
   methods:{
   		...mapActions([
      'set_userinfo','set_bannerlist','set_isremind'
    ]),
   	MedicalRegisterRemind(){
   		var vm=this;
  		var headers={
  			UserID:this.userid,
			Token:this.openid
  		};
      
  		$.ajax({ url: apiurl.MedicalRegisterRemind,type:"post",headers:headers, success: function(data){
  			if(data.suc){
  				vm.$router.push({'name':'HospitalList',params: { pid:0 }});
          vm.set_isremind();
  			}else{
  				Toast(data.mes);
  			}
  		}});
   	}
   }
}
</script>
<style scope>
.container{
  height: 100%;
  /* padding-bottom: 1.34rem; */
}
</style>
