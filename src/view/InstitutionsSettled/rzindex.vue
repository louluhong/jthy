<template>
	<div class="rzwelcome">
		<span class="go_rzindex" @click="goRzindex">
			去入驻
		</span>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			let vm=this;
			console.log(this.openid)
				if(sessionStorage.getItem('rzbool')==null){
					$.ajax({ url: apiurl.IsWXEnter,data:{OpenID:this.openid},type:'get',async:false, success:function(data){
		             		if(data.suc){
		             			sessionStorage.setItem('rzbool',JSON.stringify(true));
		             			sessionStorage.setItem('rzUseriphone',JSON.stringify(data.extra.Phone));
		             			sessionStorage.setItem('rzUserInfo',JSON.stringify(data.extra));//存储已入住用户信息
								sessionStorage.setItem('rzUserjglx',JSON.stringify(data.extra.HopsitalName));
								if(data.extra.ApproveState==3){
									vm.$router.push({'name':'Rzok', params: { zcok: 1}});
								}else{
									vm.$router.push({'name':'Rzok', params: { zcok: 0}});
								}
		             				
		             		}else{
		             			
		             		}
				          }
								
				        });
				}
		},
		computed: {
			 ...mapGetters({
		      openid:'openid'
		    })
		},
		 mounted() {
		  	$(".mint-tabbar").hide();
		  },
		methods: {
			 goRzindex() {
			 	this.$router.push({'name':'Rzlogin'});
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

