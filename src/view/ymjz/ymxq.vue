<template>
	<section class="ymxq">
		<header class="header_title">{{ymtext.BacterinName}}</header>
		<div class="ymxq_content">
			<header>
				<i></i>
				<span>预防疾病</span>
			</header>
			<p>{{ymtext.BacterinDisease}}</p>
		</div>
		<div class="ymxq_content">
			<header>
				<i class="icon2"></i>
				<span>接种部位</span>
			</header>
			<p>{{ymtext.BacterinPosition}}</p>
		</div>
		<div class="ymxq_content">
			<header>
				<i class="icon5"></i>
				<span>接种程序</span>
			</header>
			<p>{{ymtext.BacterinProgram}}</p>
		</div>
		<div class="ymxq_content">
			<header>
				<i class="icon4"></i>
				<span>接种反应</span>
			</header>
			<p>{{ymtext.BacterinReaction}}</p>
		</div>
		<div class="ymxq_content">
			<header>
				<i class="icon3"></i>
				<span>接种禁忌</span>
			</header>
			<p>{{ymtext.BacterinBan}}</p>
		</div>
	</section> 
	

</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import {apiurl} from '../../service/api-config.js'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				ymtext:{}
			
			}
		},
		created() {
			let vm=this;
			Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
			});
			//console.log(vm.$route.params.BacterinId);
			var headers={
	  			UserID:this.userid,
				Token:this.openid
  			};
			$.ajax({
				url:apiurl.GetBacterinInfoById,
				headers:headers,
				data:{BacterinId:vm.$route.params.BacterinId},
				success: function(data){
					Indicator.close();
					if(data.suc){
						vm.ymtext=data.extra;
					}else{
						Toast(data.mes);
					}
					//console.log(data);
	  			},
	  			error:function(XMLHttpRequest){
					Indicator.close();
					Toast("网络出错了！");
				}
			});
		},
		computed: {
			 ...mapGetters({
		      openid:'openid',userid:'userid',userinfo:'userinfo'
		    })
		},
		methods: {
			
		}
	}
</script>

<style>
</style>